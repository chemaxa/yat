'use strict';
let Todo = require('./config/models'),
    logger = require('koa-logger'),
    router = require('koa-router')(),
    koaBody = require('koa-body')();

module.exports = function(app) {
    //Return all todos
    router.get('/api/todos', function*() {
        this.body = yield Todo.find({});
    });

    // create todo and send back all todos after creation
    router.post('/api/todos', koaBody, function*() {

        let todo = new Todo({
            name: this.request.body.name,
            description: this.request.body.description,
            completed: this.request.body.completed,
            date: this.request.body.date
        });

        try {
            yield todo.save();
            this.body = yield Todo.find({});
        } catch (e) {
            console.log('Error: ', e);
            this.body = e.message;
        }
    });

    //read todo
    router.get('/api/todos/:id', function*() {
        try {
            let todo = yield Todo.find({
                _id: this.params.id
            });
            this.body = todo;
        } catch (e) {
            this.body = e.message;
        }
    });

    // update todo
    router.put('/api/todos/:id', function*() {
        console.log('This: ', this.params.id);
        try {
            let todo = yield Todo.find({
                _id: this.params.id
            });
            this.body = todo;
        } catch (e) {
            this.body = e.message;
        }
    });

    // delete  todo
    router.del('/api/todos/:id', function*() {
        try {
            let todo = yield Todo.remove({
                _id: {
                    $in: this.params.id.split(',')
                }
            });
            this.body = todo;
        } catch (e) {
            this.body = e.message;
        }
    });

    app.use(router.routes());
};
