// console.log(pending_admin_requests);
console.log(declined_admin_requests);
//now we need to create template approval objects to render each pending admin request.

// function createPermissionObject(blogObject) {
//   var permobj = "";
//   var id = blogObject.blog_id;
//   permobj = `
//   <div class="permission-container" id="permission-${id}" onclick="openReviewer(${blogObject.blog_id})">
//   <h2>${blogObject.blog_title}</h2>
//   <div class="server-time">${blogObject.blog_server_time.date}, ${blogObject.blog_server_time.time}</div>
//   </div>
//   `;
//   return permobj;
// }

function createPermissionObjectTableRow(blogObject) {
  var permobj = "";
  var id = blogObject.blog_id;
  var server_time = blogObject.blog_server_time.time;
  var server_date = blogObject.blog_server_time.date;
  var title = blogObject.blog_title;
  if (title.length > 50) {
    title = title.substr(0, 50) + "...";
  }
  permobj = `<tr class="table-data-style"><td>${id}</td><td><a href="/admin-review?bid=${id}" target="_blank">${title}</a></td><td>${server_time}, ${server_date}</td></tr>`;
  console.log(permobj);
  return permobj;
}

var declinedRequests = "";
var arrlength = declined_admin_requests.declined_blogs.length;
for (var i = 0; i < arrlength; i++) {
  declinedRequests += createPermissionObjectTableRow(
    declined_admin_requests.declined_blogs[i]
  );
}

if (arrlength === 0) {
  document.getElementById("data-table").style.display = "none";
  // pendingRequests +=
  //   '<div class="empty-image"><img src="https://img.icons8.com/ios-glyphs/80/000000/empty-box.png"/><div>Empty</div></div>';
  document.getElementById("empty-div").innerHTML =
    '<div class="empty-image"><img src="https://img.icons8.com/ios-glyphs/80/FFFFFF/empty-box.png"/><div>Empty</div></div>';
} else {
  document.getElementById("data-table").innerHTML += declinedRequests;
}

function openReviewer(blog_id) {
  var bid = parseInt(blog_id);
  var linkToReview = `/admin-review?bid=${bid}`;
  const myWindow = window.open(linkToReview, "", "width=300,height=300");
}
