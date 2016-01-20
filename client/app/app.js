!(function () {
    function TodoModel($http) {
        var model = this;

        model.all = function () {
            return $http.get('/api/todos').then((response) => {
                return response.data;
            });
        };
        model.fetchById = function (id) {
            return $http.get('/api/todos/' + id).then((response) => {
                return response.data;
            });
        };
        model.create = function (data) {
            return $http.post('/api/todos', data).then((response) => {
                return response.data;
            });
        };
        model.update = function (todo) {
            return $http.put('/api/todos/' + todo._id, todo).then((response) => {
                return response.data;
            });
        };
        model.delete = function (id) {
            return $http.delete('/api/todos/' + id).then((response) => {
                return response.data;
            });
        };
    }

    function MainController(TodoModel, $filter) {
        var main = this;

    }

    function Router($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/dashboard/index.html',
                controller: 'TodoController',
                controllerAs: 'todoCtrl',
                activetab: '/'
            })
            .when('/auth', {
                templateUrl: 'app/login/index.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                activetab: 'auth'
            });

        $locationProvider.html5Mode(true);
    }
    angular.module('Yat', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider', Router])
        .service('TodoModel', TodoModel)
        .controller('MainController', MainController);
})();
