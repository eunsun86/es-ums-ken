(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=1973069446306076";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.onlogin = function () {
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

    usernamePromise.then(function (data) {
      messenger.publish('RECEIVE_USERNAME', data);
    });

    return usernamePromise;
  }).then(function (result) {
    if (!result) {
      return;
    }

    var profilePicturePromise = new Promise(function (resolve, reject) {
      FB.api('/me/picture?type=small', resolve);
    });

    profilePicturePromise.then(function (data) {
      messenger.publish('RECEIVE_PROFILE_IMAGE', data.data);
    });
  }).catch(function (error) {
    console.error(error);
  });

  FB.Event.subscribe('auth.logout', function (response) {
    messenger.publish('LOGOUT');
  });
};

window.fbAsyncInit = window.onlogin;
