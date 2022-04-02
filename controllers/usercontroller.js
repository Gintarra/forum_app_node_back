const bcrypt = require('bcrypt')
const usersDb = require('../models/userSchema')





module.exports = {
    register: async (req, res) => {
        const { username, pass1, pass2 } = req.body
        const hash = await bcrypt.hash(pass1, 10)
        const user = new usersDb()
        user.username = username
        user.password = hash
        user.image = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        user.registerTimestamp = Date.now()
        user.commentsAmount = 0
      //  user.notification = []
        user.save()
            .then(async () => {
                return res.send({ success: true, message: 'Vartotojas įrašytas' });
            })
            .catch((e) => {
                return res.send({
                    success: false,
                    message: 'Nepavyko įrašyti vartotojo',
                });
            });
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const userExist = await usersDb.findOne({ username: username })
        console.log(userExist)
        const compare = await bcrypt.compare(password, userExist.password)
        if (username === userExist.username && compare) {
            req.session.username = username
            return res.send({ success: true, data: userExist })
        } else {
            res.send({ success: false, message: 'Neteisingi duomenys' })
        }
    },
    getUser:async (req, res) => {
        const { username } = req.session
        const userExist = await usersDb.findOne({ username: username })
        if (userExist) {
            return res.send({ success: true, data: userExist })
        } else {
            res.send({ success: false, message: 'Neteisingi duomenys' })
        }
    },
    changeImage: async (req, res) => {
        const { username } = req.session
        const { newImage, user } = req.body
        if (username) {
            const newUserData = await usersDb.findOneAndUpdate({ username: user }, { image: newImage }, { new: true })
            return res.send({ success: true, data: newUserData })
        } else {
            res.send({ success: false, message: 'Neteisingi duomenys' })
        }
    },
    logout: (req, res) => {
        req.session.username = null
        res.send({ success: true })
    }
}