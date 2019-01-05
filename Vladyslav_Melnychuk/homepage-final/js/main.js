let moviesTemplate = require('../templates/movies.hbs');

import './styles-loader';

const generateData = data => {
  document.getElementById('movies').innerHTML = moviesTemplate(data);
};

let req = new XMLHttpRequest();
req.open('GET', '../data/movies.json');
req.onload = () => {
  if (req.status >= 200 && req.status < 400) {
    let data = JSON.parse(req.responseText);
    generateData(data);
  } else {
    console.log('Connected to the server, but it returned an error.');
  }
};

req.send();
