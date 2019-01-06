window.fbAsyncInit = function() {
    FB.init({
        appId      : '334968740653991',
        xfbml      : true,
        version    : 'v2.8'
    });
};


function fb_login(){
    FB.login(function(response){
        if(response.status === 'connected'){
            getInfo();
        }

    });
}

function fb_logout(){
    FB.logout(function(response) {
        document.location.reload();
        window.location.href = "login.html";
    });
}

function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
        window.location.href = "main_page.html";
        console.log(response)
    });
}