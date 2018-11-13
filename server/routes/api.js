var router = require("express").Router();
const request = require("request");

router.get('/stock_data', function (req, res) {
    request("https://www.worldtradingdata.com/api/v1/stock?symbol=MSFT&api_token=3VNuBxaRu4pkkxsJk9cGPCwbOaiiTFLaDrOvyXBNtSQqULQnnqn3fjca6eQu", function (error, res, body) {
        var content = JSON.parse(body).data;
        console.log("errors: ", error);
        console.log("statusCode: ", res && res.statusCode);
        console.log("JSON: ", content);

        var newData = content.map(rawData => ({
            symbol: rawData.symbol,
            name: rawData.name,
            price: rawData.price,
            change_pct: rawData.change_pct
        }))

        console.log("Filtered: ", newData);
    });
    res.send(newData);
});

module.exports = router;