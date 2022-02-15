require("./db");
require("./initialization");

const bp = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
var flash = require("express-flash");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

const adminCredRouter=require("./routes/admin/adminCred");
const adminWorkRounter=require("./routes/admin/adminWork");
const basicRouter=require("./routes/basic/basic");
const getBlogRouter=require("./routes/blog/blog");
const newBlogRouter = require("./routes/blog/newBlog");
const blogEditRouter = require("./routes/blog/blogEdit");
const blogDataRouter = require("./routes/blog/blogData");

const express = require("express");
const app = express();

//----------------------------Configuration----------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
      origin: "*",
    })
);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"../public")));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
  
app.use(
    session({
    	secret: `r-fOAdc_VBsa$d4"R'{yej5yU5~EnRER/Vn|{tRaeK4etOjGY[_(WHUGg4}6B}`,
      	resave: false,
      	saveUninitialized: false,
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

app.use(adminCredRouter);
app.use(adminWorkRounter);
app.use(basicRouter);
app.use(getBlogRouter);
app.use(newBlogRouter);
app.use(blogEditRouter);
app.use(blogDataRouter);


app.listen(process.env.PORT || 3000, () => {
	console.log("server started");
});