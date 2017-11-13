(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=1973069446306076";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.onlogin = function () {


  // ======================== Without Promise ============================ //

  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      messenger.publish('LOGIN');

      FB.api('/me', function (response) {
        messenger.publish('RECEIVE_USERNAME', response);

        FB.api('/me/picture?type=small', function (response) {
          messenger.publish('RECEIVE_PROFILE_IMAGE', response.data);
        });
      });
    }
  });




  // ======================== With Promise ============================ //








  FB.Event.subscribe('auth.logout', function (response) {
    messenger.publish('LOGOUT');
  });
};

window.fbAsyncInit = window.onlogin;
