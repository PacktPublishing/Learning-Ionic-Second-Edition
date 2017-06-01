angular.module('starter')

.controller('LoginCtrl', function($scope, AUTH, $state, $ionicHistory, $ionicPopup) {

    // check Auth before proceeding
    if (AUTH.isAuthenticated()) {
        $state.go('home');
    }

    // hardcode the test user
    $scope.user = {
        email: 'a@a.com',
        password: 'a'
    }

    $scope.login = function() {
        if (AUTH.login($scope.user)) {
            // remove all views in stack
            // this way when the user clicks on the 
            // back button on the home page
            // we do not show the login screen again
            $ionicHistory.clearHistory();
            $state.go('home');
        } else {
            $ionicPopup.alert({
                title: 'LOGIN FAILED',
                template: 'Either the email or password is invalid.'
            });
        };
    }
})

.controller('HomeCtrl', function($scope, $state, AUTH, TODOS, $ionicHistory, $ionicPopup, $ionicListDelegate, LN) {

    $scope.todo = {};
    // check Auth before proceeding
    if (!AUTH.isAuthenticated()) {
        $state.go('login');
    }

    // fetch todos on load
    $scope.todos = TODOS.get();

    $scope.add = function() {
        //reset
        $scope.todo.text = '';
        var addTodoPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="todo.text">',
            title: 'Add Todo',
            subTitle: 'Enter a Todo To Do',
            scope: $scope,
            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        // validation
                        if (!$scope.todo.text) {
                            e.preventDefault();
                        } else {
                            return $scope.todo.text;
                        }
                    }
                }
            ]
        });

        addTodoPopup.then(function(text) {
            if (text) {
                var todo = {
                    text: text,
                    isCompleted: false
                };
                $scope.todos.push(todo);
                // save it to LS
                TODOS.set($scope.todos);
                LN.show('Todo Created');
            }
        });
    }

    $scope.update = function(todo) {
        todo.isCompleted = !todo.isCompleted;
        $ionicListDelegate.closeOptionButtons();
        // update LS
        TODOS.set($scope.todos);
        LN.show('Todo Updated');
    }

    $scope.delete = function($index, todo) {
        var deleteConfirmPopup = $ionicPopup.confirm({
            title: 'Delete Todo',
            template: 'Are you sure you want to delete "' + todo.text + '"? '
        });
        
        deleteConfirmPopup.then(function(res) {
            if (res) {
                $scope.todos.splice($index, 1);
                // update LS
                TODOS.set($scope.todos);
                LN.show('Todo Deleted');
            }
        });
    }

    $scope.logout = function() {
        AUTH.logout();
        $ionicHistory.clearHistory();
        $state.go('login');
    }
});
