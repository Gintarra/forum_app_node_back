const express = require("express");
const router = express.Router();


const { register,
    login,
    changeImage,
    getUser,
    logout }
    = require('../controllers/userController')

const { createTopic,
    getAllTopics,
    getMyTopics,
    commentsByPage,
    addComment,
    getFavorites,
    decreaseNotification } = require('../controllers/forumController')

const { validateRegister,
    validateLogin,
    validateImage,
    validateTopic,
    validateComment } = require('../middleware/main')

//user routes
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/getUser', getUser)
router.post('/changeImage', validateImage, changeImage)
router.get('/logout', logout)

//forum routes
router.post('/createTopic', validateTopic, createTopic)
router.get('/allTopics', getAllTopics)
router.get('/myTopics', getMyTopics)
router.post('/favorites', getFavorites)
router.get('/topic/:id/:pageIndex', commentsByPage)
router.post('/comment', validateComment, addComment)
router.post('/decrease', decreaseNotification)


module.exports = router