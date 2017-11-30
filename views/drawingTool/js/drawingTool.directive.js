/**
 * Created by Saeid Sadeh on 11/26/2017.
 */

angular.module('drawingTool.directive', [])

    .controller('DrawingToolController', ['$scope', function($scope) {
        var canvasWindow = new fabric.Canvas('canvasWindow');
        canvasWindow.on('mouse:down', function(options) {
            if (options.target) {
                console.log('an object was clicked! ', options.target);
            }
        });
        canvasWindow.on('object:moving', function(options) {
            console.log("moving");
            console.log(options.target.type);
            console.log(options.target.getRadiusX());
            console.log(options.target.getRadiusY());
            console.log(options.target.getCoords());
        });
        canvasWindow.on('object:scaling', function(options) {
            debugger;
            $('#coordinateModal').modal('show');
            $('.modal-backdrop').removeClass("modal-backdrop");
            $("#coordinateModal").draggable({
                handle: ".modal-header"
            });
            console.log("scaling");
            $scope.coordinates.radiusX = options.target.getRadiusX();
            $scope.coordinates.radiusY = options.target.getRadiusY();
            console.log($scope.coordinates);
            console.log($scope.coordinates.radiusX);
            console.log($scope.coordinates.radiusY);
            console.log(options.target.type);
            console.log(options.target.getRadiusX());
            console.log(options.target.getRadiusY());
        });

        $scope.master = {};
        $scope.coordinates = {};


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
            // circ.on('selected', function () {
            //     console.log('selected!')
            // })
            // circ.on('moving', function () {
            //     console.log('moving!')
            // })
            // var radiusX= circ.getRadiusX();
            // var radiusY = circ.getRadiusY();
            // var cord = circ.getCoords();
            // console.log(radiusX);
            // console.log(radiusY);
            // console.log(cord);
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
            // rect.on('selected', function () {
            //     console.log('selected!')
            // })
            // rect.on('moving', function () {
            //     console.log('moving!')
            // })
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


