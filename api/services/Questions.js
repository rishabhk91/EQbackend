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
        marks1:Number,
        option2: String,
        marks2:Number,
        option3: String,
        marks3:Number,
        option4: String,
        marks4:Number,
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

    findOneQuestion: function (data, callback) {
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

    getAllQuestionSet: function (data, callback) {
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
    }

};
module.exports = _.assign(module.exports, exports, model);