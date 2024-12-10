const { getUser } = require('../service/auth')

// const User = require("../models/user")

function checkforauthentication(req, res, next){
    const header = req.cookies.uid;
    if(!header){ 
        return next() 
    }
    // const userUid = header.split("Bearer ")[1];
    const user =  getUser(header)
    req.user = user
    next();
}

function restrictTo(roles){
    return function (req, res, next){
        if(!req.user) return  res.redirect("/login")
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized")
        return next();
    }
}


module.exports = {checkforauthentication, restrictTo}
