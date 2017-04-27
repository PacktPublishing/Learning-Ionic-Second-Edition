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

.controller('AppCtrl', function($scope, DataFactory, $ionicScrollDelegate) {
    $scope.items = [];

    $scope.doRefresh = function() {
        DataFactory.getData(3)
            .then(function(data) {
                // extend the $scope.items array with the response
                // array from getData(); 
                // http://stackoverflow.com/a/1374131/1015046
                Array.prototype.push.apply($scope.items, data);
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.loadMore = function() {
        DataFactory.getData(3)
            .then(function(data) {
                // extend the $scope.items array with the response
                // array from getData(); 
                // http://stackoverflow.com/a/1374131/1015046
                Array.prototype.push.apply($scope.items, data);
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    }

    $scope.scrollToTop = function() {
        $ionicScrollDelegate.scrollTop();
    }

    // load data on page load
    DataFactory.getData(3).then(function(data) {
        $scope.items = data;
    });
})

.factory('DataFactory', function($timeout, $q) {

    var API = {
        getData: function(count) {
            // Spoof a network call using promises
            var deferred = $q.defer();

            var data = [],
                _o = {},
                count = count || 3;

            for (var i = 0; i < count; i++) {
                _o = {
                    // http://stackoverflow.com/a/8084248/1015046
                    random: (Math.random() + 1).toString(36).substring(7),
                    time: (new Date()).toString().substring(15, 24)
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
