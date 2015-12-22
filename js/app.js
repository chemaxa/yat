!(function() {
    var app = angular.module('yat', []);

    app.service('TodoModel', function() {
        var model = this;
        model.todoList = [{
            id: 2,
            name: 'First Todo',
            description: 'Start with Angular',
            date: '11.12.2015',
            active: true
        }, {
            id: 1,
            name: 'Second Todo',
            description: 'Lets go controller with Angular',
            date: '12.12.2015',
            active: false
        }, {
            id: 3,
            name: 'Third Todo',
            description: 'Testing with Angular',
            date: '13.12.2015',
            active: true
        }, ];

    });

    app.controller('MainController', function(TodoModel) {
        var main = this;
        main.todoList = TodoModel.todoList;

        main.addTodo = function(todo) {
            todo.active = true;
            todo.id = TodoModel.todoList.slice(-1)[0].id + 1;

            TodoModel.todoList.push(todo);
            main.todo = {};
            console.log('Добавили ', TodoModel.todoList);
        };
        main.deleteTodo = function(todo) {
            console.log('Удаляем ', todo);
            TodoModel.todoList.forEach(function(item, i) {
                if (item.id === todo.id) {
                    console.log('Удаляем ', TodoModel.todoList[i]);
                    delete TodoModel.todoList[i];
                }
            });
            console.log('Удалили ', TodoModel.todoList);
        };
        main.toggleActiveTodo = function(todo) {
            if (todo)
                todo.active = (todo.active) ? false : true;
        };
    });
})();
