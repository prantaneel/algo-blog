const BlogData = require("../../model");
var { fileData,
    blog_data,
    denied_blogs,
    pending_requests,
    users,
    blogIdState,
    blogTags,
} = require("../initialization");
var ObjectId = require("mongodb").ObjectId;


//-----------------------Data initialisation-------------------------
async function getData() {
  fileData = await BlogData.find()
    .then((document) => {
      return document[0];
    })
    .catch((e) => {
      console.error(e);
    });
  blog_data = fileData.blog_data;
  pending_requests = fileData.pending_requests;
  denied_blogs = fileData.denied_blogs;
  blogTags = fileData.blogTags;
  users = fileData.users;
  blogIdState = fileData.blogIdState;
};
async function writeData() {
  //console.log(fileData);
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
};