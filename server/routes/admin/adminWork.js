const { writeData,getData, } = require('../../functions/data');
const { checkAuthenticated,adminApprove } = require('../../functions/authFuncs');
const { findInArr } = require('../../functions/randomFunc');
const { OUT_OF_BOUNDS } = require('../../initialization');
var { pending_requests,denied_blogs,  } = require('../../initialization');

const { Router } = require('express');

const adminWorkRounter = Router();

adminWorkRounter.get("/admin-approve", checkAuthenticated, async (req, res) => {
    await getData().catch((err) => console.log(err));
  
    //console.log(users);
    //console.log(pending_requests);
    res.render("admin-approve", {
      pending_requests: pending_requests,
    });
});
adminWorkRounter.get("/admin-declined", checkAuthenticated, async (req, res) => {
    await getData().catch((err) => console.log(err));
    res.render("declined-requests", {
      declined_requests: denied_blogs,
    });
});
//---------------admin-previewer---------------
adminWorkRounter.get("/admin-review", checkAuthenticated, (req, res) => {
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
    const approveBody = req.body;
    adminApprove(
      approveBody,
      pending_requests.pending_blogs,
      denied_blogs.declined_blogs,
      blog_data.blogs,
      OUT_OF_BOUNDS
    );
    await writeData().catch((err) => console.log(err));
    res.sendStatus(200);
});

module.exports=adminWorkRounter;