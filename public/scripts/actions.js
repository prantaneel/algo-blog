// Example POST method implementation:
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
  // Default options are marked with *
  //console.log("lol");
  //console.log(timeNow);
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    success: success,
  });
  // const response = await fetch(url, {
  //   method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   mode: "cors", // no-cors, *cors, same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: "include", // include, *same-origin, omit
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: "follow", // manual, *follow, error
  //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify(data), // body data type must match "Content-Type" header
  // });

  // return response.json(); // parses JSON response into native JavaScript objects
}

document.getElementById("btn").addEventListener("click", (e) => {
  document.getElementById("btn").disabled = true;
  var titleName = "";
  titleName = document.getElementById("input_field").value;
  //console.log(titleName);
  if (titleName !== "" && titleName !== undefined) {
    let cntn = tinymce.get("mytextarea").getContent();

    Prism.highlightAll();
    let newData = {
      blog_title: titleName,
      blog_html: cntn,
    };
    console.log(newData);
    postData("/new-blog-post", newData);
    showSnackBar(onSubmitForReview);
    setTimeout(() => {
      //location.replace("/blog-editor");
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
