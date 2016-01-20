'use strict';
let Todo = require('./config/models'),
    logger = require('koa-logger'),
    router = require('koa-router')(),
    koaBody = require('koa-body')();

module.exports = function (app) {
    // Redirect to main page from all routes

    //Return all todos
    router.get('/api/todos', function* () {
        this.body = yield Todo.find({});
    });

    //Fetch todo by Id
    router.get('/api/todos/:id', function* () {
        try {
            this.body = yield Todo.find({
                _id: this.params.id.split(',')
            });
        } catch (e) {
            this.body = e.message;
        }
    });

    // create todo and send back all todos after creation
    router.post('/api/todos', koaBody, function* () {
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


    // update todo
    router.put('/api/todos/:id', koaBody, function* () {
        console.log('This: ', this.params.id);
        console.log(this.request.body);
        try {
            let todo = yield Todo.update({
                _id: this.params.id
            }, {
                name: this.request.body.name,
                description: this.request.body.description,
                completed: this.request.body.completed,
                date: this.request.body.date
            });
            this.body = yield Todo.find({});
        } catch (e) {
            this.body = e.message;
        }
    });

    // delete  todo
    router.del('/api/todos/:id', function* () {
        try {
            let todo = yield Todo.remove({
                _id: {
                    $in: this.params.id.split(',')
                }
            });
            //Return new todolist
            this.body = yield Todo.find({});
        } catch (e) {
            this.body = e.message;
        }
    });
    router.redirect('/*', '/');
    app.use(router.routes());
};
