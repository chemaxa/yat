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

module.exports = Todo;
