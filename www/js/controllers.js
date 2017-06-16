angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DogSwipeCtrl', function($scope, $stateParams, TDCardDelegate, $timeout, $ionicModal, $ionicPopup, $ionicSideMenuDelegate, $state, store) {

  // var theuser = store.get('user');
  // $scope.theusername = theuser.name

  $ionicSideMenuDelegate.canDragContent(false)

  var cardTypes = [
    { image: 'https://s-media-cache-ak0.pinimg.com/originals/fb/d8/59/fbd859c5111f3e02ccd5e449dfb357d8.jpg' },
    { image: 'https://s-media-cache-ak0.pinimg.com/736x/e4/81/8a/e4818ad9f6ac9ea3df0c3ead537e550a.jpg' },
    { image: 'https://s-media-cache-ak0.pinimg.com/736x/50/56/1a/50561ab9123eadcf9554dfe75ff61b08.jpg' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeB9Jlhx_gxXaEWgoaNSp68WDvDWPsgdQoS_7mhYMwcq3kVxq' },
    { image: 'https://s-media-cache-ak0.pinimg.com/736x/2e/29/ff/2e29ff2dc00689b2e6440fbec3119cbe.jpg' },
    { image: 'https://s-media-cache-ak0.pinimg.com/736x/63/0f/0e/630f0ef3f6f3126ca11f19f4a9b85243.jpg' },
    { image: 'https://s-media-cache-ak0.pinimg.com/736x/df/eb/7c/dfeb7c77509fbaba429a357091d88e31.jpg' }
  ];

  $scope.cards = {
    master: Array.prototype.slice.call(cardTypes, 0),
    active: Array.prototype.slice.call(cardTypes, 0),
    discards: [],
    liked: [],
    disliked: []
  }

  $scope.swipedup = function() {
    console.log('hello')
  }; 
  

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
    // var thepopup = $ionicPopup.alert({
    //   title: 'This is a sidemenu',
    //   template: 'This will be a nice sidemenu, but for now it will log you out.',
    //   cssClass: 'forfidopopup'
    // });

    // thepopup.then(function(res) {
    //   $state.go('signin')
    // });

  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.active.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[0];
    $scope.cards.active.push(angular.extend({}, newCard));
  }

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  }

  $scope.$on('removeCard', function(event, element, card) {
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.disliked.push(card);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.liked.push(card);
  };

  $ionicModal.fromTemplateUrl('dogmodal.html', {
    scope: $scope,
    animation: 'animated ' + 'zoomIn'
  }).then(function(modal) {
    $scope.dogmodal = modal;
  });
  $scope.opendogmodal = function() {
    $scope.dogmodal.show();
  };
  $scope.closedogmodal = function() {
    $scope.dogmodal.hide();
  };


  $scope.specialpopup = function() {
    $ionicPopup.alert({
      title: 'This dosen\'t work yet',
      template: 'Sorry, this feature is out of service right now, but it\'s coming soon, and it\'s going to be awesome!',
      cssClass: 'forfidopopup'
    });
  };

  $scope.specialpopup2 = function() {
    $ionicPopup.show({
      template: '<input type="text" placeholder="Message...">',
      title: 'Send a message',
      subTitle: 'Something you want to say to lucky?',
      cssClass: 'forfidopopup',
      buttons: [
        { text: 'Cancel' },
        { text: '<b>Save</b>' }
      ]
    });
  };

})

.controller('signinCtrl', function($scope, $stateParams, $state, $ionicModal, $timeout, ngFB, store) {
  var fbuser = store.get('user');
  $scope.hasfb = fbuser;

  $scope.signin = function(){}

  $scope.logout = function(){
    openFB.logout(
    function() {
     store.set('user', user);
    })
  }

  $scope.facebook = function () {
    
    ngFB.login({scope: 'email'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          $state.go('moreInfo')

          ngFB.api({
            path: '/me',
            params: {fields: 'email,id,name'}
          }).then(
            function (user) {
              $scope.user = user;

              store.set('user', user);
              console.log(user)
            },
            function (error) {
              console.log('Facebook error: ' + error.error_description);
           });

        } else {
          alert('Facebook login failed');
        }
    });
  };

  $scope.register = function(){
    $state.go('register')
  }

})


.controller('registerCtrl', function($scope, $stateParams, $state, store) {

  $scope.register = function(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error " + errorCode + " : " + errorMessage)
    });
  }

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.email + user.password);
    $state.go('moreInfo')
    // store.set('epuser', user);
  } else {
    // No user is signed in.
  }
  });

  $scope.cancel = function(){

    $state.go('signin')

  }

})

