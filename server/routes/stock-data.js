var express = require('express');
var router = express.Router();

var stocksData = [
    {id: 1, symbol: 'GOOG', price: 120, change: 44},
    {id: 2, symbol: 'YHOO', price: 100, change: 55},
    {id: 3, symbol: 'MSFT', price: 20, change: 88},
    {id: 4,symbol: 'AAPL', price: 200, change: 44},
    {id: 5, symbol: 'AMZN', price: 400, change: 100}
];

/* GET home page. */
router.get('/', function(req, res) {
    res.send('no stock here!');
});

router.get('/api/stock_data', function(req, res) {
    res.send( marketData );
});

module.exports = router;