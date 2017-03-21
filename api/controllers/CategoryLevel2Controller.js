module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
     findByCategory: function (req, res) {
        if (req.body) {
            CategoryLevel2.findByCategory(req.body, res.callback);
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