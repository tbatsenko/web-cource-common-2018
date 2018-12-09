/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/calendar */ \"./src/js/calendar.js\");\n/* harmony import */ var _js_todo_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/todo-list */ \"./src/js/todo-list.js\");\n\n\n\nconst serverURL = 'http://localhost:3000';\n// export const todoList = new TodoList();\n\nwindow.Calendar = _js_calendar__WEBPACK_IMPORTED_MODULE_0__[\"Calendar\"];\nwindow.TodoList = _js_todo_list__WEBPACK_IMPORTED_MODULE_1__[\"TodoList\"];\n\ndocument.getElementById(\"today-date\").innerText = \"Today is\" + new Date().getDate();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/calendar.js":
/*!****************************!*\
  !*** ./src/js/calendar.js ***!
  \****************************/
/*! exports provided: Calendar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Calendar\", function() { return Calendar; });\nclass Calendar {\n  constructor() {\n    this.today = new Date();\n    this.currentMonth = this.today.getMonth();\n    this.currentYear = this.today.getFullYear();\n    this.selectYear = document.getElementById(\"year\");\n    this.selectMonth = document.getElementById(\"month\");\n\n    this.months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\n    this.monthAndYear = document.getElementById(\"monthAndYear\");\n\n    this.showCalendar(this.currentMonth, this.currentYear);\n  }\n\n  next() {\n    console.log(\"NEXT called\");\n    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;\n    this.currentMonth = (this.currentMonth + 1) % 12;\n    this.showCalendar(this.currentMonth, this.currentYear);\n\n  }\n\n  previous() {\n    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;\n    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;\n    this.showCalendar(this.currentMonth, this.currentYear);\n  }\n\n  jump() {\n    this.currentYear = parseInt(this.selectYear.value);\n    this.currentMonth = parseInt(this.selectMonth.value);\n    this.showCalendar(this.currentMonth, this.currentYear);\n  }\n\n  showCalendar(month, year) {\n    let firstDay = (new Date(year, month)).getDay();\n    let daysInMonth = 32 - new Date(year, month, 32).getDate();\n\n    let tbl = document.getElementById(\"calendar-body\");\n\n    // clearing all previous cells\n    tbl.innerHTML = \"\";\n\n    // filing data about month and in the page via DOM.\n    this.monthAndYear.innerHTML = this.months[month] + \" \" + year;\n    this.selectYear.value = year;\n    this.selectMonth.value = month;\n\n    // creating all cells\n    let date = 1;\n    for (let i = 0; i < 6; i++) {\n      // creates a table row\n      let row = document.createElement(\"tr\");\n\n      // creating individual cells, filing them up with data.\n      for (let j = 0; j < 7; j++) {\n        // empty cells  \n        if (i === 0 && j < firstDay) {\n          let cell = document.createElement(\"td\");\n          let cellText = document.createTextNode(\"\");\n          cell.appendChild(cellText);\n          row.appendChild(cell);\n        } else if (date > daysInMonth) {\n          break;\n        } else {\n          // cells with numbers\n          let cell = document.createElement(\"td\");\n          let cellText = document.createTextNode(date);\n\n            if (date === this.today.getDay()) { \n                cell.classList.add(\"today-cell\");\n\n            }\n          cell.classList.add(\"day-cell\");\n\n          cell.addEventListener('click', event => console.log(event));\n          if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {\n            cell.classList.add(\"bg-info\");\n          } // color today's date\n\n          cell.appendChild(cellText);\n          row.appendChild(cell);\n          date++;\n        }\n      }\n      tbl.appendChild(row); // appending each row into calendar body.\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/js/calendar.js?");

/***/ }),

/***/ "./src/js/todo-list.js":
/*!*****************************!*\
  !*** ./src/js/todo-list.js ***!
  \*****************************/
/*! exports provided: TodoList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoList\", function() { return TodoList; });\nclass TodoList {\n  constructor(serverURL = 'http://localhost:3000') {\n    this.serverURL = serverURL;\n    this.updateTodoList();\n\n    document\n      .getElementById('add-btn')\n      .addEventListener('click', () => {\n        this.addTodo();\n      });\n\n  }\n\n  getTodos() {\n    const url = this.serverURL + '/todos?';\n\n    return fetch(url)\n      .then(function(response) {\n        return response.json();\n      })\n      .then(function(myJson) {\n        return myJson;\n      });\n  }\n\n  addTodo() {\n    const url = this.serverURL + '/todos';\n    let taskTitle = document.getElementById('add-task').value;\n\n    if (taskTitle === '') {\n      console.error(\n        \"TODO input can't be empty, please add some description\"\n      );\n    } else {\n      fetch(url, {\n          method: 'POST',\n          body: JSON.stringify({\n            title: taskTitle\n          }), // data can be `string` or {object}!\n          headers: {\n            'Content-Type': 'application/json'\n          }\n        })\n        .then(res => res.json())\n        .then(response => {\n          console.log('Success:', JSON.stringify(response));\n          this.updateTodoList();\n        })\n        .catch(error => console.error('Error:', error));\n    }\n  }\n\n  deleteTodo(itemId) {\n    const url = this.serverURL + '/todos/' + itemId;\n\n    fetch(url, {\n        method: 'DELETE',\n        headers: {\n          'Content-Type': 'application/json'\n        }\n      })\n      .then(res => res.json())\n      .then(response => {\n        console.log('Success:', JSON.stringify(response));\n        this.updateTodoList();\n      })\n      .catch(error => console.error('Error:', error));\n  }\n\n\n  async updateTodoList() {\n    let todos;\n\n    try {\n      todos = await this.getTodos();\n    } catch (e) {\n      console.error(e);\n    }\n\n    let todosEl = document.getElementById('todos');\n    todosEl.innerHTML = '';\n\n    todos.forEach(todo => {\n      const todoEl = document.createElement('li');\n      const todoCheckbox = document.createElement('input');\n      const todoDeleteBtn = document.createElement('button');\n\n      todoCheckbox.type = 'checkbox';\n      todoCheckbox.className = 'todo-checkbox';\n\n      todoDeleteBtn.innerHTML = 'Delete';\n      todoDeleteBtn.id = 'del-btn-' + todo.id;\n      todoDeleteBtn.className = 'delete-button';\n\n\n\n      todoEl.appendChild(todoCheckbox);\n      todoEl.appendChild(document.createTextNode(`${todo.title}`));\n      todoEl.appendChild(todoDeleteBtn);\n\n      todosEl.appendChild(todoEl);\n    });\n\n    let delBtns = Array.from(document.getElementsByClassName(\"delete-button\"));\n\n    delBtns.map(btn => btn.addEventListener('click', (event) => {\n\n      try {\n        const itemId = event.target.id.split(\"-\").pop(); // del-btn-10\n        this.deleteTodo(itemId);\n      } catch (e) {\n        console.error(e);\n      }\n\n    }));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/js/todo-list.js?");

/***/ })

/******/ });