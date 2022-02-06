document.getElementById("live-editor").onclick = (e) => {
  editorWindowRef = window.open("/live-editor");
};

document.getElementById("input_field").onkeyup = (e) => {
  liveData.blog_title = document.getElementById("input_field").value;
  liveData.blog_html = tinymce.get("mytextarea").getContent();
  if (editorWindowRef) {
    var time = new Date();
    var date = time.toLocaleDateString();
    time = time.toLocaleTimeString();
    editorWindowRef.document.getElementById("blog-title").textContent =
      liveData.blog_title;
    editorWindowRef.document.getElementById(
      "blog-time"
    ).textContent = `Updated on ${date}, ${time}`;
    editorWindowRef.document.getElementById("blog-body").innerHTML =
      liveData.blog_html;
  }
};
