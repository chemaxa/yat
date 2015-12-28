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
    log('Connected');
});

//Logger
app.use(logger());

//Static
app.use(serve('client'));

//Router
require('./routes')(app);

app.listen(1337);
