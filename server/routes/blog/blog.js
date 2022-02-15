const { getData,dataPopulate }= require('../../functions/data');
const { Router } = require('express');

const getBlogRouter= Router();

getBlogRouter.get("/blogs", async (req, res) => {
    var filedata = await getData().catch((err) => console.log(err));
    var {blog_data} = dataPopulate(filedata);
    var PERPAGE = 23;
    var page;
    if (!req.query.p) page = 0;
    else page = parseInt(req.query.p) - 1;
    var blogLength = blog_data.blogs.length;
    if (blogLength < PERPAGE * page || page < 0) {
      res.render("blogs", { blog_data: { blogs: blog_data.blogs }, page: 1 });
    } else {
      var initialInd = PERPAGE * page;
      res.render("blogs", {
        blog_data: {
          blogs: blog_data.blogs.slice(initialInd, initialInd + PERPAGE),
        },
        page: page + 1,
      });
    }
});

module.exports=getBlogRouter;