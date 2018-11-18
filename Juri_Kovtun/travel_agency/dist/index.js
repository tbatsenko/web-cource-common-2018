const collapsibleListener = document.getElementsByClassName('collapsible__listener');


for (let i = 0; i < collapsibleListener.length; i++) {
    collapsibleListener[i].addEventListener('click', function () {
        this.previousElementSibling.classList.toggle("collapsible__content--hidden");
        if (this.innerHTML === " Read More »") {
            this.innerHTML = " « Hide";

        } else {
            this.innerHTML = " Read More »";
        }

    });

}