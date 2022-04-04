const topicsDb = require('../models/topicSchema')
const commentsDb = require('../models/commentsSchema')
const usersDb = require('../models/userSchema')
const rowsCountPerPage = 10;
let notificationArray = []


module.exports = {
    createTopic: async (req, res) => {
        const { username } = req.session;
        const { newTopic } = req.body;
        if (username) {
            const topic = new topicsDb();
            topic.owner = username
            topic.title = newTopic
            topic.createdTimestamp = Date.now()
            topic.save()
                .then(async () => {
                    return res.send({ success: true, message: 'Tema sukurta', data: topic._id });
                })
                .catch((e) => {
                    return res.send({
                        success: false, message: 'Nepavyko sukurti temos',
                    });
                });
        }
    },
    getAllTopics: async (req, res) => {
        try {
            const topics = await topicsDb.find({})
            res.send({ success: true, data: topics });
        } catch (e) {
            return res.send({ success: false, message: 'Nerasta temų' })
        }
    },
    getMyTopics: async (req, res) => {
        const { username } = req.session;
        try {
            const topics = await topicsDb.find({ owner: username })
            const comments = await commentsDb.find({ owner: username })
            const topicsAll = await topicsDb.find({})
            res.send({ success: true, data: topics, data2: comments, data3: topicsAll });
        } catch (e) {
            return res.send({ success: false, message: 'Nerasta temų' })
        }
    },
    commentsByPage: async (req, res) => {
        const { username } = req.session;
        const { id, pageIndex } = req.params;
        let skipIndex = 0;
        if (pageIndex > 1) {
            skipIndex = (Number(pageIndex) - 1) * rowsCountPerPage;
        }
        const comments = await commentsDb.find({ topicID: id }).skip(skipIndex).limit(rowsCountPerPage);

        const topic = await topicsDb.findOne({ _id: id })
        let search = null;
        let filteredArray = []
        if (username) {
            let user = await usersDb.findOne({ username: username })
            notificationArray = user.notification;
            search = notificationArray.find(x => x == id)
            filteredArray = notificationArray.filter(x => x != id)
        }
        if (username && search) {
            const topicOwner = await usersDb.updateOne({ username: username }, { $set: { notification: filteredArray } })
        }
        user = await usersDb.findOne({ username: username })
        const allCommentsCount = await commentsDb.find({ topicID: id }).count({});
        res.send({
            success: true,
            data: comments,
            data2: allCommentsCount,
            data3: user,
            data4: topic.title
        });
    },
    addComment: async (req, res) => {
        const { username } = req.session;
        const { id, text } = req.body;
        const user = await usersDb.findOne({ username: username })
        const topic = await topicsDb.findOne({ _id: id })
        const topicOwnerUser = await usersDb.findOne({ username: topic.owner })
        if (topicOwnerUser) {
            notificationArray = topicOwnerUser.notification;
        } else {
            notificationArray = []
        }
        const search = notificationArray.find(x => x == id)
        if (!search) {
            notificationArray.push(topic._id)
        }
        if (username) {
            const updatedUser = await usersDb.findOneAndUpdate({ username: username }, { $inc: { commentsAmount: 1 } })
            if (topic.owner !== username) {
                const topicOwner = await usersDb.findOneAndUpdate({ username: topic.owner }, { $set: { notification: notificationArray } })
            }
            const updateTopic = await topicsDb.findOneAndUpdate({ _id: id }, { $set: { lastCommentBy: username }, $inc: { commentsAmount: 1 } })

            const comment = new commentsDb();
            comment.owner = username
            comment.topicID = id
            comment.text = text
            comment.imageUser = user.image
            comment.registeredUserTimestamp = user.registerTimestamp
            comment.createdTimestamp = Date.now()
            comment.save()
                .then(async () => {
                    return res.send({ success: true, message: 'Komentaras sukurtas' });
                })
                .catch((e) => {
                    return res.send({
                        success: false, message: 'Nepavyko sukurti komentaro',
                    });
                });
        }
    },
    getFavorites: async (req, res) => {
        const { favoritesIndex } = req.body;
        try {
            const topics = await topicsDb.find({ _id: favoritesIndex })
            res.send({ success: true, data: topics });
        } catch (e) {
            return res.send({ success: false, message: 'Nerasta temų' })
        }
    }
}