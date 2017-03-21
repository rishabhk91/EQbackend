URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    name: {
        type: String
    },
    designation: {
        type: String,
    },
     content: {
        type: String,
    },
     image: {
        type: String,
    },
      horizontalImage: {
        type: String,
    },
      order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        index: true
    }
});
schema.plugin(URLSlugs('name', {field: 'myslug'}));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Testimonial', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
      getByUrl: function (data, callback) {
    this.findOne({
      "myslug": data.myslug
        }, function(err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);