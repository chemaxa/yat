!(function () {
    angular.module('Yat')
        .directive('todoslist', function (TodoModel) {
            return {
                restrict: 'E',
                controller: 'MainController',
                controllerAs: 'main',
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
                controller: 'MainController',
                controllerAs: 'main',
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
                controller: 'MainController',
                controllerAs: 'main',
                link: link,
                templateUrl: 'app/dashboard/createTodoForm.html',
            };
        });
})();
