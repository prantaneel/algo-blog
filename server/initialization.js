const passport = require("passport");
const initializePassport = require("../passport-config");
const constants = require("../functions/constants");

initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id)
);
  
const OUT_OF_BOUNDS = constants.OUT_OF_BOUNDS;
const INIT_BLOG_ID = constants.INIT_BLOG_ID;
const BLOG_ID_INC = constants.BLOG_ID_INC;
const timeURL = constants.TIME_URL;
var fileData;
var blog_data = {};
var pending_requests = {};
var denied_blogs = {};
var blogTags = [];
var users = [];
var blogIdState = INIT_BLOG_ID;

module.exports={
    OUT_OF_BOUNDS,
    INIT_BLOG_ID,
    BLOG_ID_INC,
    timeURL,
    fileData,
    blog_data,
    pending_requests,
    denied_blogs,
    blogTags,
    users,
    blogIdState
}