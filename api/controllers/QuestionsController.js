module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    saveQuestions: function (req, res) {
        if (req.body) {
            Questions.saveQuestions(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    editQuestions: function (req, res) {
        if (req.body) {
            Questions.editQuestions(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    removeQuestions: function (req, res) {
        if (req.body) {
            Questions.removeQuestions(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    findOneQuestion: function (req, res) {
        if (req.body) {
            Questions.findOneQuestion(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    getAllQuestionSet: function (req, res) {
        if (req.body) {
            Questions.getAllQuestionSet(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    }


};
module.exports = _.assign(module.exports, controller);