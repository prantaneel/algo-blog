const cors = require("cors");
const { timeURL,BLOG_ID_INC } = require("../../initialization");
var { blogIdState,pending_requests, } = require("../../initialization");
const blogidcalc = require("../../../functions/blog-id-calc");
const { writeData } = require("../../functions/data");
const { getTime } = require("../../functions/randomFunc");
const { Router } = require('express');

const newBlogRouter = Router();

newBlogRouter.post("/new-blog-post", cors(), async (req, res) => {
    const blogd = req.body;
    const serverTime = await getTime(timeURL);
    blogIdState = blogidcalc.getblogid(blogIdState, BLOG_ID_INC);
    var newDataObject = blogidcalc.formDataModel(blogd, blogIdState, serverTime);
    pending_requests.pending_blogs.push(newDataObject);
    await writeData().catch((err) => console.log(err));
    res.sendStatus(200);
});

module.exports =newBlogRouter;