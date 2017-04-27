// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('GeoCtrl', ['$scope', '$ionicPlatform', '$cordovaGeolocation', '$ionicLoading', '$timeout', function ($scope, $ionicPlatform, $cordovaGeolocation, $ionicLoading, $timeout) {
    $ionicPlatform.ready(function () {

        $scope.modal = $ionicLoading.show({
            content: 'Fetching Current Location...',
            showBackdrop: false
        });

        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
                $scope.accuracy = position.coords.accuracy;
                $scope.dataRecieved = true;
                $scope.modal.hide();
            }, function (err) {
                // error
                $scope.modal.hide();
                $scope.modal = $ionicLoading.show({
                    content: 'Oops!! ' + err,
                    showBackdrop: false
                });

                $timeout(function () {
                    $scope.modal.hide();
                }, 3000);
            });
    });
}])
