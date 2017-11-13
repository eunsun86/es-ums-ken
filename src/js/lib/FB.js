(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=1973069446306076";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.onlogin = function () {


  // ======================== Without Promise ============================ //

  // FB.getLoginStatus(function (response) {
  //   if (response.status === 'connected') {
  //     messenger.publish('LOGIN');

  //     FB.api('/me', function (response) {
  //       var userData = response;

  //       FB.api('/me/picture?type=small', function (response) {
  //         messenger.publish('RECEIVE_USER_DATA', {
  //           user: userData,
  //           profileImage: response.data
  //         });
  //       });
  //     });
  //   }
  // });




  // ======================== With Promise ============================ //

  var loginStatusPromise = new Promise(function (resolve, reject) {
    FB.getLoginStatus(resolve);
  });

  loginStatusPromise.then(function (response) {
    if (response.status === 'connected') {
      messenger.publish('LOGIN');
      return true;
    } else {
      return false;
    }
  }).then(function (result) {
    if (!result) {
      return result;
    }

    var usernamePromise = new Promise(function (resolve, reject) {
      FB.api('/me', resolve);
    });

    return usernamePromise;
  }).then(function (result) {
    if (!result) {
      return;
    }

    var profilePicturePromise = new Promise(function (resolve, reject) {
      FB.api('/me/picture?type=small', resolve);
    });

    profilePicturePromise.then(function (response) {
      messenger.publish('RECEIVE_USER_DATA', {
        user: result,
        profileImage: response.data
      });
    });

  // Promise Error Handling
  }).catch(function (error) {
    console.error(error);
  });






  FB.Event.subscribe('auth.logout', function (response) {
    messenger.publish('LOGOUT');
  });
};

window.fbAsyncInit = window.onlogin;
