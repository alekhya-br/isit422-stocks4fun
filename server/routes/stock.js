var express = require('express');
var router = express.Router();

var marketData = [
    { symbol: 'DJIA', price: 25425.09, change: 154.26}, 
    { symbol: 'S&P 500', price: 2729.44, change: 6.76},
    { symbol: 'NASDAQ', price: 7283.16, change: -69.80},
    { symbol: 'GOOG', price: 120, change: 44},
    { symbol: 'YHOO', price: 100, change: 55},
    { symbol: 'MSFT', price: 20, change: 88},
    { symbol: 'AAPL', price: 200, change: 44},
    { symbol: 'AMZN', price: 400, change: 100}
];

/* GET home page. */
router.get('/', function(req, res) {
    res.send('no stock here!');
});

router.get('/api/market_data', function(req, res) {
    res.send( marketData );
});

module.exports = router;
