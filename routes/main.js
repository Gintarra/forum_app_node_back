const express = require("express");
const router = express.Router();


const { register, login, changeImage,
logout}
    = require('../controllers/userController')

const {createTopic, getAllTopics,
    getMyTopics,
    topicComments,
    commentsByPage,
addComment} = require('../controllers/forumController')

const {validateRegister, validateLogin, validateImage,
validateTopic, validateComment} = require('../middleware/main')


router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/changeImage', validateImage, changeImage)

router.post('/createTopic', validateTopic, createTopic)
router.get('/allTopics', getAllTopics)
router.get('/myTopics', getMyTopics)

router.get('/topic/:id/:pageIndex', commentsByPage)
router.post('/comment', validateComment, addComment)

router.get('/logout', logout)


module.exports = router