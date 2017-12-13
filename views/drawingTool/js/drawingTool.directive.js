/**
 * Created by Saeid Sadeh on 11/26/2017.
 */

angular.module('drawingTool.directive', [])

    .controller('DrawingToolController', ['$scope', '$timeout', '$rootScope', function($scope, $timeout, $rootScope) {
        // var canvasWindow = new fabric.Canvas('canvasWindow');
        $scope.master = {};
        $scope.radius = {};
        $scope.selectedObjects = [];
        var morefile
        var macfile

        $scope.addCanvas =  function(addedCanvas) {
            debugger;
            readCrosslightAndMoreFile();
            var canvas = document.createElement('canvas');
            canvas.setAttribute("id", "canvasWindow");
            canvas.width = addedCanvas.width*10;
            canvas.height = addedCanvas.height*10;
            $( "#drawingContainer" ).append(canvas);
            $rootScope.canvasIsAdded = true;
            selectedcanvasWindow = new fabric.Canvas('canvasWindow',{backgroundColor : "white"});
            $scope.addedCanvas = null;
            $('#canvasModal').modal('hide');
            selectedcanvasWindow.on('object:moving', function (e) {
                var obj = e.target;
                // if object is too big ignore
                if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
                    return;
                }
                obj.setCoords();
                // top-left  corner
                if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
                    obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
                    obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
                }
                // bot-right corner
                if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
                    obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
                    obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
                }
            });
            selectedcanvasWindow.on('object:modified', function(options) {
                if (options.target && options.target.type == "circle") {
                    $scope.radius.radiusX = (options.target.getRadiusX()/10).toFixed(2);
                    $scope.radius.radiusY = (options.target.getRadiusY()/10).toFixed(2);
                    $scope.firstCircCoordinateX = (options.target.getCoords()[0].x/10).toFixed(2);
                    $scope.firstCircCoordinateY = (options.target.getCoords()[0].y/10).toFixed(2);
                    $scope.secondCircCoordinateX = (options.target.getCoords()[1].x/10).toFixed(2);
                    $scope.secondCircCoordinateY = (options.target.getCoords()[1].y/10).toFixed(2);
                    $scope.thirdCircCoordinateX = (options.target.getCoords()[2].x/10).toFixed(2);
                    $scope.thirdCircCoordinateY = (options.target.getCoords()[2].y/10).toFixed(2);
                    $scope.forthCircCoordinateX = (options.target.getCoords()[3].x/10).toFixed(2);
                    $scope.forthCircCoordinateY = (options.target.getCoords()[3].y/10).toFixed(2);
                    $timeout (function () {
                        $('#cricleCoordinateModal').modal('show');
                        $('.modal-backdrop').removeClass("modal-backdrop");
                        $("#cricleCoordinateModal").draggable({
                            handle: ".modal-header"
                        });
                    }, 0)
                }
                if (options.target && options.target.type == "rect") {
                    $scope.rectCenterPointX = (options.target.getCenterPoint().x/10).toFixed(2);
                    $scope.rectCenterPointY = (options.target.getCenterPoint().y/10).toFixed(2);
                    $scope.firstRectCoordinateX = (options.target.getCoords()[0].x/10).toFixed(2);
                    $scope.firstRectCoordinateY = (options.target.getCoords()[0].y/10).toFixed(2);
                    $scope.secondRectCoordinateX = (options.target.getCoords()[1].x/10).toFixed(2);
                    $scope.secondRectCoordinateY = (options.target.getCoords()[1].y/10).toFixed(2);
                    $scope.thirdRectCoordinateX = (options.target.getCoords()[2].x/10).toFixed(2);
                    $scope.thirdRectCoordinateY = (options.target.getCoords()[2].y/10).toFixed(2);
                    $scope.forthRectCoordinateX = (options.target.getCoords()[3].x/10).toFixed(2);
                    $scope.forthRectCoordinateY = (options.target.getCoords()[3].y/10).toFixed(2);
                    $timeout (function () {
                        $('#rectangularCoordinateModal').modal('show');
                        $('.modal-backdrop').removeClass("modal-backdrop");
                        $("#rectangularCoordinateModal").draggable({
                            handle: ".modal-header"
                        });
                    }, 0)
                }
            });

            // selectedcanvasWindow.on('object:moving', function(options) {
            //     console.log("moving");
            // });
            //
            // selectedcanvasWindow.on('object:scaling', function(options) {
            //     console.log("scaling");
            // });

            selectedcanvasWindow.on('selection:created', function (selections) {
                debugger;
                if (selections.target.type === 'activeSelection') {
                    angular.forEach(selections, function (selections) {
                        $scope.selectedObjects.push(selections);

                    })
                }
            });
        };

        $scope.readWithfs = function () {
            var fs = require('fs');
            fs.readFile('./src/crosslight.mac', function (err,data) {
                if(err){
                    console.log(err);
                }else{
                    console.log(data.toString());
                }
            })
        }

        readCrosslightFile =  function (){
            var rawFile1 = new XMLHttpRequest();
            rawFile1.open("GET", "file:///src/crosslight.mac", false);
            rawFile1.onreadystatechange = function ()
            {
                if(rawFile1.readyState === 4)
                {
                    if(rawFile1.status === 200 || rawFile1.status == 0)
                    {
                        var allText1 = rawFile1.responseText;
                        macfile = allText1;
                    }
                }
            }
            rawFile1.send(null);
            var rawFile2 = new XMLHttpRequest();
            rawFile2.open("GET", "file:///src/more.mac", false);
            rawFile2.onreadystatechange = function ()
            {
                if(rawFile2.readyState === 4)
                {
                    if(rawFile2.status === 200 || rawFile2.status == 0)
                    {
                        var allText2 = rawFile2.responseText;
                        morefile = allText2;
                    }
                }
            }
            rawFile2.send(null);
        }

        readCrosslightAndMoreFile = function () {
            readCrosslightFile();
            var allText = morefile + macfile;
            populateMaterialCombo(allText);
            console.log($scope.materialArr);
        }

        populateMaterialCombo = function (materialFileContent) {
            var extractedArr = materialFileContent.match(/(?:material_lib)([^]+?)(?:end_library)/g);
            $scope.materialArr = [];
            extractedArr.forEach(function (item,index) {
                var material = {};
                if(item.indexOf("name")>-1){
                    var nameIndex = item.indexOf("name"),
                        firsSpaceIndex = nameIndex + item.substring(nameIndex).indexOf(" ");
                    material.name = item.substring(nameIndex +5,firsSpaceIndex);
                    if(item.indexOf("var_symbol1")>-1){
                        var symbol1Index = item.indexOf("var_symbol1"),
                            firsSpaceIndex = symbol1Index + item.substring(symbol1Index).indexOf(" ");
                            firsNewLineIndex = symbol1Index + item.substring(symbol1Index).indexOf("\n");
                            if(firsSpaceIndex<firsNewLineIndex){
                                material.symbol1 = item.substring(symbol1Index +12,firsSpaceIndex);
                            } else if(firsSpaceIndex>firsNewLineIndex){
                                material.symbol1 = item.substring(symbol1Index +12,firsNewLineIndex);
                            }
                    }
                    if(item.indexOf("var_symbol2")>-1){
                        var symbol2Index = item.indexOf("var_symbol2"),
                            firsSpaceIndex = symbol2Index + item.substring(symbol2Index).indexOf(" "),
                            firsNewLineIndex = symbol2Index + item.substring(symbol2Index).indexOf("\n");
                        if(firsSpaceIndex<firsNewLineIndex){
                            material.symbol2 = item.substring(symbol2Index +12,firsSpaceIndex);
                        } else if(firsSpaceIndex>firsNewLineIndex){
                            material.symbol2 = item.substring(symbol2Index +12,firsNewLineIndex);
                        }
                    }
                    if(item.indexOf("var_symbol3")>-1){
                        var symbol3Index = item.indexOf("var_symbol3"),
                            firsSpaceIndex = symbol3Index + item.substring(symbol3Index).indexOf(" "),
                            firsNewLineIndex = symbol3Index + item.substring(symbol3Index).indexOf("\n");
                        if(firsSpaceIndex<firsNewLineIndex){
                            material.symbol3 = item.substring(symbol3Index +12,firsSpaceIndex);
                        } else if(firsSpaceIndex>firsNewLineIndex){
                            material.symbol3 = item.substring(symbol3Index +12,firsNewLineIndex);
                        }

                    }
                    $scope.materialArr.push(material);
                }
            })
        }

        $scope.getObjects= function () {
            debugger;
            var objs = selectedcanvasWindow.getObjects().map(function(o) {
                return o.set('active', true);
            });

            var group = new fabric.Group(objs, {
                originX: 'center',
                originY: 'center'
            });

            selectedcanvasWindow._activeObject = null;

            selectedcanvasWindow.setActiveObject(group.setCoords()).renderAll();
        }

        $scope.addGrid = function () {
            debugger;
            var width = selectedcanvasWindow.width;
            var height = selectedcanvasWindow.height;

            var j = 0;
            var line = null;
            var rect = [];
            var size = 20;


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
                selectedcanvasWindow.add(line);
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
                selectedcanvasWindow.add(line);
                line.sendToBack();

            }

            selectedcanvasWindow.renderAll();
        };

        $scope.removeGrid =function () {

        };

        $scope.drawCircle = function(circle) {
            $scope.master = angular.copy(circle);
            var circ = new fabric.Circle({
                left: circle.left*10,
                top: circle.top*10,
                fill: circle.color,
                radius: circle.radius*10,
            });
            selectedcanvasWindow.add(circ);
            $scope.circle = null;
            $('#circleModal').modal('hide');
        };

        $scope.drawRectangular = function(rectangular) {
            $scope.master = angular.copy(rectangular);
            var rect = new fabric.Rect({
                left: rectangular.left*10,
                top: rectangular.top*10,
                fill: rectangular.color,
                width: rectangular.width*10,
                height: rectangular.height*10,
                angle: rectangular.angle
            });
            selectedcanvasWindow.add(rect);
            $scope.rectangular = null;
            $('#rectangularModal').modal('hide');
        };

        $scope.reset = function() {
            $scope.circle = angular.copy($scope.master);
            $scope.rectangular = angular.copy($scope.master);
        };

        $scope.selectCircle = function () {
            $('#circleModal').modal('show');
        };
        $scope.selectRectangular = function () {
            $('#rectangularModal').modal('show');
        };
        $scope.selectCanvas = function () {
            $('#canvasModal').modal('show');
        };




    }])

    .directive('drawingTool', function() {
        return {
            restrict: "E",
            templateUrl: "./views/drawingTool/page/drawingTool.html"
        };
    })

    .directive('headerMenu', function() {
        return {
            restrict: "E",
            templateUrl: "./views/drawingTool/page/headerMenu.html"
        };
    });


