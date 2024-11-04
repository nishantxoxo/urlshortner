// const {} = require('nanoid')
const shortid = require("shortid")
const url = require("../models/url")
async function generateShortUrl(req, res) {

    const body = req.body
    if(!body.url){
        console.log(body)
        return res.status(400).json({error: 'url is required'})

    }
    // const shortId = nanoid(8)
    const shortId = shortid()


    await url.create({shortId: shortId, redirectURL: body.url, visitHistory: []})

    // return res.json({id: shortId})

    return res.render("home", {id: shortId})
}

module.exports= {generateShortUrl}