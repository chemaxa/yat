'use strict';
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let todoSchema = new mongoose.Schema({
    id: {
        type: ObjectId
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    completed: {
        type: Boolean,
        required: true
    }
});
let Todo = mongoose.model('Todo', todoSchema);
/*//Create Todo
let exampleTodo = new Todo({
    name: 'Second Todo',
    description: 'Lets go controller with Angular',
    completed: false
});
//Save Todo to Db
exampleTodo.save(function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log("success!")
    }
});
console.log(exampleTodo);
//Find all todos in Db
Todo.find({}, function(err, todo) {
    console.log(todo);
})*/
module.exports = Todo;
