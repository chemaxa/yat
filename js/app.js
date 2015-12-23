!(function() {
    var app = angular.module('yat', []);

    app.service('TodoModel', function() {
        var model = this;
        model.todoList = [{
            id: 2,
            name: 'First Todo',
            description: 'Start with Angular',
            date: new Date(2015, 2, 1, 0, 0, 0, 0),
            completed: true
        }, {
            id: 1,
            name: 'Second Todo',
            description: 'Lets go controller with Angular',
            date: new Date(2015, 1, 1, 0, 0, 0, 0),
            completed: false
        }, {
            id: 3,
            name: 'Third Todo',
            description: 'Testing with Angular',
            date: new Date(2015, 0, 1, 0, 0, 0, 0),
            completed: true
        }, ];

    });

    app.controller('MainController', function(TodoModel) {
        var main = this;
        main.todoList = TodoModel.todoList;

        main.predicate = 'date';
        main.reverse = false;

        main.addTodo = function(todo) {
            todo.completed = false;
            //Get last element Id & increment it
            todo.id = (TodoModel.todoList.slice(-1)[0]) ? TodoModel.todoList.slice(-1)[0].id + 1 : 0;

            var yyyy = todo.date.split('.')[2],
                mm = todo.date.split('.')[1],
                dd = todo.date.split('.')[0];

            todo.date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);

            TodoModel.todoList.push(todo);
            main.todo = {};
            console.log('Добавили ', TodoModel.todoList);
        };
        main.deleteTodo = function(todo) {
            TodoModel.todoList.forEach(function(item, i) {
                if (item.id === todo.id) {
                    console.log('Удаляем ', TodoModel.todoList[i]);
                    delete TodoModel.todoList[i];
                }
            });
            console.log('Удалили ', TodoModel.todoList);
        };
        main.toggleCompletedTodo = function(todo) {
            console.log(todo);
            if (todo)
                todo.completed = (todo.completed) ? false : true;
        };

        main.order = function(predicate) {
            main.reverse = (main.predicate === predicate) ? !main.reverse : false;
            main.predicate = predicate;
            console.log(main)
        };
    });

    app.directive('todoslist', function() {
        return {
            restrict: 'E',
            controller: 'MainController',
            controllerAs: 'main',
            templateUrl: 'todosList.html'
        };
    });
})();
