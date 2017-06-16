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
        $state.go('tabs')
      }
    }else if(epuser){
      console.log("Accessed with Password " + epuser.email)
      $state.go('tabs')
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

  .state('tabs', {
      url: "/tabs",
      abstract: false,
      templateUrl: "templates/tabs.html"
    })

  .state('tabs.walker', {
      url: "/walker",
      views: {
        'walker-tab': {
          templateUrl: "templates/walker.html",
          controller: 'walkerCtrl'
        }
      }
    })

   .state('tabs.owner', {
      url: "/owner",
      views: {
        'owner-tab': {
          templateUrl: "templates/doglist.html",
          controller: 'DogListCtrl'
        }
      }
    })

   .state('dogswipe', {
      url: '/dogswipe',
      templateUrl: 'templates/dogswipe.html',
      controller: 'DogSwipeCtrl'
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

  // NEW 

  // .state('walker', {
  //   url: '/walker',
  //   templateUrl: 'templates/walker.html',
  //   controller: 'walkerCtrl'
  // })

  // .state('owner', {
  //   url: '/owner',
  //   templateUrl: 'templates/owner.html',
  //   controller: 'ownerCtrl'
  // })

  .state('rating', {
    url: '/rating',
    templateUrl: 'templates/rating.html',
    controller: 'ratingCtrl'
  })

  .state('donate', {
    url: '/donate',
    templateUrl: 'templates/donate.html',
    controller: 'donateCtrl'
  })

  .state('thanks', {
    url: '/thanks',
    templateUrl: 'templates/thanks.html',
    controller: 'thanksCtrl'
  })

  // .state('home', {
  //   url: '/home',
  //   templateUrl: 'templates/home.html',
  //   controller: 'homeCtrl'
  // })

  // END NEW 

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
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('signin');
});
