let obstacles = [];
let clouds = [];
let distance = 0;
let action = 'RUN';
let pos = 0;
let obs_speed = 1.1;
let ground_speed = 5.5;
let cloud_speed = 0.4;
let score = 0;
let high_score = localStorage.getItem("high_score") === null ? 0 : localStorage.getItem("high_score");
let div_game_field;
let div_game_field_ground;
let elem;
const obstacle_types = ['game-field__obstacle__cactus1', 'game-field__obstacle__cactus2', 'game-field__obstacle__cactus3', 'game-field__obstacle__bird', 'game-field__obstacle__bird game-field__obstacle__bird__first', 'game-field__obstacle__bird game-field__obstacle__bird__second'];
let span_score;
let obstacle_position = 0;
let cloud_position = 0;
let min_distance1 = 180;
let min_distance2 = 360;
renderGame();


function renderGame() {
    document.body.innerHTML = '';
    obstacles = [];
    clouds = [];
    div_game_field = document.createElement('div');
    div_game_field.setAttribute('class', 'game-field');
    document.body.appendChild(div_game_field);

    var div_game_field_dino = document.createElement('div');
    div_game_field_dino.setAttribute('class', 'game-field__dino');
    div_game_field.appendChild(div_game_field_dino);


    div_game_field_ground = document.createElement('div');
    div_game_field_ground.setAttribute('class', 'game-field__ground');
    div_game_field.appendChild(div_game_field_ground);

    distance = 0;
    span_score = document.createElement('span');
    span_score.setAttribute('class', 'game-field__score-text');
    span_score.textContent = distance;
    div_game_field.appendChild(span_score);

    action = 'RUN';
    elem = document.getElementsByClassName("game-field__dino")[0];
    pos = 0;
    score = 0;
    obs_speed = 1.1;
    cloud_speed = 0.4;
}


const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

function showScore(distance){
    score = parseInt(distance / 30);
    span_score.textContent = 'HI' + '    ' + high_score + '    ' + score;
}


function renderObstacle(){
    if(obstacles.length === 0 && getRandomInt(0, 100) === 1){
        //obstacles.push('<div class ="game-field__obstacle game-field__obstacle__cactus1"></div>')
        obstacles.push(document.createElement('div'));
        obstacles[obstacles.length - 1].setAttribute('class', 'game-field__obstacle ' + obstacle_types[getRandomInt(0, obstacle_types.length )]);
        div_game_field.appendChild(obstacles[obstacles.length - 1]);
        obstacle_position = distance;
    }
    else if(getRandomInt(0, 500) === 1 && obstacles.length < 2 && distance - obstacle_position > min_distance1){
        obstacles.push(document.createElement('div'));
        obstacles[obstacles.length - 1].setAttribute('class', 'game-field__obstacle ' + obstacle_types[getRandomInt(0, obstacle_types.length )]);
        div_game_field.appendChild(obstacles[obstacles.length - 1]);
        obstacle_position = distance;
    }
    else if(getRandomInt(0, 1000) === 1 && obstacles.length < 3 && distance - obstacle_position > min_distance2){
        obstacles.push(document.createElement('div'));
        obstacles[obstacles.length - 1].setAttribute('class', 'game-field__obstacle ' + obstacle_types[getRandomInt(0, obstacle_types.length )]);
        div_game_field.appendChild(obstacles[obstacles.length - 1]);
        obstacle_position = distance;
    }
}

function renderClouds(){
    if(clouds.length === 0 && getRandomInt(0, 100) === 1){
        //clouds.push('<div class ="game-field__obstacle game-field__obstacle__cactus1"></div>')
        clouds.push(document.createElement('div'));
        clouds[clouds.length - 1].setAttribute('class', 'game-field__clouds');
        clouds[clouds.length - 1].style.top =  getRandomInt(20, 65)+ 'px';
        div_game_field.appendChild(clouds[clouds.length - 1]);
        cloud_position = distance;
    }
    else if(getRandomInt(0, 600) === 1 && clouds.length < 5 && distance - cloud_position > min_distance2){
        clouds.push(document.createElement('div'));
        clouds[clouds.length - 1].setAttribute('class', 'game-field__clouds');
        clouds[clouds.length - 1].style.top =  getRandomInt(20, 65)+ 'px';
        div_game_field.appendChild(clouds[clouds.length - 1]);
        cloud_position = distance;
    }
}


function gameOver(){
    var span_over = document.createElement('span');
    span_over.setAttribute('class', 'game-field__failure-text');
    //span_over.textContent = "GAME OVER!";
	let dino = document.getElementsByClassName("game-field__dino")[0];
	let ground = document.getElementsByClassName("game-field__ground")[0];
	let birds = document.getElementsByClassName("game-field__obstacle__bird");
	//dino.style.animation.cancel();
	//dino[0].style.webkitAnimationPlayState  = 'canceled';
	for (let i=0; i<birds.length; i++) {
		birds[i].style.webkitAnimationPlayState  = 'paused';
	}
	dino.style.animation = 'none';
	dino.style.height = 42 + 'px';
    dino.style.width = 42 + 'px';
	dino.style.backgroundPositionX = '-890px'
    dino.style.backgroundPositionY = '-4px';
	ground.style.webkitAnimationPlayState  = 'paused';
    div_game_field.appendChild(span_over);
}


