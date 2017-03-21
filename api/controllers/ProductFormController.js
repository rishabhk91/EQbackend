module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    
     findByCategoryLevel3: function (req, res) {
        if (req.body) {
            ProductForm.findByCategoryLevel3(req.body, res.callback);
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