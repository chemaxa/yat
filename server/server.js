'use strict';
let koa = require('koa'),
    favicon = require('koa-favicon'),
    app = koa();

//Favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// response
app.use(function*() {

    console.log('Request: ', this.request);
    this.body = "Hello world";

});

app.listen(1337);
