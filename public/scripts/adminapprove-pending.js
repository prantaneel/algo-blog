function htmlToText(html) {
  var temp = document.createElement("div");
  temp.innerHTML = html;
  console.log(temp.innerText);
  return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}
function sanitize(html) {
  var text = html.replace(/(<([^>]+)>)/g, "");
  return text;
}
function createPermissionObjectTableRow(blogObject) {
  var permobj = "";
  var id = blogObject.blog_id;
  var server_time = blogObject.blog_server_time.time;
  var server_date = blogObject.blog_server_time.date;
  var title = blogObject.blog_title;
  title = sanitize(title);
  if (title.length > 50) {
    title = title.substr(0, 50) + "...";
  }
  permobj = `<tr class="table-data-style"><td>${id}</td><td><a href="/admin-review?bid=${id}" target="_blank">${title}</a></td><td>${server_time}, ${server_date}</td></tr>`;
  console.log(permobj);
  return permobj;
}

var pendingRequests = "";
var arrlength = pending_admin_requests.pending_blogs.length;
for (var i = 0; i < arrlength; i++) {
  pendingRequests += createPermissionObjectTableRow(
    pending_admin_requests.pending_blogs[i]
  );
}
if (arrlength === 0) {
  document.getElementById("data-table").style.display = "none";
  // pendingRequests +=
  //   '<div class="empty-image"><img src="https://img.icons8.com/ios-glyphs/80/000000/empty-box.png"/><div>Empty</div></div>';
  document.getElementById("empty-div").innerHTML =
    '<div class="empty-image"><img src="https://img.icons8.com/ios-glyphs/80/FFFFFF/empty-box.png"/><div>Empty</div></div>';
} else {
  document.getElementById("data-table").innerHTML += pendingRequests;
}

function openReviewer(blog_id) {
  var linkToReview = `/admin-review?bid=${blog_id}`;
  const myWindow = window.open(linkToReview, "", "width=300,height=300");
}
