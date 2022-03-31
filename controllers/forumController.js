const topicsDb = require('../models/topicSchema')


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
            const topics = await topicsDb.find({owner: username})
            res.send({ success: true, data: topics });
        } catch (e) {
            return res.send({ success: false, message: 'Nerasta temų' })
        }
    },
    topicComments: async (req, res) => {
        const { username } = req.session;
        const {id} = req.params;
        try {
            const topics = await topicsDb.find({owner: username})
            res.send({ success: true, data: topics });
        } catch (e) {
            return res.send({ success: false, message: 'Nerasta temų' })
        }
    }
}