document.title = re.blog_title;
document.getElementById("blog-title").textContent = re.blog_title;
document.getElementById(
  "blog-time"
).textContent = `Updated on ${re.blog_server_time.date}, ${re.blog_server_time.time}`;
document.getElementById("blog-body").innerHTML = re.blog_html;
var x = document.getElementsByTagName("PRE");
for (var i = 0; i < x.length; i++) {
  x[i].classList.add("line-numbers");
}
Prism.highlightAll();
