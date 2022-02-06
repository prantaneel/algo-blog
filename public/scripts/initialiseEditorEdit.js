var editorWindowRef;
let liveData = {
  blog_title: "",
  blog_html: "",
};
tinymce.init({
  selector: "#mytextareaedit",
  width: "70%",
  height: 500,
  onchange_callback: "tinymceOnchange",
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "CSS", value: "css" },
    { text: "PHP", value: "php" },
    { text: "Ruby", value: "ruby" },
    { text: "Python", value: "python" },
    { text: "Java", value: "java" },
    { text: "C", value: "c" },
    { text: "C#", value: "csharp" },
    { text: "C++", value: "cpp" },
  ],
  plugins: [
    "advlist autolink link image lists charmap print preview hr anchor pagebreak",
    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
    "table emoticons template paste help",
    "image tiny_mce_wiris",
    "codesample",
  ],
  toolbar:
    "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
    "bullist numlist outdent indent | link image | print media fullscreen | " +
    "forecolor backcolor emoticons | help |" +
    "tiny_mce_wiris_formulaEditor | codesample",
  menu: {
    favs: {
      title: "My Favorites",
      items: "code visualaid | searchreplace | emoticons",
    },
  },
  external_plugins: {
    tiny_mce_wiris: "https://www.wiris.net/demo/plugins/tiny_mce/plugin.js",
  },
  // enable title field in the Image dialog
  image_title: true,
  // enable automatic uploads of images represented by blob or data URIs
  automatic_uploads: true,
  // add custom filepicker only to Image dialog
  file_picker_types: "image",
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    function getImageDimensions(image) {
      return new Promise((resolve, reject) => {
        image.onload = function (e) {
          const width = this.width;
          const height = this.height;
          resolve({ height, width });
        };
      });
    }
    function compressImage(image, scale, initalWidth, initalHeight) {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");

        canvas.width = scale * initalWidth;
        canvas.height = scale * initalHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/png");
      });
    }
    input.onchange = async function () {
      var file = this.files[0];
      var reader = new FileReader();
      const uploadedImage = file;
      const inputPreview = document.createElement("img");
      inputPreview.src = URL.createObjectURL(uploadedImage);

      //get the dimensions of the input image
      var { height, width } = await getImageDimensions(inputPreview);
      const MAX_WIDTH = 720; //if we resize by width, this is the max width of compressed image
      const MAX_HEIGHT = (height / width + 1) * MAX_WIDTH;
      const widthRatioBlob = await compressImage(
        inputPreview,
        MAX_WIDTH / width,
        width,
        height
      );
      const heightRatioBlob = await compressImage(
        inputPreview,
        MAX_HEIGHT / height,
        width,
        height
      );

      //pick the smaller blob between both
      const compressedBlob =
        widthRatioBlob.size > heightRatioBlob.size
          ? heightRatioBlob
          : widthRatioBlob;
      const optimalBlob =
        compressedBlob.size < uploadedImage.size
          ? compressedBlob
          : uploadedImage;
      if (optimalBlob === compressedBlob) {
        var scale;
        if (compressedBlob === heightRatioBlob) {
          scale = MAX_HEIGHT / height;
          height = MAX_HEIGHT;
          width = scale * width;
        }
        if (compressedBlob === widthRatioBlob) {
          scale = MAX_WIDTH / width;
          width = MAX_WIDTH;
          height = scale * height;
        }
      }
      //converting from blob to base 64
      var reader2 = new FileReader();
      reader2.readAsDataURL(optimalBlob);
      var base64String;
      reader2.onloadend = function () {
        base64String = reader2.result;
        img = base64String;
        // var check = base64String.substr(0, 23);
        // var IND;
        // if (check.indexOf("png") === -1) IND = 23;
        // else IND = 22;
        // var sub = base64String.substr(IND);
        // img = sub;
      };

      reader.onload = function () {
        var id = "blobid" + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var base64 = base64String.split(",")[1];
        console.log(base64String);
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);
        console.log(blobCache);
        // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), {
          title: file.name,
          width: `${width}`,
          height: `${height}`,
        });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },
  menubar: "favs file edit view insert format tools table help",
  content_css: "/styles/content.css",
  codesample_content_css: "prism/prism.css",
  codesample_global_prismjs: true,
  theme_advanced_toolbar_location: "top",
  body_class: "body_class",
});
