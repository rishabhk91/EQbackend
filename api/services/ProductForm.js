URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    image: {
        type: String,
    },
    order: {
        type: String,
    },
    price: {
        type: String,
    },
    metclassMarkFormIda: {
        type: String,
    },
    meta: {
        type: String,
    },
    categoryLevel3: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryLevel3',
        index: true
    }


});
schema.plugin(URLSlugs('name', {
    field: 'myslug'
}));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('ProductForm', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "categoryLevel3", "categoryLevel3", "order", "order"));
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
    findByCategoryLevel3: function (data, callback) {
        CategoryLevel3.findOne({
            "myslug": data.myslug
        }, function (err, cat) {
            if (err) {
                callback(err, null);
            } else {
                ProductForm.find({
                    categoryLevel3: cat._id
                }).populate({
                    path: 'categoryLevel3',
                    model: 'CategoryLevel3',
                    populate: {
                        path: 'categoryLevel2',
                        model: 'CategoryLevel2',
                        populate: {
                            path: 'category',
                            model: 'Category'
                        }
                    }
                }).exec(function (err, found) {
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