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

var winningStocks = [
    { symbol: 'AKER', name: 'Akers Biosciences Inc', price: 2.25, change: 1.94},
    { symbol: 'CYTXW', name: 'Cytori Therapeutic Inc', price: 0.02, change: 0.01},
    { symbol: 'NUROW', name: 'NeuroMetrix Inc', price: 0.07, change: 0.04},
    { symbol: 'IAMXR', name: 'I-AM Capital Acquisition Company Rights', price: 0.51, change: 0.24},
    { symbol: 'CLRBZ', name: 'Cellectar Biosciences Inc', price: 0.14, change: 0.06}
];

var losingStocks = [
    { symbol: 'OXBRW', name: 'Oxbridge Re Holdings Ltd', price: 0.02, change: -0.07},
    { symbol: 'CHEKW', name: 'Check-Cap Ltd', price: 0.07, change: -0.10},
    { symbol: 'DLPNW', name: 'Dolphin Entertainment Inc', price: 0.08, change: -0.09},
    { symbol: 'MGI', name: 'MoneyGram International Inc', price: 2.27, change: 2.20},
    { symbol: 'AMRHW', name: 'Ameri Holdings Inc', price: 0.03, change: -0.02}
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

router.get('/api/winning_stocks', function(req, res) {
    res.send( winningStocks );
});

router.get('/api/losing_stocks', function(req, res) {
    res.send( losingStocks );
});

router.get('/api/stock_search/:term', function(req, res) {
    try {
        let found = false;
        for (var i = 0; i < stockData.length; ++i) {
            if (stockData[i].symbol == req.params.term.toUpperCase()){
                console.log("found: " + req.params.term);
                found = true;
                res.send( stockData[i] );
                break;
            }
        }
        if(!found) {
            res.sendStatus(404);  // say not found
        }
    }
    catch (ex) {
        console.log("oh crap " + ex);
        res.sendStatus(404);  // say not found
    }
    
});

module.exports = router;
