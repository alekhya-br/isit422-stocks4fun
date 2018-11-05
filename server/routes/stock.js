var express = require('express');
var router = express.Router();

var stocksArray= [
    { symbol: 'DJIA', price: 25425.09, change: 154.26}, 
    { symbol: 'S&P 500', price: 2729.44, change: 6.76},
    { symbol: 'NASDAQ', price: 7283.16, change: -69.80}
];

/* GET home page. */
router.get('/', function(req, res) {
    res.send('no stock here!');
});

router.get('/api', function(req, res) {
    res.send( stocksArray );
});

module.exports = router;
