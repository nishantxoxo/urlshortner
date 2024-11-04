const express =require("express")
const URL = require("../models/url")
const { generateShortUrl } = require("../controllers/url")
const router = express.Router()

router.post('/', generateShortUrl)

router.get('/test', (req, res)=> {return res.end("<h1> hey server </h1>")})

router.get("/analytics", )

router.get('/:shortid', async (req, res)=> {
    const shortId = req.params.shortid
    const entry = await URL.findOneAndUpdate({shortId}, {$push: {visitHistory: {timestamp: Date.now(),},},},)

    res.redirect(entry.redirectURL)
})


module.exports = router 