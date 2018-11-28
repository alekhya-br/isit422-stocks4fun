var router = require("express").Router();
const request = require("request");

var newMarketData;
var newTopDowJonesStockData;
var newTopSP500StockData;
var newTopNasdaqStockData;


router.get('/market_data', function (req, res) {
    request("https://www.worldtradingdata.com/api/v1/stock?symbol=^DJI,^IXIC,^INX&api_token=3VNuBxaRu4pkkxsJk9cGPCwbOaiiTFLaDrOvyXBNtSQqULQnnqn3fjca6eQu", function (error, res, body) {
        var content = JSON.parse(body).data;
        console.log("errors: ", error);
        console.log("statusCode: ", res && res.statusCode);
        console.log("JSON: ", content);

        newMarketData = content.map(rawData => ({
            symbol: rawData.symbol,
            name: rawData.name,
            price: rawData.price,
            change_pct: rawData.change_pct
        }))

        console.log("Filtered: ", newMarketData);
    });
    res.send(newMarketData);
});

router.get('/top_dowjones_dividend', function (req, res) {
    request("https://www.worldtradingdata.com/api/v1/stock?symbol=VZ,XOM,CVX,IBM,PFE&sort_order=asc&api_token=3VNuBxaRu4pkkxsJk9cGPCwbOaiiTFLaDrOvyXBNtSQqULQnnqn3fjca6eQu", function (error, res, body) {
        var content = JSON.parse(body).data;
        console.log("errors: ", error);
        console.log("statusCode: ", res && res.statusCode);
        console.log("JSON: ", content);

        newTopDowJonesStockData = content.map(rawData => ({
            symbol: rawData.symbol,
            name: rawData.name,
            price: rawData.price,
            change_pct: rawData.change_pct
        }))

        console.log("Filtered: ", newTopDowJonesStockData);
    });
    res.send(newTopDowJonesStockData);
});

router.get('/top_sp500_dividend', function (req, res) {
    request("https://www.worldtradingdata.com/api/v1/stock?symbol=ADP,IPG,TGT,FE,VLO&sort_order=asc&api_token=3VNuBxaRu4pkkxsJk9cGPCwbOaiiTFLaDrOvyXBNtSQqULQnnqn3fjca6eQu", function (error, res, body) {
        var content = JSON.parse(body).data;
        console.log("errors: ", error);
        console.log("statusCode: ", res && res.statusCode);
        console.log("JSON: ", content);

        newTopSP500StockData = content.map(rawData => ({
            symbol: rawData.symbol,
            name: rawData.name,
            price: rawData.price,
            change_pct: rawData.change_pct
        }))

        console.log("Filtered: ", newTopSP500StockData);
    });
    res.send(newTopSP500StockData);
});

router.get('/top_nasdaq_dividend', function (req, res) {
    request("https://www.worldtradingdata.com/api/v1/stock?symbol=STX,VOD,QCOM,KHC,PCAR&sort_order=asc&api_token=3VNuBxaRu4pkkxsJk9cGPCwbOaiiTFLaDrOvyXBNtSQqULQnnqn3fjca6eQu", function (error, res, body) {
        var content = JSON.parse(body).data;
        console.log("errors: ", error);
        console.log("statusCode: ", res && res.statusCode);
        console.log("JSON: ", content);

        newTopNasdaqStockData = content.map(rawData => ({
            symbol: rawData.symbol,
            name: rawData.name,
            price: rawData.price,
            change_pct: rawData.change_pct
        }))

        console.log("Filtered: ", newTopNasdaqStockData);
    });
    res.send(newTopNasdaqStockData);
});


router.get('/quote_search', (req, res) => {
    if (req && req.query && req.query.search_term) {
        searchTerm = req.query.search_term;
        console.log(`Response recieved with query: ${JSON.stringify(req.query)}`);
        if (searchTerm && searchTerm.length > 0)
            request(`https://www.worldtradingdata.com/api/v1/stock_search?`,
                {
                    qs: {
                        search_term: searchTerm,
                        api_token: '3VNuBxaRu4pkkxsJk9cGPCwbOaiiTFLaDrOvyXBNtSQqULQnnqn3fjca6eQu'
                    },
                    method: 'get'
                },
                (error, tradeApiResponse, body) => {
                    console.log(body)
                    var content = JSON.parse(body).data;
                    console.log("errors: ", error);
                    console.log("statusCode: ", tradeApiResponse && tradeApiResponse.statusCode);
                    console.log("JSON: ", content);
                    if (content !== undefined) {
                        newQuoteSearchData = content.map(rawData => ({
                            symbol: rawData.symbol,
                            name: rawData.name,
                            price: rawData.price,
                            change_pct: rawData.change_pct
                        }))

                        console.log("Filtered: ", newQuoteSearchData);
                        res.status(tradeApiResponse.statusCode).send(newQuoteSearchData);
                    } else {
                        console.log('no response')

                        body && body.message && res.status(500).send(body.message) || res.status(500).send("error");
                    }
                });

    } else {
        console.log('empty search query')
        res.send(400, "Empty search query")
    }
});

module.exports = router;