window.fbAsyncInit = function() {
    FB.init({
        appId      : '334968740653991',
        xfbml      : true,
        version    : 'v2.8'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fb_login(){
    FB.login(function(response){
        if(response.status === 'connected'){
            getInfo();
        }


    });
}
// get user basic info

function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
        window.location.href = "main_page.html";
        console.log(response)
    });
}

function fb_logout(){
    console.log("LOGOUT!");
    try {
        FB.logout(function (response) {ss
            document.location.reload();
            window.location.href = "login.html";
        });
    }catch (e) {
        window.location.href = "login.html";
    }
}