const express =require("express")
const URL = require("../models/url")
const { restrictTo } = require("../middleware/auth")

const router = express.Router()

router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res)=> {
    // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({})
    // console.log(allUrls)
    return res.render("home", {urls: allUrls});
})



router.get('/', restrictTo(["NORMAL"]), async (req, res)=> {
    // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({CreatedBy: req.user._id})
    // console.log(allUrls)
    return res.render("home", {urls: allUrls});
})


router.get('/signup',(req, res)=>{
    return res.render("signup") 
} )

router.get("/login", (req, res)=> {
    return res.render ("login")
})


module.exports = router     