function checkDeath(obs) {
    var dino_coordinates = elem.getBoundingClientRect();
    var obs_coordinates = obs.getBoundingClientRect();
    if (obs_coordinates.left < dino_coordinates.right && obs_coordinates.right > dino_coordinates.left){
        //if(obs_coordinates.top <= dino_coordinates.bottom && obs_coordinates.top > dino_coordinates.top){
        if (obs_coordinates.top < dino_coordinates.bottom && obs_coordinates.bottom > dino_coordinates.top){
            gameOver();
            alert("GAME OVER, loser\nYour score: " + score + "\nPress ENTER");
            if (score > high_score){
                localStorage.setItem('high_score', score);
                high_score = localStorage.getItem('high_score')
            }
            renderGame();
            return true
        }
    }
    return false
    //console.log(rect.top, rect.right, rect.bottom, rect.left);

}
function moveObsacle() {
    var obses = document.getElementsByClassName("game-field__obstacle");
    for (let i=0; i<obses.length; i++) {
        //obses[i].style.right = 1 + 'px'
        if(checkDeath(obses[i])){
            continue;
        }
        let stylez = window.getComputedStyle ? getComputedStyle(obses[i], null) : obses[i].currentStyle;
        obses[i].style.right = (parseFloat(stylez.right) + obs_speed) + 'px';
        //obses[i].style.right = (parseFloat(stylez.right) + obs_speed) + 'px';
        if(distance % 1500 === 0){
            obs_speed += 0.1
            cloud_speed += 0.1
            ground_speed -= 0.15
            min_distance1 += 25
            min_distance2 += 25
            div_game_field_ground.style.animationDuration = ground_speed;
        }

        if(parseInt(stylez.right) >= 600){
            //obses[i].style.right = -35 +  'px'
            div_game_field.removeChild(obstacles[0]);
            obstacles.shift();
        }
    };
}

function moveClouds() {
    var cls = document.getElementsByClassName("game-field__clouds");
    for (let i=0; i<cls.length; i++) {
        let stylez = window.getComputedStyle ? getComputedStyle(cls[i], null) : cls[i].currentStyle;
        cls[i].style.right = (parseFloat(stylez.right) + cloud_speed) + 'px';
        if(parseInt(stylez.right) >= 600){
            div_game_field.removeChild(clouds[0]);
            clouds.shift();
        }
    };
}


setInterval(() => {
    //renderGame(document.body)
    if (action === 'JUMP' && pos < 90) {
        elem.style.bottom = pos + 'px';
        //pos = pos + 0.5;
        pos++;
        if (pos >= 90) {
            action = 'FALL';
        }

    }
    else if(action === 'FALL' && pos !== 0){
        //pos = pos - 0.5;
        pos--;
        elem.style.bottom = pos + 'px';
        if(pos <= 0){
            action = 'RUN'
        }
    }
    else if(action === 'FORCE_DOWN'){
        pos = pos - 2;
        elem.style.bottom = pos + 'px';
        if(pos <= 0 ){
            action = 'DASH';
            pos = 0
        }
    }

    if (action === 'DASH'){
        elem.style.height = 27 + 'px';
        elem.style.width = 58 + 'px';
        // elem.style.backgroundPositionX = -933 + 'px';
        // elem.style.backgroundPositionY = -18 + 'px';
        elem.style.animation = 'dino-dash 0.3s infinite';
    }
    else{
        elem.style.height = 42 + 'px';
        elem.style.width = 42 + 'px';
        // elem.style.backgroundPositionX = -38 + 'px';
        // elem.style.backgroundPositionX = -802 + 'px';
        // elem.style.backgroundPositionY = -4 + 'px';
        elem.style.animation = 'dino-run 0.2s infinite';

    }
    moveObsacle();
    renderObstacle();
    moveClouds();
    renderClouds();
    distance++;
    showScore(distance);
}, 1)


const KEY_DOWN = 40;
const KEY_UP = 38;
const SPACE = 32;


document.addEventListener('keydown', e => {
    //console.log(action);
    switch (e.keyCode) {
        case KEY_DOWN: {
            if (action === 'RUN') {
                action = 'DASH';
            }
            else if(action === 'JUMP' || action === 'FALL'){
                action = 'FORCE_DOWN'
            }
            return
        }

        case SPACE:
        case KEY_UP: {
            if (action === 'RUN'){
                action = 'JUMP';
            }
            return
        }
    }
})


document.addEventListener('keyup', e => {
    //console.log(action);
    switch (e.keyCode) {
        case KEY_DOWN: {
            if(action === 'DASH') {
                action = 'RUN'
            }
            else if(action === 'FORCE_DOWN' && pos !== 0){
                action = 'FALL'
            }
        }

    }
})
