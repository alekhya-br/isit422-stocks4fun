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

/*  * Model  *  mongousers must match the name of your collection in mlab mongo db */
// we are calling a constructor to create  model object, a template for our mongo documents
var mongousers = mongoose.model("mongousers", {
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    _id: Object
})

var UserObject = {
    firstname: "blah",
    lastname: "bark",
    username: "whatever",
    password: "code will overwrite",
    _id: Object
}

router.get('/', function (req, res) {
    res.send('no user here!');
});

router.get('/api/user_data', function (req, res) {
    mongoose.connect(conString, () => {    // like SQL, we first connect, then issue cmds
        mongousers.find({}, function (err, docs) {  // find({} gets all, docs is the name of the return json
            var oneUserArray = [];  // our new array we will return instead of TODOS array
            if (!err) {
                docs.forEach(function (oneUser, index) {  // fill up our array from mongodb's json
                    oneUserArray[index] = oneUser;    // oneUser is temp variable, like item in a C# foreach
                });
                res.send(oneUserArray);  // return our array
            } else { res.sendStatus(500); }  // something bad happened, send a server error http code
        });
    })
});


router.post('/api/user_data', function (req, res) {
    try {
        mongoose.connect(conString, () => {   // again, first we connect
            UserObject = req.body;  // get the posted data from angular
            UserObject._id = new ObjectID(); // set our  empty _id with new, unique _id key from mongo
            var aUser = new mongousers(UserObject); // not sure exactly how this works
            aUser.save();   // but we are creating a user object that matches what mongoose wants
        })                  // and then the .save causes mongoose to commit it over to mlab mongodb
        res.status(201).send(req.body) // 201 means successfully posted, don't think we need to 
        // return the req.body, but it seems to be often done
    }
    catch (ex) {  // we should have more try catch usage in this app!  At least here is one
        console.log("oh crap " + ex);
        res.status(500).send(req.body)
    }
});

router.delete('/api/user_data/:id', function (req, res) {
    try {
        mongoose.connect(conString, () => {   // connect
            // now convert the angular _id into the correct object type for mongo
            var mongoid = mongoose.Types.ObjectId(req.params.id);
            mongousers.findByIdAndRemove(mongoid, (err, user) => {   // nice mongoose method
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

router.put('/api/user_data/:id', function (req, res) {  // modify existing User using an http put
    try {
        mongoose.connect(conString, () => {   // connect
            var mongoid = mongoose.Types.ObjectId(req.params.id);   // convert the angular _id to the object type for mongo
            var userWithNoID = {}; // cannot pass in an object with an _id, as you are not allowed
            userWithNoID.firstname = req.body.firstname;
            userWithNoID.lastname = req.body.lastname;
            userWithNoID.username = req.body.username;    // to update the _id, so make a new copy object but leave out the _id
            userWithNoID.password = req.body.password;
            mongousers.findByIdAndUpdate(mongoid, userWithNoID, (err, user) => {
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
