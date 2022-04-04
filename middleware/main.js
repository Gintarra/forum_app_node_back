const usersDb = require('../models/userSchema')

module.exports = {
    validateRegister: async (req, res, next) => {
        const { username, pass1, pass2 } = req.body;
        const userExist = await usersDb.findOne({ username: username })
        if (pass1 !== pass2 || pass1.length < 5 || pass2.length > 20 || pass1.length < 3 || pass1.length > 20) {
            res.send({ error: "Slaptažodis turi būti 5-20 simbolių, sutapti." })
        }
        else if (username.length < 5 || username.length > 20) {
            res.send({ error: "Slapyvardis turi būti 5-20 simbolių." })
        } else if (userExist) {
            res.send({ error: "Slapyvardis jau užimtas." })
        } else {
            next()
        }
    },
    validateLogin: async (req, res, next) => {
        const { username, password } = req.body
        const userExist = await usersDb.findOne({ username: username })
        if (!userExist) {
            res.send({ success: false, message: 'Neteisingi duomenys' })
        } else {
            next()
        }
    },
    validateImage: (req, res, next) => {
        const { newImage } = req.body
        if (newImage.length < 5 || newImage.length > 200) {
            res.send({ success: false, message: "Netinkamas url, ilgis turi būti 5-200 simbolių." })
        } else {
            next()
        }
    },
    validateTopic: async (req, res, next) => {
        const { newTopic } = req.body
        if (newTopic.length < 5 || newTopic.length > 50) {
            res.send({ success: false, message: "Netinkamas pavadinimas, ilgis turi būti 5-50 simbolių." })
        } else {
            next()
        }
    },
    validateComment: (req, res, next) => {
        const { text } = req.body
        if (text.length < 5 || text.length > 500) {
            res.send({ success: false, message: "Netinkamas komentaras, ilgis turi būti 5-500 simbolių." })
        } else {
            next()
        }
    }
}