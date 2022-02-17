const passport = require("passport");
const bcrypt = require("bcrypt");
const { writeData,getData,dataPopulate } = require("../../functions/data");
const { checkAuthenticated,checkOwner,checkNotAuthenticated } = require("../../functions/authFuncs");

const { Router } = require('express');

const adminCredRouter = Router();

/////---------------admin login--------------------------------
adminCredRouter.get("/admin-login", checkNotAuthenticated, async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    res.render("admin-login.ejs");
});

adminCredRouter.get("/admin-register", checkOwner, (req, res) => {
    var regerr = req.query.registerError;
    if (regerr === "alreadyregistered") {
      res.render("admin-register.ejs", { errorMessage: "Already Registered" });
    } else if (regerr === "missingcreds") {
      res.render("admin-register.ejs", { errorMessage: "Missing Credentials" });
    } else res.render("admin-register.ejs", { errorMessage: undefined });
});

adminCredRouter.post("/admin-register", checkOwner, async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags} = dataPopulate(fileData);
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      //need to check if the user with that mail already exists
      var user = users.find((user) => user.email === req.body.email);
      if (user) {
        var registeredError = "alreadyregistered";
        res.redirect(`/admin-register?registerError=${registeredError}`);
      } else if (
        req.body.email == "" ||
        req.body.name == "" ||
        req.body.password == ""
      ) {
        var registeredError = "missingcreds";
        res.redirect(`/admin-register?registerError=${registeredError}`);
      } else {
        users.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          role: "_mod",
          password: hashedPassword,
        });
        await writeData(blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags).catch((err) => console.log(err));
        res.redirect("/admin-login");
      }
    } catch {
      res.redirect("/admin-register");
    }
});
  
adminCredRouter.post(
    "/admin-login",
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/admin-approve",
      failureRedirect: "/admin-login",
      failureFlash: true,
    })
);

adminCredRouter.delete("/admin-logout", (req, res) => {
    req.logOut();
    res.redirect("/admin-login");
});
////////////////////////////////////////////////////////////////////////
///Admin password protected
adminCredRouter.get("/admin-password-change", checkAuthenticated, (req, res) => {
    var regerr = req.query.registerError;
    if (regerr === "wrongpassword") {
      res.render("change-password", { errorMessage: "Wrong Password" });
    } else res.render("change-password", { errorMessage: undefined });
});
adminCredRouter.post("/admin-password-change", checkAuthenticated, async (req, res) => {
    var fileData = await getData().catch((err) => console.log(err));
    var {blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags} = dataPopulate(fileData);
    var body = req.body;
    var user = req.user;
    const hashedPasswordnew = await bcrypt.hash(req.body.new_password, 10);
    var ind = -1;
    for (element in users) {
      if (users[element].email === user.email) {
        ind = element;
      }
    }
    var cmp = bcrypt.compare(
      body.current_password,
      users[ind].password,
      (err, result) => {
        if (!result) {
          var registeredError = "wrongpassword";
          res.redirect(`/admin-password-change?registerError=${registeredError}`);
          return;
        } else {
          users[element].password = hashedPasswordnew;
          writeData(blog_data, denied_blogs,pending_requests,users,blogIdState,blogTags);
          res.redirect("/admin-login");
        }
        return result;
      }
    );
});

module.exports=adminCredRouter;