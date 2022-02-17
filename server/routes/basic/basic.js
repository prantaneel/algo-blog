const { getData } = require('../../functions/data');
const { Router } = require('express');

const basicRouter = Router();

//Landing Page
basicRouter.get("/", async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    res.render("landing-page");
});

//Live Editor   
basicRouter.get("/live-editor", (req, res) => {
    res.render("blog-template-live-server");
});

//About us
basicRouter.get("/about-us", (req, res) => {
	res.render("aboutUs");
});

//Error Page  
basicRouter.get("*", (req, res) => {
	res.render("error");
});

module.exports=basicRouter;
  