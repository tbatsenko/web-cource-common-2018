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

/***/ "./src/Calendar.js":
/*!*************************!*\
  !*** ./src/Calendar.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Calendar; });\nlet weekdays = [\"Mo\", \"Tu\", \"We\", \"Th\", \"Fr\", \"Sa\", \"Su\"];\n\nclass Calendar {\n    constructor(container) {\n        this.container = container;\n        this.curr_date = new Date();\n        this.create();\n\n        // adding events\n        this.dayEvents = [];\n\n        this.container.addEventListener(\"click\", (e) => {\n            e.preventDefault();\n            if (e.target !== e.currentTarget) {\n                let clickedItem = e.target;\n                if (clickedItem.classList.contains(\"calendar--day\") &&\n                    !clickedItem.classList.contains(\"calendar--day__passive\")) {\n                        this.setDate(clickedItem.innerText);\n                        this.dayEvents.forEach(ev => ev());\n                }\n                else if (clickedItem.classList.contains(\"calendar--button\")) {\n                    this.incrementMonth(clickedItem.id === \"calendar--inc-month\" ? 1 : -1);\n                }\n                this.render();\n            }\n            e.stopPropagation();\n        })\n    }\n\n    addDayEvent(event) {\n        this.dayEvents.push(event);\n    }\n\n    incrementMonth(inc) {\n        this.curr_date.setMonth(this.curr_date.getMonth() + inc);\n    }\n    setDate(date) {\n        this.curr_date.setDate(date);\n    }\n    getFirstDay() {\n        return new Date(this.curr_date.getFullYear(), this.curr_date.getMonth(), 1).getDay();\n    }\n\n    render() {\n        this.renderHeader();\n        this.renderCalendarTable()\n    }\n\n    renderHeader() {\n        this.container.getElementsByClassName(\"calendar--month-name\")[0].innerText =\n            this.curr_date.toLocaleString(\"en-us\", {month: \"long\", year: \"numeric\"});\n    }\n\n    renderCalendarTable() {\n        let calendarTable = this.container.getElementsByClassName(\"calendar--main\")[0];\n\n        // weekdays\n        calendarTable.innerHTML = `\n            <div class=\"calendar--week-line\">\n                ${weekdays.map(weekday => `<p class=\"calendar--weekday\">${weekday}</p>`).join(\"\")}\n            </div>\n        `;\n\n        // dates\n        let first_day = this.getFirstDay();\n        for (let i = 0; i < 6; i++) {\n            let week = document.createElement(\"div\");\n            week.className = \"calendar--week-line\";\n\n            for (let j = 0; j < 7; j++) {\n                let date = new Date(this.curr_date.getFullYear(), this.curr_date.getMonth(), i * 7 + j - first_day + 2);\n                let button = document.createElement(\"button\");\n\n                button.classList.add(\"calendar--day\");\n                if (date.getMonth() !== this.curr_date.getMonth()) button.classList.add(\"calendar--day__passive\");\n                else if (date.getDate() === this.curr_date.getDate()) button.classList.add(\"calendar--day__active\");\n                button.innerText = date.getDate().toString();\n\n                week.appendChild(button);\n            }\n\n            calendarTable.appendChild(week);\n        }\n    }\n\n    create() {\n        this.createBaseElements();\n        this.renderHeader();\n        this.renderCalendarTable();\n    }\n\n    createBaseElements() {\n        this.container.innerHTML = `\n            <fieldset class=\"calendar--header\">\n                <button class=\"calendar--button\" id=\"calendar--dec-month\">&lt</button> <!--keyboard_arrow_up keyboard_arrow_down-->\n                <p class=\"calendar--month-name\"></p>\n                <button class=\"calendar--button\" id=\"calendar--inc-month\">&gt</button>\n            </fieldset>\n            <fieldset class=\"calendar--main\">\n            </fieldset>\n        `;\n    }\n}\n\n//# sourceURL=webpack:///./src/Calendar.js?");

/***/ }),

/***/ "./src/DataBase.js":
/*!*************************!*\
  !*** ./src/DataBase.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DataBase; });\nconst fetcher = __webpack_require__(/*! ./fetcher */ \"./src/fetcher.js\");\n\n\nclass DataBase {\n    constructor(url) {\n        this.url = url;\n    }\n\n    processSingleResponse(data) {\n        data.date = new Date(data.date);\n        return data;\n    }\n    processResponse(data) {\n        data.forEach(el => this.processSingleResponse(el));\n        return data;\n    }\n    dateToString(date) {\n        return date.toISOString().substring(0, 10);\n    }\n\n    async get(url) {\n        let resp = await fetcher.get(url);\n        return this.processResponse(resp);\n    }\n    async getAll(id) {\n        return await this.get(this.url);\n    }\n    async getById(id) {\n        return await this.get(this.url + \"/\" + id);\n    }\n    async getByDate(date) {\n        return await this.get(this.url + \"?\" + \"date=\" + this.dateToString(date));\n    }\n\n    async createFromJson(data) {\n        let resp =  await fetcher.post(this.url, data);\n        return this.processSingleResponse(resp);\n    }\n    async create(text, completed, date) {\n        return await this.createFromJson({text: text, completed: completed, date: this.dateToString(date)});\n    }\n}\n\n//# sourceURL=webpack:///./src/DataBase.js?");

