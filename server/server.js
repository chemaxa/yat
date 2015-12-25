'use strict';
let koa = require('koa'),
    favicon = require('koa-favicon'),
    app = koa(),
    db = {
        name: "yat",
        user: "yat",
        password: "Ydha&26Ol!#",

    };
db.url = "mongodb://" + db.name + ":" + db.password + "!#@ds047114.mongolab.com:47114/yat";

//Favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// response
app.use(function*() {

    console.log('Request: ', this.request);
    this.body = "Hello world";

});

app.listen(1337);
