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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_Calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/Calendar */ \"./src/js/Calendar.js\");\n/* harmony import */ var _js_TodoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/TodoList */ \"./src/js/TodoList.js\");\n/* harmony import */ var _js_Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/Application */ \"./src/js/Application.js\");\n\n\n\n\nconst serverURL = 'http://localhost:3000';\n\nconst todoList = new _js_TodoList__WEBPACK_IMPORTED_MODULE_1__[\"default\"](serverURL);\nconst myCalendar = new _js_Calendar__WEBPACK_IMPORTED_MODULE_0__[\"default\"](todoList);\n\nconst application = new _js_Application__WEBPACK_IMPORTED_MODULE_2__[\"default\"](todoList, myCalendar);\n\nwindow.myCalendar = myCalendar;\nwindow.todoList = todoList;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/ApiService.js":
/*!******************************!*\
  !*** ./src/js/ApiService.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ApiService; });\nclass ApiService {\n  static async getRequest(URL_TO_FETCH) {\n    return (await fetch(URL_TO_FETCH)).json();\n  }\n\n  static async postRequest(URL_TO_FETCH, requestBody) {\n    const response = await (await fetch(URL_TO_FETCH, {\n      method: 'POST',\n      body: JSON.stringify(requestBody),\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    })).json();\n    return response;\n  }\n\n  static async deleteRequest(URL_TO_FETCH) {\n    const response = await (await fetch(URL_TO_FETCH, {\n      method: 'DELETE',\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    })).json();\n    return response;\n  }\n\n  static async patchRequest(URL_TO_FETCH, requestBody) {\n    const response = await (await fetch(URL_TO_FETCH, {\n      method: 'PATCH',\n      body: JSON.stringify(requestBody),\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    })).json();\n    return response;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/ApiService.js?");

/***/ }),

/***/ "./src/js/Application.js":
/*!*******************************!*\
  !*** ./src/js/Application.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Application; });\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoList */ \"./src/js/TodoList.js\");\n/* harmony import */ var _Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Calendar */ \"./src/js/Calendar.js\");\n\n\n\nclass Application {\n  constructor(todoList = new _TodoList__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), calendar = new _Calendar__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()) {\n    this.todoList = todoList;\n    this.calendar = calendar;\n\n    document.addEventListener('onSelectDateEvent', event => {\n      this.handleSelectDateEvent(event);\n    });\n\n    document.addEventListener('onResetDateEvent', () => {\n      this.handleResetDateEvent();\n    });\n    // const data = JSON.parse(localStorage.getItem('tasks'));\n  }\n\n  handleSelectDateEvent(event) {\n    this.todoList.selectedDate = event.detail.date;\n    this.todoList.updateTodoList(event.detail.date);\n  }\n\n  handleResetDateEvent() {\n    this.todoList.selectedDate = '';\n    this.todoList.updateTodoList();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/Application.js?");

/***/ }),

