(function() {
    angular
        .module('testApp', [])
        .controller('MainController', ['$scope', function($scope) {

            $scope.countPerPage = 5;
            $scope.sortReverse = false;
            $scope.offset = 0;
            $scope.pageIndex = 0;
            $scope.checkAll = 0;

            // angular.fromJson(window.localStorage.getItem('taskList')) || []
            $scope.newTaskName = '';
            $scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];

            paginateDebug($scope);

            $scope.pageCount = getPageCount($scope);
            //$scope.currentPage = $scope.countPerPage * $scope.offset;

            $scope.addTask = function() {
                if ($scope.newTaskName) {
                    $scope.taskList.push({
                        id: $scope.taskList.length,
                        name: $scope.newTaskName,
                        done: false
                    });
                    $scope.newTaskName = '';
                }
            };

            $scope.doSortReverse = function(){
                $scope.sortReverse = !$scope.sortReverse;
                $scope.taskList.reverse();
            };

            $scope.removeTask = function(taskId) {
                for (var i = 0; i < $scope.taskList.length; i++) {
                    if ($scope.taskList[i].id === taskId) {
                        if (confirm('Are you sure you want to delete item `' + $scope.taskList[i].name + '`')) {
                            $scope.taskList.splice(i, 1);
                        }
                        break;
                    }
                }
            };

            $scope.removeAllPageTasks = function() {
                $scope.taskList.splice($scope.pageIndex * $scope.countPerPage, $scope.countPerPage);
            };

            $scope.checkAllPageTasks = function(checked) {
                for (var i = $scope.pageIndex * $scope.countPerPage; i < $scope.countPerPage * ($scope.pageIndex + 1); i++) {
                    $scope.taskList[i].done = checked;
                }
            };

            $scope.range = function(n) {
                return new Array(n);
            };

            $scope.setPage = function(pageIndex) {
                $scope.pageIndex = pageIndex;
                $scope.currentPage = $scope.countPerPage * pageIndex;
            };

            $scope.$watch('taskList', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
                }

                $scope.pageCount = getPageCount($scope);
            }, true);


            /**
             *
             * @param $scope
             */
            function paginateDebug($scope){
                console.log('length =', $scope.taskList.length);
                console.log('perPage =',  $scope.countPerPage);
                console.log('offset =',  $scope.offset);
            }

            /**
             *
             * @param $scope
             * @returns {number}
             */
            function getPageCount($scope){
                return Math.ceil($scope.taskList.length / $scope.countPerPage);
            }

        }]);

})();