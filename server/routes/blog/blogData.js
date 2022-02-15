const { findInArr } = require('../../functions/randomFunc');
const { getData, } = require('../../functions/data');
const { OUT_OF_BOUNDS } = require('../../initialization');
var { blog_data } = require('../../initialization');

const { Router } = require('express');

const blogDataRouter = Router();

blogDataRouter.get("/blog-editor", (req, res) => {
    res.render("editor");
});
//----------------------New Blog Entry------------------------------
//blog-entry can be later used as an external API endpoint
blogDataRouter.get("/blog-entry", (req, res) => {
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
    await getData().catch((err) => console.log(err));
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