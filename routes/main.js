const express = require("express");
const router = express.Router();


const { register, login, userProfile}
    = require('../controllers/userController')

//const {validateUser, validatePost} = require('../middleware/main')
//reikes 

router.post('/register', register)
router.post('/login', login)
router.get('/profile', userProfile)

//router.get('/logout', logout)


module.exports = router