/***/ "./src/js/Calendar.js":
/*!****************************!*\
  !*** ./src/js/Calendar.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Calendar; });\nclass Calendar {\n  constructor() {\n    this.today = new Date();\n    this.currentMonth = this.today.getMonth();\n    this.currentYear = this.today.getFullYear();\n    this.selectYear = document.getElementById('year');\n    this.selectMonth = document.getElementById('month');\n    this.selectedDate = this.today;\n    this.selectedCellId = '';\n\n    this.onSelectDate = date => {\n      const onSelectDateEvent = Calendar.createDateUpdateEvent('onSelectDateEvent', date);\n      document.getElementById('app').dispatchEvent(onSelectDateEvent);\n    };\n\n    this.onResetDate = () => {\n      const date = '';\n      const onResetDateEvent = Calendar.createDateUpdateEvent('onResetDateEvent', date);\n      document.getElementById('app').dispatchEvent(onResetDateEvent);\n    };\n\n    this.months = [\n      'Jan',\n      'Feb',\n      'Mar',\n      'Apr',\n      'May',\n      'Jun',\n      'Jul',\n      'Aug',\n      'Sep',\n      'Oct',\n      'Nov',\n      'Dec'\n    ];\n    this.monthAndYear = document.getElementById('monthAndYear');\n\n    document.getElementById('reset-date').addEventListener('click', () => {\n      this.updateShownDate();\n      this.onResetDate();\n    });\n\n    this.showCalendar(this.currentMonth, this.currentYear);\n    this.updateShownDate();\n  }\n\n  next() {\n    this.onSelectDate();\n    this.currentYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;\n    this.currentMonth = (this.currentMonth + 1) % 12;\n    this.showCalendar(this.currentMonth, this.currentYear);\n  }\n\n  previous() {\n    this.currentYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;\n    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;\n    this.showCalendar(this.currentMonth, this.currentYear);\n  }\n\n  jump() {\n    this.currentYear = parseInt(this.selectYear.value, 10);\n    this.currentMonth = parseInt(this.selectMonth.value, 10);\n    this.showCalendar(this.currentMonth, this.currentYear);\n  }\n\n  updateShownDate(date = '') {\n    let innerText = '';\n    if (date === '') {\n      innerText = 'All tasks: ';\n      if (this.selectedCellId)\n        document.getElementById(this.selectedCellId).classList.remove('selected-cell');\n      this.selectedCellId = '';\n    } else {\n      const dateArr = date.split('-'); // 2018-11-9 -> [2018, 11, 9]\n      const newDate = `${this.months[dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`; // Dec 9, 2018\n      innerText = `Tasks for ${newDate}`;\n      this.selectedDate = date;\n      this.onSelectDate(date);\n    }\n    document.getElementById('today-date').innerText = innerText;\n  }\n\n  showCalendar(month, year) {\n    const firstDay = new Date(year, month).getDay();\n    const daysInMonth = 32 - new Date(year, month, 32).getDate();\n\n    const tbl = document.getElementById('calendar-body');\n\n    // clearing all previous cells\n    tbl.innerHTML = '';\n\n    // filing data about month and in the page via DOM.\n    this.monthAndYear.innerHTML = `${this.months[month]} ${year}`;\n    this.selectYear.value = year;\n    this.selectMonth.value = month;\n\n    // creating all cells\n    let date = 1;\n    for (let i = 0; i < 6; i += 1) {\n      // creates a table row\n      const row = document.createElement('tr');\n\n      // creating individual cells, filing them up with data.\n      for (let j = 0; j < 7; j += 1) {\n        // empty cells\n        if (i === 0 && j < firstDay) {\n          const cell = document.createElement('td');\n          const cellText = document.createTextNode('');\n          cell.appendChild(cellText);\n          row.appendChild(cell);\n        } else if (date > daysInMonth) {\n          break;\n        } else {\n          // cells with numbers\n          const cell = document.createElement('td');\n          const cellText = document.createTextNode(date);\n          cell.id = `${year}-${month + 1}-${date}`;\n\n          if (date === this.today.getDay()) {\n            cell.classList.add('today-cell');\n          }\n          cell.classList.add('day-cell');\n\n          cell.addEventListener('click', event => {\n            const filterByDate = event.target.id;\n\n            if (this.selectedCellId)\n              document.getElementById(this.selectedCellId).classList.remove('selected-cell');\n\n            cell.classList.add('selected-cell');\n            this.selectedCellId = event.target.id;\n\n            this.updateShownDate(filterByDate);\n            this.onSelectDate(filterByDate);\n          });\n          if (\n            date === this.today.getDate() &&\n            year === this.today.getFullYear() &&\n            month === this.today.getMonth()\n          ) {\n            cell.classList.add('bg-info');\n          } // color today's date\n\n          cell.appendChild(cellText);\n          row.appendChild(cell);\n          date += 1;\n        }\n      }\n      tbl.appendChild(row); // appending each row into calendar body.\n    }\n  }\n\n  static createDateUpdateEvent(eventName, dateToUpdate) {\n    return new CustomEvent(eventName, {\n      detail: {\n        message: 'onSelectDateEvent',\n        time: new Date(),\n        date: dateToUpdate\n      },\n      bubbles: true,\n      cancelable: true\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/Calendar.js?");

/***/ }),

