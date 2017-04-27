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

.controller('FlashlightCtrl', ['$scope', '$ionicPlatform', '$cordovaFlashlight', function ($scope, $ionicPlatform, $cordovaFlashlight) {

    $scope.notSupported = true;

    $ionicPlatform.ready(function () {

        $cordovaFlashlight.available().then(function (availability) {
            // availability = true || false
            $scope.notSupported = !availability;
        });

        $scope.toggleTorch = function () {
            if ($scope.notSupported) return;

            $cordovaFlashlight.toggle()
                .then(function (success) { /* success */ },
                    function (error) { /* error */ });
        }


    });

}])
