// const sessionIdToUserMap = new Map()

const jwt = require('jsonwebtoken')
const secret = "chotuchicki"

async function setUser(user){
    // sessionIdToUserMap.set(id, user);
    jwt.sign({
        _id : user._id,
        email : user.email,
        role: user.role
    }, secret )
 
}

async function getUser(token){
    // return sessionIdToUserMap.get(id)
    if (!token) return null;
    jwt.decode(token, secret)
}

module.exports = { setUser, getUser}