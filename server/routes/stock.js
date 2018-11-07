var express = require('express');
var router = express.Router();

var marketData = [
    { symbol: 'DJIA', name: 'Dow Jones', price: 25425.09, change: 154.26},
    { symbol: 'NASDAQ', name: 'Nasdaq', price: 7283.16, change: -69.80},
    { symbol: 'S&P 500', name: 'S&P 500', price: 2729.44, change: 6.76}
];

var stockData = [
    { symbol: 'GOOG', name: 'Alphabet Class C', price: 120, change: 44},
    { symbol: 'YHOO', name: 'Yahoo Inc', price: 100, change: 55},
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 20, change: 88},
    { symbol: 'AAPL', name: 'Apple Inc', price: 200, change: 44},
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 400, change: 100}
];

/* GET home page. */
router.get('/', function(req, res) {
    res.send('no stock here!');
});

router.get('/api/market_data', function(req, res) {
    res.send( marketData );
});

router.get('/api/stock_data', function(req, res) {
    res.send( stockData );
});

router.get('/api/stock_search/:id', function(req, res) {
    try {
        for (var i = 0; i < stockData.length; ++i){
            if (obj[i].symbol == req.params.id.toUpperCase()){
                console.log("found: " + req.params.id);
                res.send( obj[i] );
            }
        }
    }
    catch (ex) {
        console.log("oh crap " + ex);
        res.sendStatus(404);  // say not found
    }
});

module.exports = router;
