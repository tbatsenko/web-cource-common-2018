//Game implementation

//Additional functions
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function game() {
    var field = document.getElementById('field');
    field.onclick = function(event) {
        var target = event.target;

        while (target !== field) {
            if (target.className === "card__sides") {
                if(target.style.transform === 'rotateY(180deg)'){
                    target.style.transform = 'rotateY(0deg)';
                }else{
                    target.style.transform = 'rotateY(180deg)';
                }

                var child = target.parentNode;

                active_images.push(Array.prototype.indexOf.call(child.parentNode.children, child));

                for(var k = 0; k<2; k++){
                    if(photos[active_images[k]] === "talon.svg"){
                        setTimeout(explosion, 700);
                    }
                }

                if(active_images.length === 2 && photos[active_images[0]] !== photos[active_images[1]]){
                    document.getElementById('field').style.pointerEvents = 'none';
                    setTimeout(wrong_cards, 800);
                }else if(active_images.length === 2 && photos[active_images[0]] === photos[active_images[1]]){
                    document.getElementsByClassName("card__sides")[active_images[0]].style.pointerEvents = 'none';
                    document.getElementsByClassName("card__sides")[active_images[1]].style.pointerEvents = 'none';
                    active_images = []
                }

                return;
            }
            target = target.parentNode;
        }
    }
}

function wrong_cards() {
    document.getElementsByClassName("card__sides")[active_images[0]].style.transform = 'rotateY(0deg)';
    document.getElementsByClassName("card__sides")[active_images[1]].style.transform = 'rotateY(0deg)';
    active_images = [];
    ++moves;
    document.getElementById('moves').innerHTML = moves.toString();
    document.getElementById('field').style.pointerEvents = 'auto';
}

function game_over() {
    var modal = document.getElementById('game-modal');

    var restart = document.getElementsByClassName("game-over-window__close-button")[0];

    modal.style.display = "flex";

    restart.onclick = function() {
        location.reload();
    };
}

function explosion() {
    var explosion_sound = document.getElementById('explosion-audio');
    explosion_sound.volume = 0.4;
    explosion_sound.play();
    document.getElementsByClassName("overlay-explosion")[0].style.display = 'block';
    setTimeout(() => document.getElementsByClassName("overlay-explosion")[0].style.display = 'none', 2000);
    stop_timer=true;
    setTimeout(game_over, 1800);
}

//Timer functions
function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = +timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){
        m=m-1;
    }
    if(m<0){
        game_over();
        stop_timer=true;
    }
    if(!stop_timer){
        document.getElementById('timer').innerHTML =
            m + ":" + s;
        setTimeout(startTimer, 1000);
    }
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}
    if (sec < 0) {sec = "59"}
    return sec;
}

//Generating field
var photos = ["pear.svg", "apple.svg", "cherry.svg", "blueberries.svg"];

photos = photos.reduce(function (res, current, index, array) {
    return res.concat([current, current]);
}, []);

//Preparing photos array for game
photos.push("talon.svg");
photos = shuffle(photos);

var source   = document.getElementById("card-template").innerHTML;
var template = Handlebars.compile(source);

for( var i=0; i<photos.length; i++){
    var context = {photo: "img/" + photos[i]};
    document.getElementById('field').innerHTML += template(context);
}

//Game process
var active_images = [];
var moves = 0;
var stop_timer = false;

startTimer();