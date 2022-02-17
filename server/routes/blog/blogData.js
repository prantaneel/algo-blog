const { findInArr } = require('../../functions/randomFunc');
const { getData,dataPopulate } = require('../../functions/data');
const { OUT_OF_BOUNDS } = require('../../initialization');

const { Router } = require('express');

const blogDataRouter = Router();

blogDataRouter.get("/blog-editor", (req, res) => {
    res.render("editor");
});
//----------------------New Blog Entry------------------------------
//blog-entry can be later used as an external API endpoint
blogDataRouter.get("/blog-entry", async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data} = dataPopulate(fileData);
    let bid = parseInt(req.query.bid);
    var returnObject = findInArr(blog_data.blogs, bid, OUT_OF_BOUNDS);
    if (returnObject !== OUT_OF_BOUNDS) res.json(returnObject);
    else {
        res.json({ found: false });
    }
});
//-------------------------------------------------
//-------------------------------------------------
blogDataRouter.get("/blog-data", async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data} = dataPopulate(fileData);
    let bid = parseInt(req.query.bid);
    //console.log(bid);
  
    for (articles in blog_data.blogs) {
      if (blog_data.blogs[articles].blog_id === bid) {
        //console.log(blog_data.blogs[articles]);
        res.render("blog-template", { blogObject: blog_data.blogs[articles] });
        return;
      }
    }
    res.render("error");
});

module.exports=blogDataRouter;