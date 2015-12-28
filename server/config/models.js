'use strict';
let mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    name: String,
    description: String,
    date: Date,
    completed: Boolean
});
