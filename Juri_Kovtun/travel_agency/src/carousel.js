// setting global parameters:
// Carousel post ID. Cuba carousel: 20.
const CAROUSEL_POST = 20;

const endPoint = 'http://localhost/travel-agency/wp-json/wp/v2/';
const mediaURL = endPoint + 'media';

fetch(mediaURL)
    .then(r => r.json())
    .then((media)=> {
        renderCarousel(media);
        console.log('tada');
    });

// filtering carousel media, sorting in template order, building HTML elements
function renderCarousel(media) {
    const carouselEntry = document.querySelector('.carousel');
    const carouselMedia = media.filter(el => el.post === CAROUSEL_POST);
    const carouselTemplate = ['previous-hide', 'previous-2', 'previous-1', 'selected', 'next-1', 'next-2', 'next-hide'];
    let carouselOrdered = [];
    let carouselInnerHTML = "";

    // sort carousel media
    function orderCarouse(source, template) {
        for (let i = 0; i < template.length; i++) {
            for (let j = 0; j < source.length; j++) {
                if (source[j].caption.rendered.includes(template[i], 2)) {
                    carouselOrdered.push(source[j]);
                }
            }
        }
    }
    orderCarouse(carouselMedia, carouselTemplate);



    // matching class names to array elements
    function setCarouselClassName(string) {
        let className = '';

        if (string.includes('previous-hide',2)) className = 'prev-hide';
        if (string.includes('previous-2',2)) className = 'prev-2';
        if (string.includes('previous-1',2)) className = 'prev-1';
        if (string.includes('selected',2)) className = 'selected';
        if (string.includes('next-1',2)) className = 'next-1';
        if (string.includes('next-2',2)) className = 'next-2';
        if (string.includes('next-hide',2)) className = 'next-hide';

        return className
    }

    // building HTML
    carouselOrdered.map(el => {
        carouselInnerHTML += `
            <div class="carousel_image-wrapper ${setCarouselClassName(el.caption.rendered)}">
                <img class="carousel_image" src="${el.source_url}" alt="${el.alt_text}">
            </div>`
    });

    carouselEntry.innerHTML = carouselInnerHTML;

    // mouse click handler
    function imageClicker (node) {
        node.addEventListener('click', function () {
            moveToSelected(this);
        })
    }
    carouselEntry.querySelectorAll('.carousel_image-wrapper').forEach(function(node) {
        imageClicker(node);
    });




}

// utility functions
function countPriorSiblings(element, array) {
    let counter = element.previousElementSibling;
    while (counter) {
        array.push(counter);
        counter = counter.previousElementSibling;
    }
}

function countNextSiblings(element, array) {
    let counter = element.nextElementSibling;
    while (counter) {
        array.push(counter);
        counter = counter.nextElementSibling;
    }
}

function setPriorClassNames(item, index) {
    if (index === 0) item.className = 'carousel_image-wrapper prev-1';
    if (index === 1) item.className = 'carousel_image-wrapper prev-2';
    if (index > 1) item.className = 'carousel_image-wrapper prev-hide';
}

function setNextClassNames(item, index) {
    if (index === 0) item.className = 'carousel_image-wrapper next-1';
    if (index === 1) item.className = 'carousel_image-wrapper next-2';
    if (index > 1) item.className = 'carousel_image-wrapper next-hide';
}


// main function
function moveToSelected(parameter) {
    let selected;
    let priorSiblings = [];
    let nextSiblings = [];

    switch (parameter) {
        case 'prev':
            if (container.querySelector('.selected').previousElementSibling) {
                selected = container.querySelector('.selected').previousElementSibling;
            } else {
                selected = container.querySelector('.selected');
            }
            break;
        case 'next':
            if (container.querySelector('.selected').nextElementSibling) {
                selected = container.querySelector('.selected').nextElementSibling;
            } else {
                selected = container.querySelector('.selected');
            }
            break;
        default:
            selected = parameter;
    }

    // set selected className
    selected.className = 'carousel_image-wrapper selected';

    // build arrays of siblings
    countPriorSiblings(selected, priorSiblings);
    countNextSiblings(selected, nextSiblings);

    // set classNames to prior siblings
    priorSiblings.forEach(setPriorClassNames);
    nextSiblings.forEach(setNextClassNames);
}


// event handlers
const container = document.querySelector('.container-carousel');


// left and right arrows handler
document.addEventListener('keypress', function(event) {
    if (event.key === 'ArrowLeft') moveToSelected('prev');
    if (event.key === 'ArrowRight') moveToSelected('next');
});


// onscreen handlers
container.querySelector('.handler--prev').addEventListener('click', function() {
    moveToSelected('prev')
});

container.querySelector('.handler--next').addEventListener('click', function() {
    moveToSelected('next')
});
