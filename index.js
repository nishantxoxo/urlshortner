
const express = require("express")
const path= require("path")
const urlroute = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
const userRouter = require("./routes/user")
const cookieParser = require('cookie-parser')
const URL = require("./models/url")
const app = express()
const {checkforauthentication, restrictTo} = require('./middleware/auth')
const { connectmongoose } = require("./connect")
// const restrictToLoggedIn = require("./middleware/auth")
const PORT = 8001


connectmongoose('mongodb://127.0.0.1:27017/urlshort').then(()=> console.log("mongoose connected"))
app.set('view engine', "ejs")

app.set('views', path.resolve("./views") )


app.use(express.json())
app.use(express.urlencoded( {extended: false}))
app.use(cookieParser())
APP.use(checkforauthentication)
app.get("/test", async (req, res)=>{
    const allUrls = await URL.find({})
    return res.render('home', {urls: allUrls})

})


app.use('/url' , restrictTo(["NORMAL"]), urlroute)
app.use('/user', userRouter)
app.use('/', checkAuth, staticRouter)



// app.get('/url/:shortid', async (req, res)=> {
//     const shortId = req.params.shortid
//     const entry = await URL.findOneAndUpdate({shortId}, {$push: {visitHistory: {timestamp: Date.now(),},},},)

//     res.redirect(entry.redirectURL)
// })


app.listen(PORT, ()=> console.log("server started"))