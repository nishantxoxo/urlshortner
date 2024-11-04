const express = require("express")
// const {} = require("../controllers/user");
const { handleUserLogin, handleUserSignup } = require("../controllers/user");
const router = express.Router()

router.post('/', handleUserSignup )
router.post('/login', handleUserLogin)

module.exports = router;  