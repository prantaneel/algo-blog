const { writeData,getData,dataPopulate }= require("../../functions/data");
const { timeURL } = require("../../initialization");
const { getTime } = require("../../functions/randomFunc");
const { Router } = require('express');

const blogEditRouter = Router();

blogEditRouter.get("/blog-edit", async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data} = dataPopulate(fileData);
    var bid = parseInt(req.query.bid);
    for (articles in blog_data.blogs) {
        if (blog_data.blogs[articles].blog_id === bid) {
            //console.log(blog_data.blogs[articles]);
            res.render("blog-edit", { blogObject: blog_data.blogs[articles] });
            return;
        }
    }
});
blogEditRouter.post("/blog-edit", async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags} = dataPopulate(fileData);
    var body = req.body;
    // console.log(body);
    var bid = parseInt(body.blog_id);
    const serverTime = await getTime(timeURL);
    var ind = 0;
    for (articles in blog_data.blogs) {
        if (blog_data.blogs[articles].blog_id === bid) {
            // console.log(blog_data.blogs[articles]);
            ind = articles;
            break;
        }
    }
    blog_data.blogs[ind].rev++;
    var newData = blog_data.blogs[ind];
    newData.blog_server_time = serverTime;
    newData.blog_title = body.blog_title;
    newData.blog_html = body.blog_html;
    pending_requests.pending_blogs.push(newData);
    await writeData(blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags).catch((err) => console.log(err));
    res.sendStatus(200);
});

module.exports=blogEditRouter;