/***/ }),

/***/ "./src/TodoItem.js":
/*!*************************!*\
  !*** ./src/TodoItem.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TodoItem; });\nclass TodoItem {\n    constructor(text, completed, todoList) {\n        this.text = text;\n        this.completed = completed;\n        this.container = this.render();\n\n        this.todoList = todoList;\n    }\n\n    render() {\n        let container = document.createElement(\"li\");\n        container.className = \"todo-list--item\";\n\n        container.appendChild(this.renderText());\n        container.appendChild(this.renderCheckBox());\n        container.appendChild(this.renderRemoveButton());\n\n        return container;\n    }\n\n    remove() {\n        this.todoList.removeTodo(this);\n    }\n    completeChecked() {\n        this.completed = !this.completed;\n        this.container.getElementsByClassName(\"todo-list--input-checkbox\")[0].checked = this.completed;\n    }\n\n    renderText() {\n        let container = document.createElement(\"span\");\n        container.className = \"todo-list--item-text\";\n        container.innerText = this.text;\n        return container;\n    }\n    renderCheckBox() {\n        let container = document.createElement(\"input\");\n        container.type = \"checkbox\";\n        container.className = \"todo-list--input-checkbox\";\n        container.checked = this.completed;\n\n        container.addEventListener(\"click\", (e) => {\n            // e.preventDefault();\n            this.completeChecked();\n            e.stopPropagation();\n        });\n        return container;\n    }\n    renderRemoveButton() {\n        let container = document.createElement(\"input\");\n        container.type = \"button\";\n        container.innerText = \"Remove\";\n\n        container.addEventListener(\"click\", (e) => {\n            e.preventDefault();\n            this.remove();\n            e.stopPropagation();\n        });\n        return container;\n    }\n}\n\n//# sourceURL=webpack:///./src/TodoItem.js?");

/***/ }),

/***/ "./src/TodoList.js":
/*!*************************!*\
  !*** ./src/TodoList.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TodoList; });\n/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoItem */ \"./src/TodoItem.js\");\n\n\nclass TodoList {\n    constructor(container) {\n        this.container = container;\n        this.create();\n\n        this.listContainer = this.container.getElementsByClassName(\"todo-list--list\")[0];\n        this.todoItems = [];\n    }\n\n    addTodo(text) {\n        let newItem = new _TodoItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"](text, false, this);\n        this.todoItems.unshift(newItem);\n        this.listContainer.insertBefore(newItem.container, this.listContainer.firstChild);\n    }\n    removeTodo(item) {\n        this.todoItems.splice(this.todoItems.indexOf(item), 1);\n        this.listContainer.removeChild(item.container);\n    }\n    setTodoList(newTodoList) {\n        this.todoItems = newTodoList;\n        this.render();\n    }\n\n    render() {\n        this.listContainer.innerHTML = ``;\n        this.todoItems.forEach(item => this.listContainer.appendChild(item.container));\n    }\n\n    create() {\n        this.container.innerHTML = `\n            <ul class=\"todo-list--list\" id=\"todo-list--list\"></ul>\n        `\n    }\n}\n\n//# sourceURL=webpack:///./src/TodoList.js?");

/***/ }),

/***/ "./src/fetcher.js":
/*!************************!*\
  !*** ./src/fetcher.js ***!
  \************************/
/*! exports provided: get, post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"post\", function() { return post; });\nconst get = (url)=> {\n    return fetch(url)\n        .then(resp => resp.json())\n};\n\nconst post = (url, data) => {\n    return fetch(url, {\n        headers: {\"content-type\": \"application/json; charset=UTF-8\"},\n        body: JSON.stringify(data),\n        method: \"POST\"\n    })\n        .then(resp => resp.json())\n};\n\n//# sourceURL=webpack:///./src/fetcher.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Calendar */ \"./src/Calendar.js\");\n/* harmony import */ var _DataBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataBase */ \"./src/DataBase.js\");\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoList */ \"./src/TodoList.js\");\n/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TodoItem */ \"./src/TodoItem.js\");\n\n\n\n\n\n\nconst url = \"http://localhost:3000/\";\n\nconst calendar = new _Calendar__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById(\"calendar\"));\nconst dataBase = new _DataBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"](url + \"todo\");\nconst todoList = new _TodoList__WEBPACK_IMPORTED_MODULE_2__[\"default\"](document.getElementById(\"todo-list\"));\n\ncalendar.addDayEvent(() => {\n    dataBase.getByDate(calendar.curr_date).then(data => {\n        let todoItems = data.map(el => new _TodoItem__WEBPACK_IMPORTED_MODULE_3__[\"default\"](el.text, el.completed, todoList));\n        todoList.setTodoList(todoItems);\n    })\n        .catch(e => {\n            console.log(e);\n        })\n});\n\n// dataBase.getAll().then(data => console.log(data));\n// dataBase.create(\"vasiko\", true, new Date()).then(data => console.log(data));\n// dataBase.getAll().then(data => console.log(data));\n// dataBase.create(\"asd\", false, new Date(2019, 11, 11)).then(data => console.log(data));\n// dataBase.getAll().then(data => console.log(data));\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });