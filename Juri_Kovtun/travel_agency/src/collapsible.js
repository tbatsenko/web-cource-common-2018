const collapsibleListener = document.getElementsByClassName('collapsible__listener');
function showHideReading () {
    this.previousElementSibling.classList.toggle("collapsible__content--hidden");
    if (this.innerHTML === " Read More »") {
        this.innerHTML = " « Hide";

    } else {
        this.innerHTML = " Read More »";
    }

}

function addCollapsibleListeners() {
    for (let i = 0; i < collapsibleListener.length; i++) {
        collapsibleListener[i].addEventListener('click', showHideReading);
        collapsibleListener[i].addEventListener('TabOpen', showHideReading);
    }
}

addCollapsibleListeners();

export default {addCollapsibleListeners}