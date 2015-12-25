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

    app.controller('MainController', function(TodoModel, $filter) {
        var main = this;
        main.todoList = TodoModel.todoList;

        main.predicate = 'date';
        main.reverse = false;

        main.openCreateTodoForm = function() {
            main.todo = {};
            $('#createTodoForm').modal();
        };
        main.closeCreateTodoForm = function(todo) {
            $('#createTodoForm').modal('hide');
            main.createTodo(todo);
        };

        main.createTodo = function(todo) {
            todo.completed = false;
            //Get last element Id & increment it
            todo.id = (TodoModel.todoList.slice(-1)[0]) ? TodoModel.todoList.slice(-1)[0].id + 1 : 0;

            var yyyy = todo.date.split('.')[2],
                mm = todo.date.split('.')[1],
                dd = todo.date.split('.')[0];

            todo.date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);

            TodoModel.todoList.push(todo);
            main.todo = {};
        };

        main.deleteTodo = function(todo) {
            TodoModel.todoList.forEach(function(item, i) {
                if (item.id === todo.id) {
                    delete TodoModel.todoList[i];
                }
            });
        };

        main.openUpdateTodoForm = function(todo) {
            $('#updateTodoForm').modal();
            main.readTodo(todo);
        };

        main.closeUpdateTodoForm = function(todo) {
            main.todo = {};
            $('#updateTodoForm').modal('hide');
        };

        main.readTodo = function(todo) {
            main.todo = todo;
            main.todo.date = $filter('date')(todo.date, "dd.MM.yyyy");
        };

        main.toggleCompletedTodo = function(todo) {

            if (todo)
                todo.completed = (todo.completed) ? false : true;
            console.log(main.todoList);

        };

        main.order = function(predicate) {
            main.reverse = (main.predicate === predicate) ? !main.reverse : false;
            main.predicate = predicate;
            console.log(main);
        };

        main.isSortBy = function(predicate) {
            return (!main.reverse && main.predicate == predicate);
        };

        main.clearCompleted = function() {
            TodoModel.todoList.forEach(function(todo) {
                if (todo.completed) {
                    console.log(todo);
                    main.deleteTodo(todo);
                }
            });
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

    app.directive('updatetodoform', function() {
        function link() {
            $('#datepicker').datepicker({
                format: 'dd.mm.yyyy'
            });
        }
        return {
            restrict: 'E',
            controller: 'MainController',
            controllerAs: 'main',
            link: link,
            templateUrl: 'updateTodoForm.html',
        };
    });

    app.directive('createtodoform', function() {
        function link() {
            $('#datepicker').datepicker({
                format: 'dd.mm.yyyy'
            });
        }
        return {
            restrict: 'E',
            controller: 'MainController',
            controllerAs: 'main',
            link: link,
            templateUrl: 'createTodoForm.html',
        };
    });
})();