/***/ "./src/js/TodoList.js":
/*!****************************!*\
  !*** ./src/js/TodoList.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TodoList; });\n/* harmony import */ var _ApiService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiService */ \"./src/js/ApiService.js\");\n\n\nclass TodoList {\n  constructor (serverURL = 'http://localhost:3000') {\n    this.serverURL = serverURL;\n    this.todosURL = `${serverURL}/todos/`;\n    this.selectedDate = '';\n    this.tasks = JSON.parse(localStorage.getItem('tasks'));\n    if (this.tasks) {\n      this.updateTodoList();\n    } else this.tasks = [];\n\n    document.getElementById('add-btn').addEventListener('click', () => {\n      if (this.selectedDate) this.addTodo(this.selectedDate);\n      else this.addTodo();\n    });\n\n    document.getElementById('add-task').addEventListener('keydown', event => {\n      if (event.code === 'Enter') {\n        if (this.selectedDate) this.addTodo(this.selectedDate);\n        else this.addTodo();\n      }\n    });\n\n    document.getElementById('todo-list');\n  }\n\n  async getTodos() {\n    const url =\n      this.serverURL + (this.selectedDate === '' ? `/todos` : `/todos/?when=${this.selectedDate}`);\n    const todosResp = await _ApiService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getRequest(url);\n    return todosResp;\n  }\n\n  async addTodo(date = '2019-1-30') {\n    const taskTitle = document.getElementById('add-task').value;\n\n    if (taskTitle === '') {\n      alert(\"TODO input can't be empty, please add some description\"); // eslint-disable-line no-alert\n      // Clear the input\n      document.getElementById('add-task').value = '';\n      return;\n    }\n\n    const newTask = {\n      uniqueId: TodoList.getUniqueID(),\n      title: taskTitle,\n      status: 'active',\n      when: date\n    };\n\n    this.tasks.push(newTask);\n    localStorage.setItem('tasks', JSON.stringify(this.tasks));\n    // await ApiService.postRequest(this.todosURL, requestBody);\n\n    this.updateTodoList(date);\n\n    // Clear the input\n    document.getElementById('add-task').value = '';\n  }\n\n  async deleteTodo(itemId) {\n    // const url = `${this.todosURL}${itemId}`;\n    // await ApiService.deleteRequest(url);\n    this.tasks = this.tasks.filter(task => task.uniqueId !== itemId);\n    localStorage.setItem('tasks', JSON.stringify(this.tasks));\n    this.updateTodoList();\n  }\n\n  async updateTodoStatus(itemId, status) {\n    // const url = `${this.todosURL}${itemId}`;\n    const statusString = status ? 'completed' : 'active';\n\n    // const requestBody = {\n    //   status: statusString\n    // };\n\n    // await ApiService.patchRequest(url, requestBody);\n    let taskToEdit = this.tasks.filter(task => task.uniqueId === itemId);\n    this.tasks = this.tasks.filter(task => task.uniqueId !== itemId);\n    console.log(taskToEdit);\n    taskToEdit[0].status = statusString;\n    this.tasks.push(taskToEdit[0]);\n\n    localStorage.setItem('tasks', JSON.stringify(this.tasks));\n\n    this.updateTodoList(this.selectedDate);\n  }\n\n  async updateTodoList(filterDate = '') {\n    // try {\n    //   todos = await this.getTodos(filterDate);\n    // } catch (e) {\n    //   console.error(e); // eslint-disable-line no-console\n    // }\n\n    let todos = JSON.parse(localStorage.getItem('tasks'));\n    if (this.selectedDate !== '' && todos) {\n      todos = todos.filter(todo => todo.when === this.selectedDate);\n    }\n\n    const todosEl = document.getElementById('todos');\n    const completedEl = document.getElementById('completed');\n    todosEl.innerHTML = '';\n    completedEl.innerHTML = '';\n\n    todos.forEach(todo => {\n      const todoEl = document.createElement('li');\n      const todoCheckbox = document.createElement('input');\n      const todoDeleteBtn = document.createElement('button');\n      const todoDate = document.createElement('p');\n\n      todoCheckbox.type = 'checkbox';\n      todoCheckbox.id = `checkbox-${todo.uniqueId}`;\n      todoCheckbox.className = 'todo-checkbox';\n\n      todoDeleteBtn.innerHTML = 'Delete';\n      todoDeleteBtn.id = `del-btn-${todo.uniqueId}`;\n      todoDeleteBtn.className = 'delete-button';\n\n      todoDate.innerHTML = todo.when;\n      todoDate.className = 'todo-when';\n\n      todoEl.appendChild(todoCheckbox);\n      todoEl.appendChild(document.createTextNode(`${todo.title}`));\n      todoEl.appendChild(todoDate);\n      todoEl.appendChild(todoDeleteBtn);\n\n      if (todo.status === 'active') {\n        todosEl.appendChild(todoEl);\n      } else {\n        todoCheckbox.checked = true;\n        todoEl.classList.add('todo__completed');\n        completedEl.appendChild(todoEl);\n      }\n    });\n\n    const delBtns = Array.from(document.getElementsByClassName('delete-button'));\n\n    delBtns.map(btn =>\n      btn.addEventListener('click', event => {\n        try {\n          const itemId = event.target.id.split('-').pop(); // del-btn-10\n          this.deleteTodo(itemId);\n        } catch (e) {\n          console.error(e); // eslint-disable-line no-console\n        }\n      })\n    );\n\n    const checkboxes = Array.from(document.getElementsByClassName('todo-checkbox'));\n\n    checkboxes.map(btn =>\n      btn.addEventListener('change', event => {\n        try {\n          console.log(event); // eslint-disable-line no-console\n          const itemId = event.target.id.split('-').pop(); // checkbox-10\n          const checkboxStatus = event.target.checked;\n          this.updateTodoStatus(itemId, checkboxStatus);\n          this.updateTodoList();\n        } catch (e) {\n          console.error(e); // eslint-disable-line no-console\n        }\n      })\n    );\n  }\n\n  static getUniqueID() {\n    // Math.random should be unique because of its seeding algorithm.\n    // Convert it to base 36 (numbers + letters), and grab the first 9 characters\n    // after the decimal.\n    return '_' + Math.random().toString(36).substr(2, 9);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/TodoList.js?");

/***/ })

/******/ });