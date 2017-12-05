/**
 * Created by Saeid Sadeh on 11/26/2017.
 */

angular.module('headerMenu.directive', [])

    .controller('HeaderMenuController', ['$scope', function($scope) {
        $scope.name = "name"


    }])

    .directive('headerMenu', function() {
        return {
            restrict: "E",
            templateUrl: "./views/headerMenu/page/headerMenu.html"
        };
    });


