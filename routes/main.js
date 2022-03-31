const express = require("express");
const router = express.Router();


const { register, login, changeImage}
    = require('../controllers/userController')

const {createTopic, getAllTopics,
    getMyTopics,
    topicComments} = require('../controllers/forumController')

const {validateRegister, validateLogin, validateImage,
validateTopic} = require('../middleware/main')


router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/changeImage', validateImage, changeImage)

router.post('/createTopic', validateTopic, createTopic)
router.get('/allTopics', getAllTopics)
router.get('/myTopics', getMyTopics)

router.get('/topic/:id', topicComments)
//router.get('/logout', logout)


module.exports = router