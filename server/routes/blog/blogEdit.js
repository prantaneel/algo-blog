const { writeData }= require("../../functions/data");
const { timeURL } = require("../../initialization");
var { blog_data,pending_requests, } = require("../../initialization");
const { getTime } = require("../../functions/randomFunc");
const { Router } = require('express');

const blogEditRouter = Router();

blogEditRouter.get("/blog-edit", (req, res) => {
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
    await writeData().catch((err) => console.log(err));
    res.sendStatus(200);
});

module.exports=blogEditRouter;