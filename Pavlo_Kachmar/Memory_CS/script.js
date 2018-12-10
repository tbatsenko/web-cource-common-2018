let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let guessed = 0;
let cardCount = 0;

const cardsUrls = ["http://cs.ucu.edu.ua/wp-content/uploads/2017/01/107.jpg", "http://cs.ucu.edu.ua/wp-content/uploads/2017/02/11737893_10206436360523037_157901722997740251_n.jpg", "http://cs.ucu.edu.ua/wp-content/uploads/2015/04/Romaniuk-5-of-12-150x150.jpg", "http://cs.ucu.edu.ua/wp-content/uploads/2017/02/tymo.png", "http://cs.ucu.edu.ua/wp-content/uploads/2017/01/Hryniv-picture-small-1.jpg", "http://cs.ucu.edu.ua/wp-content/uploads/2018/01/%D0%BC%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE-320x320.jpg"];
// const cardsUrls = ["https://lh3.googleusercontent.com/-UDb2iHMQij8/AAAAAAAAAAI/AAAAAAAAA6c/ib_NuJWQzGw/s60-p-rw-no-il/photo.jpg", "http://old.clio.lnu.edu.ua/Pracivniki_kafedri_istoricnogo_kraeznavstva/Zapisi/2012/3/28_SEREDAK_ALLA_VOLODIMIRIVNA_files/shapeimage_2.png", "https://lh3.googleusercontent.com/-hy3wBqYAd8I/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-gmHlpFP2qvb2C6u4OW8trGsDZiPg/s32-c-mo/photo.jpg", "https://miro.medium.com/fit/c/240/240/0*RnFQUbNbY3e8gY8x."]
const cardElements = cardsUrls.map((v, i) => getCard(v, i));
const doubledCardElements = cardElements.concat(cardElements);
const shuffledCardElements = shuffle(doubledCardElements);
const gameField = document.getElementById("memory-game-field");
gameField.innerHTML = "";

function getCard(src, i) {
    return `<div class="memory-card" data-match="${i}">
        <img class="front-face" src="${src}" alt="${i}">
        <img class="back-face" src="http://cs.ucu.edu.ua/wp-content/themes/twentythirteen/images/ucu_logo_uk.png" alt="js">
    </div>`;
}

shuffledCardElements.forEach((v) => {
    gameField.innerHTML += v
});


const cards = Array.prototype.slice.call(document.querySelectorAll('.memory-card'));
const length = cards.length;

function showWinScreen() {
    document.getElementsByClassName("win-cover")[0].classList.remove("win-cover--hidden");
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function flipCard() {
    if (lockBoard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        if (!(this === firstCard)) {
            hasFlippedCard = false;
            secondCard = this;

            if (firstCard.dataset.match === secondCard.dataset.match) {
                guessed += 2;
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
                setTimeout(() => {
                    firstCard.classList.add('win');
                    secondCard.classList.add('win');
                }, 100);
            } else {
                lockBoard = true;

                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    lockBoard = false;
                }, 500);
            }
            if (guessed === length) {
                showWinScreen();
            }
        }
    }
    cardCount += 1;
    console.log(cardCount);
    document.getElementById("insert").innerHTML = "Your score is: " + cardCount;
}

cards.forEach(card => card.addEventListener('click', flipCard));
document.getElementsByClassName("win-cover")[0].addEventListener('click', () => location.reload());
