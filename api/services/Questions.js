var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    totalmarks: {
        type: String
    },
    duration: {
        type: String
    },
    questionSet: [{
        question: String,
        option1: String,
        marks1: {
            type: Number,
            default: 0
        },
        option2: String,
        marks2: {
            type: Number,
            default: 0
        },
        option3: String,
        marks3: {
            type: Number,
            default: 0
        },
        option4: String,
        marks4: {
            type: Number,
            default: 0
        },

    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Questions', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    saveQuestions: function (data, callback) {
        console.log(data);
        Questions.findOneAndUpdate({
            _id: data._id,
        }, {
            $push: {
                questionSet: {
                    $each: data.questionSet
                }
            }
        }).exec(function (err, found) {

            if (err) {
                // console.log(err);
                callback(err, null);
            } else {

                if (found) {

                    callback(null, found);
                } else {
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }

        })
    },


    editQuestions: function (data, callback) {

        console.log(data);
        Questions.update({
            '_id': data._id,
            'questionSet._id': data.id
        }, {
            '$set': {
                'questionSet.$.question': data.question,
                'questionSet.$.option1': data.option1,
                'questionSet.$.marks1': data.marks1,
                'questionSet.$.option2': data.option2,
                'questionSet.$.marks2': data.marks2,
                'questionSet.$.option3': data.option3,
                'questionSet.$.marks3': data.marks3,
                'questionSet.$.option4': data.option4,
                'questionSet.$.marks4': data.marks4,
            }
        }, function (err, found) {

            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    console.log("inside is empty");
                    callback(null, "No Data Found");
                } else {
                    console.log("success", found);
                    callback(null, found);
                }
            }

        })
    },

    removeQuestions: function (data, callback) {

        console.log("DATA", data);
        Questions.update({
            '_id': data._id,
            'questionSet._id': data.id
        }, {
            '$pull': {
                questionSet: {
                    _id: data.id
                }
            }
        }, function (err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    console.log("inside is empty");
                    callback(null, "No Data Found");
                } else {
                    console.log("success", found);
                    callback(null, found);
                }
            }

        })
    },

    findOneTest: function (data, callback) {
        Questions.findOne({
            _id: data._id
        }).deepPopulate("questionSet").exec(function (err, found) {

            if (err) {

                callback(err, null);
            } else {

                if (found) {
                    console.log("Found", found);
                    callback(null, found);
                } else {
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }
        })
    },

    getAllTest: function (data, callback) {
        Questions.find().deepPopulate("questionSet").exec(function (err, found) {

            if (err) {

                callback(err, null);
            } else {

                if (found) {
                    console.log("Found", found);
                    callback(null, found);
                } else {
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }
        })
    },

    getAllQuestionSet: function (data, callback) {
        console.log("id", data._id);
        Questions.aggregate([{

                $unwind: {
                    path: "$questionSet",
                    preserveNullAndEmptyArrays: true // optional
                }
            },

            // Stage 2
            {
                $match: {
                    "_id": ObjectId(data._id)
                }
            },
        ], function (error, data1) {
            if (error) {
                callback(error, null);
            } else {
                console.log("respo", data1);
                callback(null, data1);
            }
        });
    },

    findOneQuestion: function (reqBody, callback) {

        Questions.findOne({
            _id: reqBody._id
        }).exec(function (error, found) {
            if (error || found == undefined) {
                console.log("Questions >>> findOneQuestion >>>  Questions.findOne >>> error", error);
                callback(error, null);
            } else {
                if (_.isEmpty(found)) {
                    callback(null, {
                        message: "No data found"
                    });
                } else {
                    callback(null, found);
                }
            }
        })
    }



};
module.exports = _.assign(module.exports, exports, model);