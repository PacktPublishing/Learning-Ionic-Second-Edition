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

.controller('AppCtrl', function($scope, $ionicPopup) {

    $scope.data = {};
    $scope.state = {};
    $scope.error = {};

    $scope.prompt = function() {
        // reset app states
        $scope.state.cancel = false;
        $scope.state.success = false;

        // reset error messages
        $scope.error.empty = false;
        $scope.error.invalid = false;

        var prompt = $ionicPopup.show({
            templateUrl: 'pin-template.html',
            title: 'Enter Pin to continue',
            scope: $scope,
            buttons: [{
                text: 'Cancel',
                onTap: function(e) {
                    $scope.state.cancel = true;
                }
            }, {
                text: '<b>Login</b>',
                type: 'button-assertive',
                onTap: function(e) {
                    $scope.error.empty = false;
                    $scope.error.invalid = false;
                    if (!$scope.data.pin) {
                        // disable close if the 
                        // user does not enter 
                        // a valid pin
                        $scope.error.empty = true;
                        e.preventDefault();
                    } else {
                        if ($scope.data.pin === '1234') {
                            $scope.state.success = true;
                            return $scope.data.pin;
                        } else {
                            $scope.error.invalid = true;
                            e.preventDefault();
                        }
                    }
                }
            }]
        });
    };

    $scope.confirm = function() {
        var confirm = $ionicPopup.confirm({
            title: 'Confirm Popup Heading',
            template: 'Are you sure you want to do that?'
        });
        confirm.then(function(res) {
            if (res) {
                console.log('Yes!');
            } else {
                console.log('Nooooo!!');
            }
        });
    };

    $scope.alert = function() {
        var alert = $ionicPopup.alert({
            title: 'You are secured!',
            template: 'You are inside a secure area!'
        });
        alert.then(function(res) {
            console.log('Yeah!! I know!!');
        });
    };

    // invoke the prompt on controller init.
    $scope.prompt();
})
