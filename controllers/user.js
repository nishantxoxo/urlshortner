const {v4: uuidv4} = require('uuid')
const { setUser } = require("../service/auth")

const User = require("../models/user")
async function handleUserSignup(req, res) {

    const {name, email, password} = req.body;

    await User.create({ name, email, password})

    return res.redirect("/")
    
}
async function handleUserLogin(req, res) {

    const {email, password} = req.body;
   
    const user = await User.findOne({email: email, password: password})
    console.log(user)
    if(!user){
        return res.render("login", {error: "invalid username or password"})
    }
    console.log("check")
    // const sessionId = uuidv4() 
    const token = setUser(user)
    res.cookie("uid", token)
    return res.redirect("/")



    // return res.json({token})
    
}

module.exports= {handleUserSignup, handleUserLogin}