.controller('moreInfoCtrl', function($scope, $stateParams, $state, $ionicPopup) {

   $scope.data = {};
    
    //Optional
    $scope.countryCode = 'AU';
    
    //Optional
    $scope.onAddressSelection = function (location) {
    
        //Do something
        var a = location.address_components;
    };

    $scope.uploadPhoto = function(){

      console.log("Upload Photo!")
      var vm = this;

      vm.picture = false; // Initial state

      

    }




    $scope.register = function(first, last, address, mobile){

      var user = firebase.auth().currentUser;
      var email = user.email;

      // firebase.auth().onAuthStateChanged(function(user) { 
      //   user.sendEmailVerification(); 
      // });

      // $scope.isverified = user.emailVerified

      // $scope.$watch('isverified', function() {
      //   if($scope.isverified){
      //     console.log("all good g")
      //     $state.go('walk')
      //   }else{
      //     console.log("nah")
      //     $state.go('walk')
      //   }
      // });

      var ref = firebase.database().ref().child("Users").child(mobile);

      if(first && last && address && mobile){
        ref.set({
          email: email,
          fName: first,
          lName: last,
          address: address,
          mobile: mobile,
          picture: 'none',
          walkingDogs: [{owner: "mobileNum or name.." , Dogname: "John"}],
          OwnedDogs: [{Dogname: "John", breed: "Poodle", Location: "CurrentLocation"}] 
        });

        // firebase.auth().onAuthStateChanged(function(user) { 
        //   if (user.emailVerified) {
        //     console.log('Email is verified');
        //     $state.go('signin')
        //   }
        //   else {
        //   console.log('Email is not verified');
        //     user.sendEmailVerification(); 
        //     var alertPopup = $ionicPopup.alert({
        //       title: 'Woof',
        //       template: 'You have recieved an email verification',
        //       cssClass: 'forfidopopup',
        //       buttons: [
        //        {
        //          text: 'I have Verified',
        //          type: 'button-positive',
        //          onTap: function() {

        //          }
        //        },
        //      ]
        //     });
        //   }   
        // });
        $state.go('doglist');
      }
      else{
        var alertPopup = $ionicPopup.alert({
         title: 'Sorry',
         template: 'You must enter all details',
         cssClass: 'forfidopopup'
       });
      }
    }

})

.controller('walkCtrl', function($scope, $stateParams, $state) {



    // check for Geolocation support
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  }
  else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  }

    var startPos;
    navigator.geolocation.getCurrentPosition(function(position) {
      startPos = position;
      document.getElementById('startLat').innerHTML = startPos.coords.latitude;
      document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      console.log('lat' + startPos.coords.latitude)
    }, function(error) {
    alert('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from locaton provider)
    //   3: timed out
    });

  navigator.geolocation.watchPosition(function(position) {
    //document.getElementById('currentLat').innerHTML = position.coords.latitude;
    //document.getElementById('currentLon').innerHTML = position.coords.longitude;
    document.getElementById('distance').innerHTML = calculateDistance(startPos.coords.latitude, startPos.coords.longitude,position.coords.latitude, position.coords.longitude);

  });

  function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad(); 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c;
    return d;
    console.log(d);
  }
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

  
  $scope.walkstate = "Pause Walk";

  $scope.startWalk = function(){
    
    if($scope.walkstate=="Pause Walk"){
      $scope.stopTimer();
      $scope.walkstate = "Continue Walk" 
    }
    else{
      $scope.walkstate = "Pause Walk"
      $scope.resumeTimer();
    }
  }

  $scope.restartWalk = function(){
    $scope.startTimer();
  }

  $scope.finishWalk = function(){
    $scope.stopTimer();
    $state.go('signin');
  }

  
  $scope.startTimer = function (){
    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
  };

  $scope.resumeTimer = function (){
    $scope.$broadcast('timer-resume');
    $scope.timerRunning = false;
  };

  $scope.stopTimer = function (){
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
  };
 
  $scope.$on('timer-stopped', function (event, data){
    console.log('Timer Stopped - data = ', data);
  });
  
})

.controller('DogListCtrl', function($scope, $stateParams, $ionicModal, $firebaseArray, store) {
  $scope.downloaddone = false;
  
  var fbuser = store.get('user');
  $scope.username = fbuser.name

  $ionicModal.fromTemplateUrl('dogmodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.dogmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closethedogmodal = function() {
    $scope.dogmodal.hide();
  };

  // Open the login modal
  $scope.thedogmodal = function() {
    $scope.dogmodal.show();
  };

  $scope.achange = function() {
    $scope.selectedfile = event.target.files[0]
  }

  $scope.uploadfile = function() {
    var storageRef = firebase.storage().ref();
    var file = $scope.selectedfile;

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child(file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       $scope.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + $scope.progress + '% done');
        
      if($scope.progress < 100){
        $scope.status = "Image Uploading"
      }else{
        $scope.status = "Image Done"
      }

      console.log($scope.status)
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
    }, function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL)
      $scope.downloaddone = true
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        $scope.lat = $scope.position.coords.latitude;
        $scope.long = $scope.position.coords.longitude;
      });
    });
  }


}); 
