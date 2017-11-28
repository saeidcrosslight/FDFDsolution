/**
 * Created by Saeid Sadeh on 11/26/2017.
 */

angular.module('drawingTool.directive', [])

    .controller('DrawingToolController', ['$scope', function($scope) {
        $scope.master = {};

        $scope.update = function(circle) {
            $scope.master = angular.copy(circle);
            var circ = new fabric.Circle({
                left: 50,
                top: 20,
                fill: circle.color,
                radius: circle.radius,
            });
            canvasWindow.add(circ);
        };
        $scope.update1 = function(rectangular) {
            $scope.master = angular.copy(rectangular);
            var rect = new fabric.Rect({
                left: 100,
                top: 50,
                fill: rectangular.color,
                width: rectangular.width,
                height: rectangular.height,
                angle: rectangular.angle
            });
            canvasWindow.add(rect);
        };

        $scope.reset = function() {
            $scope.circle = angular.copy($scope.master);
        };


    }])

    .directive('drawingTool', function() {
        return {
            restrict: "E",
            templateUrl: "./views/drawingTool/page/drawingTool.html"
        };
    });


