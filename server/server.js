'use strict';
//Set up
let koa = require('koa'),
    serve = require('koa-static'),
    db = require('./config/db'),
    log = console.log,
    logger = require('koa-logger'),
    mongoose = require('mongoose'),
    app = koa();

//Connect to Db
mongoose.connect(db.url);
let cnct = mongoose.connection;
cnct.on('error', console.error.bind(console, 'connection error:'));
cnct.once('open', function() {
    log('Connected to Db');
});

//Logger
app.use(logger());

//Static
app.use(serve('client'));

//Router
require('./routes')(app);
let port = process.env.PORT || 3000;
let host = process.env.IP || "localhost";
app.listen(port,host);
console.log("Server opened on: ",host,":",port);

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
