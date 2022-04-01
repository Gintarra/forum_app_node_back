const topicsDb = require('../models/topicSchema')
const commentsDb = require('../models/commentsSchema')
const usersDb = require('../models/userSchema')
const rowsCountPerPage = 10;


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
                    return res.send({ success: true, message: 'Tema sukurta' });
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
            const comments = await commentsDb.find({owner: username})
            res.send({ success: true, data: topics, data2: comments });
        } catch (e) {
            return res.send({ success: false, message: 'Nerasta temų' })
        }
    },
    // topicComments: async (req, res) => {
    //     const { username } = req.session;
    //     const { id } = req.params;
    //     try {
    //         const comments = await commentsDb.find({ topicID: id })
    //         res.send({ success: true, data: comments });
    //     } catch (e) {
    //         return res.send({ success: false, message: 'Nerasta temų' })
    //     }
    // },
    commentsByPage: async (req, res) => {
        const { username } = req.session;
        const { id, pageIndex } = req.params;
        let skipIndex = 0;
        if (pageIndex > 1) {
            skipIndex = (Number(pageIndex) - 1) * rowsCountPerPage;
          }
          const comments = await commentsDb.find({topicID: id}).skip(skipIndex).limit(rowsCountPerPage);
          const allCommentsCount = await commentsDb.find({topicID: id}).count({});
          res.send({
            success: true,
            data: comments,
            data2: allCommentsCount
          });
    },
    addComment: async (req, res) => {
        const { username } = req.session;
        const { id, text } = req.body;
        const user = await usersDb.findOne({username: username})
        const topic = await topicsDb.findOne({_id: id})
        if (username) {
            const updatedUser = await usersDb.findOneAndUpdate({username: username}, {$inc: {commentsAmount: 1}})
            const topicOwner = await usersDb.findOneAndUpdate({username: topic.owner}, {$inc: {notification: 1}})
            const comment = new commentsDb();
            comment.owner = username
            comment.topicID = id
            comment.text = text
            comment.imageUser = user.image
            comment.registeredUserTimestamp =user.registerTimestamp
            comment.createdTimestamp = Date.now()
            comment.commentsAmount =+ 1
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
        const {favoritesIndex } = req.body;
        try {
            const topics = await topicsDb.find({_id: favoritesIndex })
            res.send({ success: true, data: topics});
        } catch (e) {
            return res.send({ success: false, message: 'Nerasta temų' })
        }
    }
}