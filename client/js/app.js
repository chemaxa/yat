!(function() {
    var app = angular.module('yat', []);

    app.service('TodoModel', function($http) {
        var model = this;

        model.all = function() {
            return $http.get('/api/todos').then((response) => {
                return response.data;
            });
        };
        model.fetchById = function(id) {
            return $http.get('/api/todos/' + id).then((response) => {
                return response.data;
            });
        };
        model.create = function(data) {
            return $http.post('/api/todos', data).then((response) => {
                return response.data;
            });
        };
        model.update = function(todo) {
            return $http.put('/api/todos/' + todo._id, todo).then((response) => {
                return response.data;
            });
        };
        model.delete = function(id) {
            return $http.delete('/api/todos/' + id).then((response) => {
                return response.data;
            });
        };
        /*model.todoList = [{
            id: 2,
            name: 'First Todo',
            description: 'Start with Angular',
            date: new Date(2015, 2, 1, 0, 0, 0, 0),
            completed: true
        } ];*/

    });

    app.controller('MainController', function(TodoModel, $filter) {
        var main = this;

        TodoModel.all().then((data) => {
            main.todoList = data;
        });

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

            var yyyy = todo.date.split('.')[2],
                mm = todo.date.split('.')[1],
                dd = todo.date.split('.')[0];

            todo.date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);

            TodoModel.create(todo).then((data) => {
                main.todoList = data;
            });

            main.todo = {};
        };

        main.deleteTodo = function(todo) {
            console.log(todo);
            TodoModel.delete(todo._id).then((data) => {
                main.todoList = data;
            });
        };

        main.openUpdateTodoForm = function(todo) {
            $('#updateTodoForm').modal();
            main.readTodo(todo);
        };

        main.closeUpdateTodoForm = function(todo) {
            TodoModel.update(todo).then((data) => {
                main.todoList = data;
            });
            main.todo = {};
            $('#updateTodoForm').modal('hide');
        };

        main.readTodo = function(todo) {
            main.todo = todo;
            main.todo.date = $filter('date')(todo.date, "dd.MM.yyyy");
        };

        main.toggleCompletedTodo = function(todo) {
            todo.completed = (todo.completed) ? false : true;
            TodoModel.update(todo).then((data) => {
                main.todoList = data;
            });
        };

        main.order = function(predicate) {
            main.reverse = (main.predicate === predicate) ? !main.reverse : false;
            main.predicate = predicate;
        };

        main.isSortBy = function(predicate) {
            return (!main.reverse && main.predicate == predicate);
        };

        main.clearCompleted = function() {
            main.todoList.forEach(function(todo) {
                if (todo.completed) {
                    console.log(todo);
                    main.deleteTodo(todo);
                }
            });
        };
    });

    app.directive('todoslist', function(TodoModel) {
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
