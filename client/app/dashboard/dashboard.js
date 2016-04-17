!(function () {
    angular.module('Yat')
        .controller('TodoController', TodoController)
        .directive('todoslist', function (TodoModel) {
            return {
                restrict: 'E',
                controller: 'TodoController',
                controllerAs: 'todo',
                templateUrl: 'app/dashboard/todosList.html'
            };
        }).directive('updatetodoform', function () {
            function link() {
                $('#datepicker').datepicker({
                    format: 'dd.mm.yyyy'
                });
            }
            return {
                restrict: 'E',
                controller: 'TodoController',
                controllerAs: 'todo',
                link: link,
                templateUrl: 'app/dashboard/updateTodoForm.html',
            };
        }).directive('createtodoform', function () {
            function link() {
                $('#datepicker').datepicker({
                    format: 'dd.mm.yyyy'
                });
            }
            return {
                restrict: 'E',
                controller: 'TodoController',
                controllerAs: 'todo',
                link: link,
                templateUrl: 'app/dashboard/createTodoForm.html',
            };
        });



    function TodoController(TodoModel, $filter) {
        var todoCtrl = this;

        TodoModel.all().then((data) => {
            todoCtrl.todoList = data;
        });

        todoCtrl.predicate = 'date';
        todoCtrl.reverse = false;

        todoCtrl.openCreateTodoForm = function () {
            todoCtrl.todo = {};
            $('#createTodoForm').modal();
        };
        todoCtrl.closeCreateTodoForm = function (todo) {
            $('#createTodoForm').modal('hide');
            todoCtrl.createTodo(todo);
        };

        todoCtrl.createTodo = function (todo) {
            todo.completed = false;

            var yyyy = todo.date.split('.')[2],
                mm = todo.date.split('.')[1],
                dd = todo.date.split('.')[0];

            todo.date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);

            TodoModel.create(todo).then((data) => {
                todoCtrl.todoList = data;
            });

            todoCtrl.todo = {};
        };

        todoCtrl.deleteTodo = function (todo) {
            console.log(todo);
            TodoModel.delete(todo._id).then((data) => {
                todoCtrl.todoList = data;
            });
        };

        todoCtrl.openUpdateTodoForm = function (todo) {
            $('#updateTodoForm').modal();
            todoCtrl.readTodo(todo);
        };

        todoCtrl.closeUpdateTodoForm = function (todo) {
            TodoModel.update(todo).then((data) => {
                todoCtrl.todoList = data;
            });
            todoCtrl.todo = {};
            $('#updateTodoForm').modal('hide');
        };

        todoCtrl.readTodo = function (todo) {
            todoCtrl.todo = todo;
            todoCtrl.todo.date = $filter('date')(todo.date, "dd.MM.yyyy");
        };

        todoCtrl.toggleCompletedTodo = function (todo) {
            todo.completed = (todo.completed) ? false : true;
            TodoModel.update(todo).then((data) => {
                todoCtrl.todoList = data;
            });
        };

        todoCtrl.order = function (predicate) {
            todoCtrl.reverse = (todoCtrl.predicate === predicate) ? !todoCtrl.reverse : false;
            todoCtrl.predicate = predicate;
        };

        todoCtrl.isSortBy = function (predicate) {
            return (!todoCtrl.reverse && todoCtrl.predicate == predicate);
        };

        todoCtrl.clearCompleted = function () {
            todoCtrl.todoList.forEach(function (todo) {
                if (todo.completed) {
                    console.log(todo);
                    todoCtrl.deleteTodo(todo);
                }
            });
        };
    }

})();
