const { writeData,getData,dataPopulate } = require('../../functions/data');
const { checkAuthenticated,adminApprove } = require('../../functions/authFuncs');
const { findInArr } = require('../../functions/randomFunc');
const { OUT_OF_BOUNDS } = require('../../initialization');

const { Router } = require('express');

const adminWorkRounter = Router();

adminWorkRounter.get("/admin-approve", checkAuthenticated, async (req, res) => {
  var fileData = await getData().catch((err) => console.log(err));
  var {pending_requests} = dataPopulate(fileData);
    //console.log(users);
    //console.log(pending_requests);
    res.render("admin-approve", {
      pending_requests: pending_requests,
    });
});
adminWorkRounter.get("/admin-declined", checkAuthenticated, async (req, res) => {
  var fileData = await getData().catch((err) => console.log(err));
  var {denied_blogs} = dataPopulate(fileData);
    res.render("declined-requests", {
      declined_requests: denied_blogs,
    });
});
//---------------admin-previewer---------------
adminWorkRounter.get("/admin-review", checkAuthenticated, async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data, denied_blogs,pending_requests} = dataPopulate(fileData);
    var blogid = parseInt(req.query.bid);
    var sendData = findInArr(
      pending_requests.pending_blogs,
      blogid,
      OUT_OF_BOUNDS
    );
    if (sendData === OUT_OF_BOUNDS)
      sendData = findInArr(denied_blogs.declined_blogs, blogid, OUT_OF_BOUNDS);
    if (sendData === OUT_OF_BOUNDS)
      sendData = findInArr(blog_data.blogs, blogid, OUT_OF_BOUNDS);
    res.render("admin-review", { blogObject: sendData });
});
//-------------admin-approve-code-incoming-------------
//--------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
  
adminWorkRounter.post("/admin-approve", checkAuthenticated, async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags} = dataPopulate(fileData);
    const approveBody = req.body;
    adminApprove(
      approveBody,
      pending_requests.pending_blogs,
      denied_blogs.declined_blogs,
      blog_data.blogs,
      OUT_OF_BOUNDS
    );
    await writeData(blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags).catch((err) => console.log(err));
    res.sendStatus(200);
});

module.exports=adminWorkRounter;