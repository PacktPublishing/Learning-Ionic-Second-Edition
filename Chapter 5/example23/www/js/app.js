// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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

.controller('AppCtrl', function($scope, $ionicPopover) {

    // init the popover
    $ionicPopover.fromTemplateUrl('button-options.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event, type) {
        $scope.type = type;
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
        // if you are navigating away from the page once 
        // an option is selcted, make sure to call
        // $scope.popover.remove();
    };

});
