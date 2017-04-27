// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        /**** Snippet 1 Start ***/
        /***********************/
        //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        //for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        /***********************/
        /**** Snippet 1 End ***/

        /**** Snippet 2 Start ***/
        /***********************/
        // var alertOnBackPress = localStorage.getItem('alertOnBackPress');

        // var hardwareBackButtonHandler = function() {
        //     console.log('Hardware back button pressed');
        //     // do more interesting things here
        // }

        // function manageBackPressEvent(alertOnBackPress) {
        //     if (alertOnBackPress) {
        //         $ionicPlatform.onHardwareBackButton(hardwareBackButtonHandler);
        //     } else {
        //         $ionicPlatform.offHardwareBackButton(hardwareBackButtonHandler);
        //     }
        // }

        // // when the app boots up
        // manageBackPressEvent(alertOnBackPress);

        // // later in the code/controller when you let 
        // // the user update the setting
        // function updateSettings(alertOnBackPressModified) {
        //         localStorage.setItem('alertOnBackPress', alertOnBackPressModified);
        //         manageBackPressEvent(alertOnBackPressModified);
        //     }
        /***********************/
        /**** Snippet 2 End ***/

        /**** Snippet 3 Start ***/
        /***********************/
        //var cancelRegisterBackButtonAction = $ionicPlatform.registerBackButtonAction(hardwareBackButtonHandler, 101);
        /***********************/
        /**** Snippet 3 End ***/

        /**** Snippet 4 Start ***/
        /***********************/
        // var cancelPause = $ionicPlatform.on('pause', function() {
        //     console.log('App is sent to background');
        //     // do stuff to save power
        // });

        // var cancelResume = $ionicPlatform.on('resume', function() {
        //     console.log('App is retrieved from backgroud');
        //     // re-init the app
        // });

        // // Supported only in BlackBerry 10 & Android
        // var cancelVolumeUpButton = $ionicPlatform.on('volumeupbutton', function() {
        //     console.log('Volume up button pressed');
        //     // moving a slider up
        // });

        // var cancelVolumeDownButton = $ionicPlatform.on('volumedownbutton', function() {
        //     console.log('Volume down button pressed');
        //     // moving a slider down
        // });
        /***********************/
        /**** Snippet 4 End ***/
    });
})
