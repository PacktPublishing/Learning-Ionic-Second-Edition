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

.controller('AppCtrl', function($scope, DataFactory) {

    $scope.items = [];

    $scope.data = {
        showDelete: false
    };

    $scope.edit = function(item) {
        alert('Edit Item: ' + item.id);
    };
    $scope.share = function(item) {
        alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    // get data on page load
    DataFactory.getData().then(function(data) {
        $scope.items = data;
    });

})

.factory('DataFactory', function($timeout, $q) {

    var API = {
        getData: function(count) {
            // Spoof a network call using promises
            var deferred = $q.defer();

            var data = [],
                _o = {};
            count = count || 20;

            for (var i = 0; i < count; i++) {
                _o = {
                    // http://stackoverflow.com/a/8084248/1015046
                    id: i + 1,
                    title: (Math.random() + 1).toString(36).substring(7)
                };

                data.push(_o);
            };

            $timeout(function() {
                // success response!
                deferred.resolve(data);
            }, 1000);

            return deferred.promise;
        }
    };

    return API;
})
