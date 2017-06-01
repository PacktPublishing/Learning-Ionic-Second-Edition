angular.module('starter')

.service('LS', function($window) { // local storage
    this.set = function(key, value) {
        // http://stackoverflow.com/a/23656919/1015046
        $window.localStorage.setItem(key, $window.angular.toJson(value));
    }

    this.get = function(key) {
        return $window.JSON.parse($window.localStorage.getItem(key));
    }

    this.remove = function(key) {
        $window.localStorage.removeItem(key);
    }
})

.service('LN', function($ionicPlatform, $cordovaLocalNotification) { // local notifications
    var i = 1;
    this.show = function(text) {
        $ionicPlatform.ready(function() {
            var notifPromise = $cordovaLocalNotification.schedule({
                id: i++,
                title: 'Todo App',
                text: text
            })
            return notifPromise;
        });
    }
})


.service('IP', function ($http) {
    this.get = function(){
        return $http.get('https://api.ipify.org/?format=json');
    }
})

.service('AUTH', function(LS) {
    var LS_AUTH_KEY = 'auth';
    this.login = function(user) {
        if (user.email === 'a@a.com', user.password === 'a') {
            LS.set(LS_AUTH_KEY, true);
            return true;
        } else {
            return false;
        }
    }

    this.isAuthenticated = function() {
        return !!LS.get(LS_AUTH_KEY);
    }

    this.logout = function() {
        LS.remove(LS_AUTH_KEY);
    }

})

.service('TODOS', function(LS) {
    var LS_TODOS_KEY = 'todos';

    this.set = function(todos) {
        LS.set(LS_TODOS_KEY, todos);
    }

    this.get = function() {
        return LS.get(LS_TODOS_KEY) || [];
    }
});
