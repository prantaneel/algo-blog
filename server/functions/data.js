const BlogData = require("../../model");
var ObjectId = require("mongodb").ObjectId;

//-----------------------Data initialisation-------------------------
async function getData() {
  var fileData = await BlogData.find()
    .then((document) => {
      return document[0];
    })
    .catch((e) => {
      console.error(e);
    });
  
  return fileData;

};

function dataPopulate(fileData) {
  var blog_data = fileData.blog_data;
  var pending_requests = fileData.pending_requests;
  var denied_blogs = fileData.denied_blogs;
  var blogTags = fileData.blogTags;
  var users = fileData.users;
  var blogIdState = fileData.blogIdState;
  return {blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags};
}

async function writeData(blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags) {
  var fileData;
  fileData.blog_data = blog_data;
  fileData.pending_requests = pending_requests;
  fileData.denied_blogs = denied_blogs;
  fileData.blogTags = blogTags;
  fileData.users = users;
  fileData.blogIdState = blogIdState;
  await BlogData.updateOne(
    { _id: new ObjectId("620013d4be7425026e2fba74") },
    {
      $set: fileData,
    }
  ).catch((err) => {
    console.error(err);
  });
};

module.exports={
    getData,
    writeData,
    dataPopulate
};