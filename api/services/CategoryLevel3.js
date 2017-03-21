URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    imageThumb: {
        type: String,
    },
    imageDetailView: {
        type: String,
    },
    order: {
        type: String,
    },
    price: {
        type: String,
    },
    meta: {
        type: String,
    },
    categoryLevel2: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryLevel2',
        index: true
    }

});
schema.plugin(URLSlugs('name', {
    field: 'myslug'
}));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('CategoryLevel3', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "categoryLevel2", "categoryLevel2"));
var model = {
    getByUrl: function (data, callback) {
        this.findOne({
            "myslug": data.myslug
        }, function (err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
    findByCategoryLevel2: function (data, callback) {
        CategoryLevel2.findOne({
            "myslug": data.myslug
        }, function (err, cat) {
            if (err) {
                callback(err, null);
            } else {
                CategoryLevel3.find({
                    categoryLevel2: cat._id
                }).populate('categoryLevel2').exec(function (err, found) {
                    if (err) {
                        // console.log(err);
                        callback(err, null);
                    } else {
                        if (found) {
                            console.log("IN FOUND", found);
                            callback(null, found);
                        } else {
                            callback(null, {
                                message: "No Data Found"
                            });
                        }
                    }
                })
            }
        });

    }
};
module.exports = _.assign(module.exports, exports, model);