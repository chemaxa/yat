'use strict';
let Todo = require('./config/models'),
    router = require('koa-router')();

module.exports = function(app) {
    //
    router.get('/api/todos', function*() {
        //Return all todos
        this.body = yield Todo.find();
    });

    app.use(router.routes());
};
