`use strict`
//import dependency
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var commentroute = require('./src/commentroute');

//instance creation
var app = express();
var router = express.Router();

var port = 3001;

//DB Config
var mongoDB = 'mongodb://srinath:srinath@ds239217.mlab.com:39217/mernstack';
mongoose.connect(mongoDB,{useMongoClient: true})
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB Connection Error'));

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
   //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
   });

router.use('/comments',commentroute);

app.use('/api', router);

app.listen(port, function() {
    console.log('api running on port ' + port);
   });