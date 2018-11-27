var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

//var  catsArray= [{ name: 'lilly' }, { name: 'lucy' }, { name: 'linda'}, {name: 'layla'}];
// var TODOS = [
//     { id: 11, title: "Get Lunch2", detail: "Get some lunch at noon.", priority: 3 },
//     { id: 12, title: "Prepare for class2", detail: "Review my assignment carefully.", priority: 1 },
//     { id: 13, title: "Call Mom2", detail: "Call Mom and thank her.", priority: 2 },
//     { id: 14, title: "Play Horizon Zero Dawn2", detail: "Olay the game for 30 minutes", priority: 5 },
//     { id: 15, title: "Sleep2", detail: "Get 8 hours of sleep.", priority: 1 },
// ];

var conString = "mongodb://allenbc:allenbc1@ds029051.mlab.com:29051/isit422";

/*  * Model  *  orders must match the name of your collection in mlab mongo db */
// we are calling a constructor to create  model object, a template for our mongo documents
var orders = mongoose.model("orders", {
    user_uid: String,
    stock_symbol: String,
    stock_name: String,
    stock_quantity: Number,
    stock_price: Number,
    _id: Object
})

var OrderObject = {
    user_uid: 'unknown uid',
    stock_symbol: 'unknown symbol',
    stock_name: 'unknown name',
    stock_quantity: 0,
    stock_price: 0,
    _id: Object
}

router.get('/', function (req, res) {
    res.send('no order here!');
});

router.get('/api/order_data', function (req, res) {
    mongoose.connect(conString, () => {    // like SQL, we first connect, then issue cmds
        orders.find({}, function (err, docs) {  // find({} gets all, docs is the name of the return json
            var oneOrderArray = [];  // our new array we will return instead of TODOS array
            if (!err) {
                docs.forEach(function (oneOrder, index) {  // fill up our array from mongodb's json
                    oneOrderArray[index] = oneOrder;    // oneOrder is temp variable, like item in a C# foreach
                });
                res.send(oneOrderArray);  // return our array
            } else { res.sendStatus(500); }  // something bad happened, send a server error http code
        });
    })
});


router.post('/api/order_data', function (req, res) {
    try {
        mongoose.connect(conString, () => {   // again, first we connect
            OrderObject = req.body;  // get the posted data from angular
            OrderObject._id = new ObjectID(); // set our  empty _id with new, unique _id key from mongo
            var aOrder = new orders(OrderObject); // not sure exactly how this works
            aOrder.save();   // but we are creating a order object that matches what mongoose wants
        })                  // and then the .save causes mongoose to commit it over to mlab mongodb
        res.status(201).send(req.body) // 201 means successfully posted, don't think we need to 
        // return the req.body, but it seems to be often done
    }
    catch (ex) {  // we should have more try catch usage in this app!  At least here is one
        console.log("oh crap " + ex);
        res.status(500).send(req.body)
    }
});

router.delete('/api/order_data/:id', function (req, res) {
    try {
        mongoose.connect(conString, () => {   // connect
            // now convert the angular _id into the correct object type for mongo
            var mongoid = mongoose.Types.ObjectId(req.params.id);
            orders.findByIdAndRemove(mongoid, (err, order) => {   // nice mongoose method
                if (err) return res.status(404).send(err);
                return res.sendStatus(204);  // say all is well
            });
        });
    }
    catch (ex) {
        console.log("oh crap " + ex);
        res.sendStatus(404);  // say not found
    }
});

router.put('/api/order_data/:id', function (req, res) {  // modify existing Order using an http put
    try {
        mongoose.connect(conString, () => {   // connect
            var mongoid = mongoose.Types.ObjectId(req.params.id);   // convert the angular _id to the object type for mongo
            var orderWithNoID = {}; // cannot pass in an object with an _id, as you are not allowed
            orderWithNoID.user_uid = req.body.user_uid;
            orderWithNoID.stock_symbol = req.body.stock_symbol;
            orderWithNoID.stock_name = req.body.stock_name;    // to update the _id, so make a new copy object but leave out the _id
            orderWithNoID.stock_quantity = req.body.stock_quantity;
            orderWithNoID.stock_price = req.body.stock_price;
            orders.findByIdAndUpdate(mongoid, orderWithNoID, (err, order) => {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.sendStatus(204);  // say all is well
            });
        });
    }
    catch (ex) {
        console.log("oh crap " + ex);
        res.sendStatus(500);  // say server error
    }
});

module.exports = router;
