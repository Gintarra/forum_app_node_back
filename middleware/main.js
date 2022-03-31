const usersDb = require('../models/userSchema')

module.exports = {
    validateRegister: async (req, res, next) => {
        const { username, pass1, pass2 } = req.body;
        const userExist = await usersDb.findOne({username: username})
        if (pass1 !== pass2 || pass1.length < 5 || pass2.length > 20 || pass1.length < 3 || pass1.length > 20) {
            res.send({ error: "Slaptažodis turi būti 5-20 simbolių, sutapti." })
        }
        else if (username.length < 5 || username.length > 20) {
            res.send({ error: "Slapyvardis turi būti 5-20 simbolių." })
        } else if (userExist) {
            res.send({ error: "Slapyvardis jau užimtas." })
        }  else {
            next()
        }
    }, validateLogin: async (req, res, next) => {
        const { username, password } = req.body
        const userExist = await usersDb.findOne({ username: username })
        if (!userExist) {
            res.send({ success: false, message: 'Neteisingi duomenys' })
        } else {
            next()
        }
    },
    validateImage: async (req, res, next) => {
        const { newImage} = req.body
        if (newImage.length < 5 || newImage.length > 400) {
            res.send({success: false, message: "Netinkamas url." })
        } else {
            next()
        }
    }
}