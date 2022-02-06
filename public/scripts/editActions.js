document.getElementById("title_text").innerText = blogObject.blog_title;
document.getElementById("input_field").value = blogObject.blog_title;
document.title = blogObject.blog_title;
$("#mytextareaedit").html(blogObject.blog_html);
////////////////////////////////////////
function titleChange() {
  var title_name = document.getElementById("input_field").value;
  if (title_name === "" || title_name == undefined) {
    title_name = "Title";
  }
  document.getElementById("title_text").innerText = title_name;
  document.title = title_name;
}

var onSubmitForReview = "Submitted for Review";

function randomPostInterval() {
  var BASE_LATENCY = 800;
  var variance = 500;
  return Math.floor(Math.random() * variance) + BASE_LATENCY;
}
function showSnackBar(state) {
  var x = document.getElementById("snackbar");
  x.innerText = state;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
function success() {
  location.replace("/blog-editor");
  return;
}
async function postData(url = "", data = {}) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    success: success,
  });
}

document.getElementById("btn").addEventListener("click", (e) => {
  document.getElementById("btn").disabled = true;
  var titleName = "";
  titleName = document.getElementById("input_field").value;
  //console.log(titleName);
  if (titleName !== "" && titleName !== undefined) {
    let cntn = tinymce.get("mytextareaedit").getContent();

    Prism.highlightAll();
    let newData = {
      blog_id: blogObject.blog_id,
      blog_title: titleName,
      blog_html: cntn,
    };
    console.log(newData);
    postData("/blog-edit", newData);
    showSnackBar(onSubmitForReview);
    setTimeout(() => {
      //location.replace("/blog-");
      if (editorWindowRef) {
        editorWindowRef.close();
      }
    }, randomPostInterval());
  }
});

var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}
