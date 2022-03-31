const express = require("express");
const router = express.Router();


const { register, login, changeImage}
    = require('../controllers/userController')

const {validateRegister, validateLogin, validateImage} = require('../middleware/main')


router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/changeImage', validateImage, changeImage)

//router.get('/logout', logout)


module.exports = router