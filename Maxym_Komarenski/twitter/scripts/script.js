function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
window.fbAsyncInit = function() {
  FB.init({
    appId      : '2314892068570979',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.getLoginStatus(function(response){
    if(response.status === 'connected'){
      document.getElementById('status').innerHTML = 'we are connected';
    } else if(response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'we are not logged in.'
    } else {
      document.getElementById('status').innerHTML = 'you are not logged in to Facebook';
    }
  });
  // FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function login(){
  FB.login(function(response){
    if(response.status === 'connected'){
      document.getElementById('status').innerHTML = 'we are connected';
    } else if(response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'we are not logged in.'
    } else {
      document.getElementById('status').innerHTML = 'you are not logged in to Facebook';
    }

  });
}
// get user basic info

function getInfo() {
  FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
    document.getElementById('status').innerHTML = response.id;
  });
}

function logout(){
  FB.logout(function(response) {
    document.location.reload();
  });
}
