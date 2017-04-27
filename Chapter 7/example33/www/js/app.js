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

.controller('NotifCtrl', ['$scope', '$ionicPlatform', '$cordovaLocalNotification', function ($scope, $ionicPlatform, $cordovaLocalNotification) {
    $ionicPlatform.ready(function () {

        $scope.notifText = 'Hello World!';

        $scope.triggerNotification = function () {

            $cordovaLocalNotification.schedule({
                id: 1,
                title: 'Dynamic Notification',
                text: $scope.notifText
            }).then(function (result) {
                console.log(result);
            });
        }
    });
}])
