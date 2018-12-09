const path = require('path');

module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.js'),
    calendar: path.join(__dirname, './src/js/calendar.js'),
    todos: path.join(__dirname, './src/js/todo-list.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};