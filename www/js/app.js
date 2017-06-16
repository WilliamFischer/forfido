// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'ionic.contrib.ui.tinderCards2', 'ngOpenFB','angular-storage', 'ion-google-autocomplete', 'camera', 'timer'])

.run(function($ionicPlatform, ngFB, store, $rootScope, $state) {

  $ionicPlatform.ready(function() {

    var epuser = store.get('epuser');
    var fbuser = store.get('user');

    $rootScope.$watch('fbuser', function() {
      console.log("hey")
    });

    if(fbuser){
      console.log(fbuser)
      if(epuser){
        firebase.auth().signOut().then(function() {
          console.log("signed out of passowrd")
        }).catch(function(error) {});
      }else{
        // $state.go('app.dogswipe')
      }
    }else if(epuser){
      console.log("Accessed with Password " + epuser.email)
      $state.go('dogswipe')
    }else{
      $state.go('signin')
    }

    ngFB.init({appId: '298020007312457'});

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  var config = {
    apiKey: ' AIzaSyBV85zniMmMTdL7j104iXY9ibOANIGwLjg',
    authDomain: 'forfido-5a2a3.firebaseapp.com',
    databaseURL: 'https://forfido-5a2a3.firebaseio.com',
    storageBucket: 'gs://forfido-5a2a3.appspot.com'
  };
  firebase.initializeApp(config);

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.dogswipe', {
    url: '/dogswipe',
    views: {
      'menuContent': {
        templateUrl: 'templates/dogswipe.html',
        controller: 'DogSwipeCtrl'
      }
    }
  })
  
  .state('moreInfo', {
    url: '/moreInfo',
    templateUrl: 'templates/moreInfo.html',
    controller: 'moreInfoCtrl'
  })

   .state('walk', {
    url: '/walk',
    templateUrl: 'templates/walk.html',
    controller: 'walkCtrl'
  })

  .state('doglist', {
    url: '/doglist',
    templateUrl: 'templates/doglist.html',
    controller: 'DogListCtrl'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'signinCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('signin');
});
