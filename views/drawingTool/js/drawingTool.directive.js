/**
 * Created by Saeid Sadeh on 11/26/2017.
 */

angular.module('drawingTool.directive', [])

    .controller('DrawingToolController', ['$scope', '$timeout', function($scope, $timeout) {
        var canvasWindow = new fabric.Canvas('canvasWindow');
        $scope.master = {};
        $scope.radius = {};
        $scope.addGrid = function () {
            var width = canvasWindow.width;
            var height = canvasWindow.height;

            var j = 0;
            var line = null;
            var rect = [];
            var size = 20;

            console.log(width + ":" + height);

            for (var i = 0; i < Math.ceil(width / 20); ++i) {
                rect[0] = i * size;
                rect[1] = 0;

                rect[2] = i * size;
                rect[3] = height;

                line = null;
                line = new fabric.Line(rect, {
                    stroke: '#999',
                    opacity: 0.5,
                });

                line.selectable = false;
                canvasWindow.add(line);
                line.sendToBack();

            }

            for (i = 0; i < Math.ceil(height / 20); ++i) {
                rect[0] = 0;
                rect[1] = i * size;

                rect[2] = width;
                rect[3] = i * size;

                line = null;
                line = new fabric.Line(rect, {
                    stroke: '#999',
                    opacity: 0.5,
                });
                line.selectable = false;
                canvasWindow.add(line);
                line.sendToBack();

            }

            canvasWindow.renderAll();
        };

        $scope.drawCircle = function(circle) {
            $scope.master = angular.copy(circle);
            var circ = new fabric.Circle({
                left: 100,
                top: 50,
                fill: circle.color,
                radius: circle.radius,
            });
            canvasWindow.add(circ);
            $scope.circle = null;
            $('#circleModal').modal('hide');
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
            $scope.rectangular = null;
            $('#rectangularModal').modal('hide');
        };

        $scope.reset = function() {
            $scope.circle = angular.copy($scope.master);
            $scope.rectangular = angular.copy($scope.master);
        };

        canvasWindow.on('object:modified', function(options) {
            if (options.target && options.target.type == "circle") {
                $scope.radius.radiusX = options.target.getRadiusX().toFixed(2);
                $scope.radius.radiusY = options.target.getRadiusY().toFixed(2);
                $scope.firstCircCoordinateX = options.target.getCoords()[0].x.toFixed(2);
                $scope.firstCircCoordinateY = options.target.getCoords()[0].y.toFixed(2);
                $scope.secondCircCoordinateX = options.target.getCoords()[1].x.toFixed(2);
                $scope.secondCircCoordinateY = options.target.getCoords()[1].y.toFixed(2);
                $scope.thirdCircCoordinateX = options.target.getCoords()[2].x.toFixed(2);
                $scope.thirdCircCoordinateY = options.target.getCoords()[2].y.toFixed(2);
                $scope.forthCircCoordinateX = options.target.getCoords()[3].x.toFixed(2);
                $scope.forthCircCoordinateY = options.target.getCoords()[3].y.toFixed(2);
                $timeout (function () {
                    $('#cricleCoordinateModal').modal('show');
                    $('.modal-backdrop').removeClass("modal-backdrop");
                    $("#cricleCoordinateModal").draggable({
                        handle: ".modal-header"
                    });
                }, 0)
            }
            if (options.target && options.target.type == "rect") {
                $scope.rectCenterPointX = options.target.getCenterPoint().x.toFixed(2);
                $scope.rectCenterPointY = options.target.getCenterPoint().y.toFixed(2);
                $scope.firstRectCoordinateX = options.target.getCoords()[0].x.toFixed(2);
                $scope.firstRectCoordinateY = options.target.getCoords()[0].y.toFixed(2);
                $scope.secondRectCoordinateX = options.target.getCoords()[1].x.toFixed(2);
                $scope.secondRectCoordinateY = options.target.getCoords()[1].y.toFixed(2);
                $scope.thirdRectCoordinateX = options.target.getCoords()[2].x.toFixed(2);
                $scope.thirdRectCoordinateY = options.target.getCoords()[2].y.toFixed(2);
                $scope.forthRectCoordinateX = options.target.getCoords()[3].x.toFixed(2);
                $scope.forthRectCoordinateY = options.target.getCoords()[3].y.toFixed(2);
                $timeout (function () {
                    $('#rectangularCoordinateModal').modal('show');
                    $('.modal-backdrop').removeClass("modal-backdrop");
                    $("#rectangularCoordinateModal").draggable({
                        handle: ".modal-header"
                    });
                }, 0)
            }
        });

        canvasWindow.on('object:moving', function(options) {
            console.log("moving");
            console.log(options.target.type);
        });

        canvasWindow.on('object:scaling', function(options) {
            console.log("scaling");
        });


    }])

    .directive('drawingTool', function() {
        return {
            restrict: "E",
            templateUrl: "./views/drawingTool/page/drawingTool.html"
        };
    });


