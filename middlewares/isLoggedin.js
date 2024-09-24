const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports.isLoggedin = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error", "Please login to access this page");
        return res.redirect("/");
    }
    try{
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({email: decoded.email}).select("-password");
        if(!user){
            req.flash("error", "Please login to access this page");
            return res.redirect("/");
        }
        req.user = user;
        next();
    }
    catch(err){
        req.flash("error", "Please login to access this page");
        return res.redirect("/");
    }
};