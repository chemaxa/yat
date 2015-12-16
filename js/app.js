!(function() {
    var app = angular.module('yat', []);
    app.controller('TodoController', ['$scope', function($scope) {
        $scope.todoList = [{
            name: 'First Todo',
            description: 'Start with Angular',
            date: '11.12.2015',
            active: true
        }, {
            name: 'Second Todo',
            description: 'Lets go controller with Angular',
            date: '12.12.2015',
            active: true
        }, {
            name: 'Third Todo',
            description: 'Testing with Angular',
            date: '13.12.2015',
            active: true
        }, ];
    }]);
    app.controller('FormController', ['$scope', function($scope) {
        $scope.addTodo = function(todo) {
            todo.active = true;
            $scope.todoList.push(todo);
            $scope.todo = {};
        };
    }]);
})();
