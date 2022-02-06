function loadPage(href) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", href, false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

if (blogData === -1) {
  document.getElementById("hr-alt").style.display = "none";
  document.getElementById("blog-body").style.display = "none";
  document.getElementById("blog-title").style.display = "none";

  document.getElementsByClassName("btngroup")[0].style.display = "none";
  var errorHtml = loadPage("../error.html");
  document.write(errorHtml);
} else {
  document.title = blogData.blog_title;
  document.getElementById("blog-title").textContent = blogData.blog_title;
  document.getElementById(
    "blog-time"
  ).textContent = `Published on ${blogData.blog_server_time.date}, ${blogData.blog_server_time.time}`;
  document.getElementById("blog-body").innerHTML = blogData.blog_html;
}

//approve code----------------------------------------------------------------
//so on approval send an approval signal with the blog_id to the server
//it should be a post request to encode the url and the blog_id
//make an approval endpoint
//POST to /admin-review
var sentdata = {
  blog_id: blogData.blog_id,
  approve_code: 0,
  rev: blogData.rev,
};
function redirect(url) {
  location.replace(url);
}
function showSnackBar(state) {
  var x = document.getElementById("snackbar");
  x.innerText = state;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
async function postReviewJudgement(url = "", data = {}, redirectUrl) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  window.close();
  return response.json(); // parses JSON response into native JavaScript objects
}
document.getElementById("approve").onclick = (e) => {
  sentdata.approve_code = 1;
  showSnackBar("Approved");
  setTimeout(() => {
    postReviewJudgement("/admin-approve", sentdata);
  }, 1000);
};
document.getElementById("decline").onclick = (e) => {
  showSnackBar("Declined");
  setTimeout(() => {
    postReviewJudgement("/admin-approve", sentdata);
  }, 1000);
};
