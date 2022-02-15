const cors = require("cors");
const { timeURL,BLOG_ID_INC } = require("../../initialization");
const blogidcalc = require("../../../functions/blog-id-calc");
const { writeData,getData,dataPopulate } = require("../../functions/data");
const { getTime } = require("../../functions/randomFunc");
const { Router } = require('express');

const newBlogRouter = Router();

newBlogRouter.post("/new-blog-post", cors(), async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags} = dataPopulate(fileData);
    const blogd = req.body;
    const serverTime = await getTime(timeURL);
    blogIdState = blogidcalc.getblogid(blogIdState, BLOG_ID_INC);
    var newDataObject = blogidcalc.formDataModel(blogd, blogIdState, serverTime);
    pending_requests.pending_blogs.push(newDataObject);
    await writeData(blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags).catch((err) => console.log(err));
    res.sendStatus(200);
});

module.exports =newBlogRouter;