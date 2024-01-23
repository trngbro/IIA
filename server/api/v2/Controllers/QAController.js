const path = require('path');
const { getStylesheets, getJavascripts } = require(path.join(__dirname, "../../v1/configs/assets.config"))
const QA = require(path.join(__dirname, "../../v1/models/QA"))

const QAController = {
    staff_list: async (req, res) => {
        try{
            let staffs = await Staff.find({})
                .populate('user')
                .populate('department')
                .exec();
            let arr = []

            staffs.forEach(e => {
                arr.push({
                    username: e.user.username,
                    name: e.user.name,
                    email: e.user.email,
                    department: e.department.name,
                    rate: e.rate
                })
            })
            
            res.render("staff_list",{
                stylesheets: getStylesheets('table'),
                javascripts: getJavascripts('table'),
                staff: arr
            })
        }catch{

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
    }
}

module.exports = QAController