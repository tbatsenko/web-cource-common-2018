import '../styles/index.scss';
import move from 'move-js';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(() => {
  for (let i = 1; i < 6; i++) {
    if (document.querySelector(`#field__yard__antichrist${i}`)) {
      move(`#field__yard__antichrist${i}`)
        .to(getRandomInt(400), getRandomInt(400))
        .duration('0.9s')
        .ease('linear')
        .end();
    }
  }
}, 900);

function goLearnWeb() {
  const lastColumn = document.querySelector('.field__church__col');
  if (lastColumn.children.length === lastColumn.nextElementSibling.children.length + 1) {
    // Create new column and insert before lastColumn
    const newWebLearnersColumn = document.createElement("div");
    newWebLearnersColumn.className = 'field__church__col';
    const newWebLearner = document.createElement("div");
    newWebLearner.className = 'field__church__col__person';
    newWebLearnersColumn.appendChild(newWebLearner);
    lastColumn.parentNode.insertBefore(newWebLearnersColumn, lastColumn);
  } else {
    // Insert element into last column
    const newWebLearner = document.createElement("div");
    newWebLearner.className = 'field__church__col__person';
    lastColumn.insertBefore(newWebLearner, lastColumn.childNodes[0]);
  }
}

[].forEach.call(document.querySelectorAll('.field__yard__antichrist'), (elem) => {
  elem.addEventListener('click', () => {
    elem.remove();
    goLearnWeb();
  })
});