function getBlogId(lastBlogId, incrementVal) {
  const newBlogId = lastBlogId + incrementVal;
  return newBlogId;
}

function formDataModel(blogDataObject, blogId, serverTime) {
  var newData = {
    blog_id: blogId,
    blog_title: blogDataObject.blog_title,
    blog_html: blogDataObject.blog_html,
    rev: blogDataObject.rev,
    blog_server_time: serverTime,
  };
  return newData;
}

module.exports = {
  getblogid: getBlogId,
  formDataModel: formDataModel,
};
