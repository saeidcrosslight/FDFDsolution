/**
 * Created by Saeid Sadeh on 11/26/2017.
 */
angular
    .module('CrosslightApp', ['ui.tree', 'filetree.directive', 'drawingTool.directive', 'headerMenu.directive'])

    .controller('MainController', ['$scope', function ($scope) {

        $scope.selectCircle = function () {
                $('#circleModal').modal('show');
        };
        $scope.selectRectangular = function () {
            $('#rectangularModal').modal('show');
        };
    }]);
