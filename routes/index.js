var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


// root routes
router.get("/", function(req, res){
    res.render("landing");
});



// auth routes
// show sign up page 
router.get("/register",function(req,res){
    res.render("register");
})

// Post route gather info from singup page 
router.post("/register",function(req,res){
    var newUser= new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// login page
router.get("/login",function(req,res){
    res.render("login");
});

// handel login request
router.post("/login",passport.authenticate("local",{
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
     }),function(req,res){
    
});
// log out routes
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// middelware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;