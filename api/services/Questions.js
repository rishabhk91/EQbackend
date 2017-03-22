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
        option2: String,
        option3: String,
        option4: String,
        answer: String
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
                videoGallery: {
                    $each: data.videoGallery
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
            'videoGallery._id': data.id
        }, {
            '$set': {
                'videoGallery.$.image': data.image,
                'videoGallery.$.caption': data.caption
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
            'videoGallery._id': data.id
        }, {
            '$pull': {
                videoGallery: {
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

    findOneSet: function (data, callback) {
        Questions.findOne({
            _id: data._id
        }).deepPopulate("videoGallery").exec(function (err, found) {

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


};
module.exports = _.assign(module.exports, exports, model);