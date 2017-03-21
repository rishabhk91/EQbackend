module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
     findByCategoryLevel2: function (req, res) {
        if (req.body) {
            CategoryLevel3.findByCategoryLevel2(req.body, res.callback);
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