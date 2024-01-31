const path = require('path');
const { getStylesheets, getJavascripts } = require(path.join(__dirname, "../../v1/configs/assets.config"))
const QA = require(path.join(__dirname, "../../v1/models/QA"))

const QAController = {
    qa_list: async (req, res) => {
        try{
            
            let listQA = await QA.find({})
            let arr = []
            listQA.forEach(e => {
                arr.push({
                    id: e._id,
                    question: e.question,
                    answer: e.answer,
                    active: e.isActive
                })
            })
            
            res.render("document",{
                stylesheets: getStylesheets('table'),
                javascripts: getJavascripts('table'),
                listQA: arr
            })
        } catch(err) {
            console.log(err)
        }
        
    },

    getAddQAPage: async (req, res) => {
        try {
            res.render("chatbot_addQA",{
                stylesheets: getStylesheets(),
                javascripts: getJavascripts()
            })
        } catch (error) {
            console.error(error);
            res.status(400).send("Failed");
        }
    },

    addQA: async (req, res) => {
        try {
            const question = req.body.question;
            const answer = req.body.answer;

            const newQA = new QA({ question: question, answer: answer });
            await newQA.save();
            return res.status(200).send("Successed");
        } catch (error) {
            res.status(500).json({ message: "Add erorr" });
        }
    },

    updateQA: async (req, res) => {
        try {
            await QA.findOneAndUpdate({
                _id: req.body.id
            }, {
                question: req.body.question,
                answer: req.body.answer
            })
            res.status(200).send("Successed")
        } catch (error) {
            console.log(error)
            res.status(400).send("Failed")
        }
    },

    changeStatus: async (req, res) => {
        let isActive = false;
        if (req.body.active === 'false') {
            isActive = true;
        }
        try {
            await QA.findOneAndUpdate({
                _id: req.body.id
            }, {
                isActive: isActive
            })
            res.status(200).send("Successed")
        } catch (error) {
            console.log(error)
            res.status(400).send("Failed")
        }
    },
}

module.exports = QAController