//URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({

    productForm: [{
        categoryLevel2: {
            type: Schema.Types.ObjectId,
            ref: 'CategoryLevel2',
            index: true
        },
        categoryLevel3: {
            type: Schema.Types.ObjectId,
            ref: 'CategoryLevel3',
            index: true
        },
        productForm: {
            type: Schema.Types.ObjectId,
            ref: 'ProductForm',
            index: true
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
});
// schema.plugin(URLSlugs('name', {
//     field: 'myslug'
// }));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Cart', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
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
};
module.exports = _.assign(module.exports, exports, model);




// {
//     id:'',
//     user:"",
//     product:[{productType:"ProductForm",id:"name"}]
// }