'use strict';
let Todo = require('./config/models'),
    logger = require('koa-logger'),
    router = require('koa-router')();

module.exports = function(app) {
    //Return all todos
    router.get('/api/todos', function*() {
        this.body = yield Todo.find({});
    });

    // create todo and send back all todos after creation
    router.post('/api/todos', function*() {
        this.type = 'json';
        this.body = JSON.stringify({
            "id": "123",
            "string": "Stroka"
        });
        this.body = "Hello";
        // create a todo, information comes from AJAX request from Angular
        /*this.body = yield Todo.insert({
            text: req.body.text,
            done: false
        });*/


    });

    app.use(router.routes());
};
