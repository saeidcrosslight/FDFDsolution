/**
 * Created by Saeid Sadeh on 11/26/2017.
 */

angular.module('drawingTool.directive', [])

    .controller('DrawingToolController', ['$scope', function($scope) {
        $scope.master = {};

        $scope.drawCircle = function(circle) {
            $scope.master = angular.copy(circle);
            var circ = new fabric.Circle({
                left: 100,
                top: 50,
                fill: circle.color,
                radius: circle.radius,
            });
            canvasWindow.add(circ);
            circ.on('selected', function () {
                console.log('selected!')
            })
            circ.on('moving', function () {
                console.log('moving!')
            })
            var radiusX= circ.getRadiusX();
            var radiusY = circ.getRadiusY();
            var cord = circ.getCoords();
            console.log(radiusX);
            console.log(radiusY);
            console.log(cord);
        };
        $scope.drawRectangular = function(rectangular) {
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
            rect.on('selected', function () {
                console.log('selected!')
            })
            rect.on('moving', function () {
                console.log('moving!')
            })
        };

        $scope.reset = function() {
            $scope.circle = angular.copy($scope.master);
            $scope.rectangular = angular.copy($scope.master);
        };


    }])

    .directive('drawingTool', function() {
        return {
            restrict: "E",
            templateUrl: "./views/drawingTool/page/drawingTool.html"
        };
    });


