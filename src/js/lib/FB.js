(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=130143707734976";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.IS_LOGGEDIN = false;

window.onlogin = function () {
  FB.getLoginStatus(function (response) {
    if (window.IS_LOGGEDIN) {
      return;
    }

    if (response.status === 'connected') {
      window.IS_LOGGEDIN = true;
      messenger.publish('LOGIN');
    }
  });

  FB.Event.subscribe('auth.logout', function (response) {
    if (!window.IS_LOGGEDIN) {
      return;
    }

    window.IS_LOGGEDIN = false;
    messenger.publish('LOGOUT');
  });
};

window.fbAsyncInit = window.onlogin;
