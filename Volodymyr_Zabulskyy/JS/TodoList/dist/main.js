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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Calendar.js":
/*!****************************!*\
  !*** ./src/js/Calendar.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _DataBaseHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataBaseHandler */ \"./src/js/DataBaseHandler.js\");\n\n\n\nconst months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\",\n    \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\n\nclass Calendar {\n    constructor(container, todoList, dbUrl) {\n        this.container = container;\n        this.todoList = todoList;\n        this.htmlElem = document.createElement('div');\n        this.container.appendChild(this.htmlElem);\n        this.today = new Date();\n        this.year = this.today.getFullYear();\n        this.month = this.today.getMonth();\n        this.date = this.today.getDate();\n        this.day = this.today.getDay();\n        this.hidden = false;\n\n        this.dbHandler = new _DataBaseHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n            dbUrl === undefined ? \"http://localhost:3000/todoList\" : dbUrl\n        );\n\n        this.render();\n    }\n\n    render() {\n        let content = document.createElement('div');\n        this.header = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<header class=\"calendar-header\"></header>`);\n        this.monthYear = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<span class=\"calendar-header__month-year\">\n            ${months[this.month]} ${this.year}\n        </span>`);\n        this.goTodayBtn = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<button class=\"calendar__btn calendar__btn_go-today\">Go Today</button>`);\n        this.goTodayBtn.addEventListener('click', () => {\n            this.setNewDate(new Date())\n        });\n        this.hideBtn = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<button class=\"calendar__btn calendar__btn_hide-calendar\">_</button>`);\n        this.hideBtn.addEventListener('click', () => {\n            this.toggleHide()\n        });\n\n        this.shiftRightBtn = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<button class=\"calendar__btn calendar__btn_shift-right\">></button>`);\n        this.shiftRightBtn.addEventListener('click', () => {\n            this.nextMonth();\n            this.render();\n        });\n        this.shiftLeftBtn = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<button class=\"calendar__btn calendar__btn_shift-left\"><</button>`);\n        this.shiftLeftBtn.addEventListener('click', () => {\n            this.prevMonth();\n            this.render();\n        });\n\n        this.header.appendChild(this.monthYear);\n        this.header.appendChild(this.hideBtn);\n        this.header.appendChild(this.shiftRightBtn);\n        this.header.appendChild(this.shiftLeftBtn);\n        this.header.appendChild(this.goTodayBtn);\n        content.appendChild(this.header);\n\n        if (!this.hidden) {\n            this.subheader = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<div class=\"calendar-subheader\"></div>`);\n            const weeks = ['M', 'T', \"W\", \"T\", \"F\", \"S\", \"S\"];\n            for (let week in weeks) {\n                this.subheader.appendChild(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<span>${weeks[week]}</span>`))\n            }\n            content.appendChild(this.subheader);\n            this.calendarBody = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"createElementFromHTML\"])(`<div class=\"calendar_table\" id=\"calendar\"></div>`);\n            this.getThisMonthCalendar(this.calendarBody);\n            content.appendChild(this.calendarBody);\n        }\n        this.container.replaceChild(content, this.htmlElem);\n        this.htmlElem = content;\n        // this.htmlElem = content;\n        // this.container.appendChild(this.htmlElem);\n\n    }\n\n    getTasksForDate(date, callback){\n        this.dbHandler.getAllTodos((dataFromResponce) => {\n            let jsonData = JSON.parse(dataFromResponce);\n            let result = [];\n            for(let i in jsonData){\n                if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"compareDayMonthYear\"])(new Date(jsonData[i].date), date)){\n                    result.push(jsonData[i])\n                }\n            }\n            callback(result);\n        })\n    }\n\n    setNewDate(date) {\n        this.today = date;\n        this.year = this.today.getFullYear();\n        this.month = this.today.getMonth();\n        this.date = this.today.getDate();\n        this.day = this.today.getDay();\n        this.todoList.currentFilter = 'date';\n        this.todoList.render();\n        this.render();\n    }\n\n    toggleHide() {\n        this.hidden = !this.hidden;\n        this.calendarBody.style.display = this.hidden ? 'none' : '';\n        this.subheader.style.display = this.hidden ? 'none' : '';\n        this.goTodayBtn.style.display = this.hidden ? 'none' : '';\n        this.shiftRightBtn.style.display = this.hidden ? 'none' : '';\n        this.shiftLeftBtn.style.display = this.hidden ? 'none' : '';\n\n    }\n\n    nextMonth() {\n        this.month = this.month + 1;\n        if (this.month === 12) {\n            this.month = 0;\n            this.year += 1;\n        }\n    }\n\n    prevMonth() {\n        this.month -= 1;\n        if (this.month === -1) {\n            this.month = 11;\n            this.year -= 1;\n        }\n    }\n\n    generateCellText(date){\n        let text = document.createElement('div');\n        let day = document.createElement('span');\n        day.innerText = date.getDate();\n        text.appendChild(day);\n\n        this.getTasksForDate(date, (r)=>{\n            if (r.length > 0){\n                let tasks = document.createElement('span');\n                tasks.setAttribute('class', \"calendar_table__cell__date-badge\")\n                tasks.innerText = r.length;\n                text.appendChild(tasks);\n            }\n        });\n\n        return text;\n\n    }\n\n    getThisMonthCalendar() {\n        let monthTable = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"generateMonth\"])(this.month, this.year);\n        for (let i in monthTable) {\n            let row = document.createElement('div');\n            row.setAttribute('class', 'calendar_table__row');\n            for (let j in monthTable[i]) {\n                let cell = document.createElement('div');\n                cell.setAttribute('class', 'calendar_table__cell');\n                if (monthTable[i][j] === -1) {\n                    cell.innerText = \"\";\n                    cell.setAttribute('class', 'calendar_table__cell calendar_table__cell_empty');\n                } else {\n                    let cellText = this.generateCellText(monthTable[i][j]);\n                    cell.appendChild(cellText);\n                    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"compareDayMonthYear\"])(monthTable[i][j], this.today)) {\n                        cell.setAttribute('class', 'calendar_table__cell calendar_table__cell_active');\n                    }\n                    cell.addEventListener('click', () => {\n                        this.setNewDate(monthTable[i][j])\n                    })\n                }\n                row.appendChild(cell);\n            }\n            this.calendarBody.appendChild(row)\n        }\n    }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Calendar);\n\n//# sourceURL=webpack:///./src/js/Calendar.js?");

/***/ }),

/***/ "./src/js/DataBaseHandler.js":
/*!***********************************!*\
  !*** ./src/js/DataBaseHandler.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HTTPRequestHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTTPRequestHandler */ \"./src/js/HTTPRequestHandler.js\");\n\n\nclass DataBaseHandler {\n    constructor(url) {\n        this.url = url;\n        this.reqHandler = new _HTTPRequestHandler__WEBPACK_IMPORTED_MODULE_0__[\"default\"](url);\n    }\n\n    validate(data){\n        if (data instanceof String){\n            data = JSON.parse(data);\n        }\n        if (data.done === undefined){\n            data.done = false;\n        }\n        if (data.text === undefined){\n            console.error(`invalid data ${data}: text is not present`)\n        }\n        return JSON.stringify(data);\n    }\n\n    getAllTodos(callback){\n        return this.reqHandler.get()\n            .then(data => {\n                if (callback !== undefined)\n                    callback(data);\n            })\n            .catch(err => {\n                console.error(err);\n            });\n    }\n\n    getTodoById(id, callback){\n        return this.reqHandler.getById(id)\n            .then(data => {\n                if (callback !== undefined)\n                    callback(data);\n            })\n            .catch(err => {\n                console.error(err);\n            });\n    }\n\n    removeTodoById(id, callback){\n        return this.reqHandler.delete(id)\n            .then(data => {\n                if (callback !== undefined)\n                    callback(data);\n            })\n            .catch(err => {\n                console.error(err);\n            })\n    }\n\n    replaceTodoById(id, jsonData, callback){\n        jsonData = this.validate(jsonData);\n        return this.reqHandler.put(id, jsonData)\n            .then(data => {\n                if (callback !== undefined)\n                    callback(data);\n            })\n            .catch(err => {\n                console.error(err);\n            })\n    }\n\n    addTodo(jsonData, callback){\n        jsonData = this.validate(jsonData);\n        return this.reqHandler.post(jsonData)\n            .then(data => {\n                if (callback !== undefined)\n                    callback(data);\n            })\n            .catch(err => {\n                console.error(err);\n            });\n    }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataBaseHandler);\n\n\n//# sourceURL=webpack:///./src/js/DataBaseHandler.js?");

/***/ }),

/***/ "./src/js/HTTPRequestHandler.js":
/*!**************************************!*\
  !*** ./src/js/HTTPRequestHandler.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var xmlhttprequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xmlhttprequest */ \"xmlhttprequest\");\n/* harmony import */ var xmlhttprequest__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xmlhttprequest__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass HTTPRequestHandler {\n    constructor(url) {\n        this.url = url;\n    }\n\n\n    get() {\n        return new Promise((resolve, reject) => {\n            let request = new xmlhttprequest__WEBPACK_IMPORTED_MODULE_0__[\"XMLHttpRequest\"]();\n            request.onload = () => {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText)\n                }\n            };\n            request.onerror = reject;\n            request.open(\"GET\", this.url, true); // true for asynchronous\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send(null);\n        })\n    }\n\n    getById(id){\n        return new Promise((resolve, reject) => {\n            let request = new xmlhttprequest__WEBPACK_IMPORTED_MODULE_0__[\"XMLHttpRequest\"]();\n            id = id.toString();\n            request.onload = () => {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText)\n                }\n            };\n            request.onerror = reject;\n            request.open(\"GET\", this.url + '/' + id, true); // true for asynchronous\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send(null);\n        })\n    }\n\n    post(data) {\n        return new Promise((resolve, reject) => {\n            let request = new xmlhttprequest__WEBPACK_IMPORTED_MODULE_0__[\"XMLHttpRequest\"]();\n            request.onload = () => {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText);\n                }\n            };\n            request.onerror = reject;\n            request.open(\"POST\", this.url, true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send(data);\n        })\n    }\n\n    put(id, data) {\n        return new Promise((resolve, reject) => {\n            id = id.toString();\n            let request = new xmlhttprequest__WEBPACK_IMPORTED_MODULE_0__[\"XMLHttpRequest\"]();\n            request.onload = () => {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText)\n                }\n            };\n            request.onerror = reject;\n            request.open(\"PUT\", this.url + '/' + id, true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send(data);\n        })\n    }\n\n    delete(id) {\n        return new Promise((resolve, reject) => {\n            id = id.toString();\n            let request = new xmlhttprequest__WEBPACK_IMPORTED_MODULE_0__[\"XMLHttpRequest\"]();\n            request.onload = () => {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText)\n                }\n            };\n            request.onerror = reject;\n            request.open(\"DELETE\", this.url + '/' + id, true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send();\n        })\n\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HTTPRequestHandler);\n\n//# sourceURL=webpack:///./src/js/HTTPRequestHandler.js?");

/***/ }),

/***/ "./src/js/TodoItem.js":
/*!****************************!*\
  !*** ./src/js/TodoItem.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nclass TodoItem {\n    constructor(jsonData, parent) {\n        this.parent = parent;\n        this.id = jsonData.id;\n        this.text = jsonData.text;\n        this.date = jsonData.date === undefined ? new Date() : new Date(jsonData.date);\n        this.done = jsonData.done === undefined ? false : jsonData.done;\n\n        this.htmlElem = document.createElement('li');\n        this.content = document.createElement('div');\n        this.htmlElem.appendChild(this.content);\n        this.render();\n    }\n\n    remove() {\n        this.parent.removeTodo(this);\n    }\n\n    toggleDone() {\n        this.parent.replaceTodo(this, {\n            text: this.text,\n            date: this.date,\n            done: !this.done,\n        });\n        this.render();\n    }\n\n    changeData(jsonData) {\n        this.text = jsonData.text;\n        this.date = jsonData.date === undefined ? new Date() : new Date(jsonData.date);\n        this.done = jsonData.done === undefined ? false : jsonData.done;\n        this.render()\n    }\n\n    parseDate(d) {\n        const today = new Date();\n        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"compareDayMonthYear\"])(d, today))\n            return 'today';\n        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear().toString()[2] + d.getFullYear().toString()[3]\n    }\n\n    addDate() {\n        let date = document.createElement('span');\n        date.innerText = this.parseDate(this.date);\n        date.setAttribute('class', \"task__timestamp\");\n        return date;\n    }\n\n    addRemoveBtn() {\n        let removeBtn = document.createElement('button');\n        removeBtn.innerText = 'x';\n        removeBtn.setAttribute('class', 'task__delete-button');\n        removeBtn.onclick = () => {\n            this.remove()\n        };\n        return removeBtn;\n    }\n\n    addCheckBox() {\n        let checkBtn = document.createElement('input');\n        checkBtn.setAttribute('type', 'checkbox');\n        checkBtn.addEventListener('click', () => {this.toggleDone()});\n        checkBtn.checked = this.done;\n        return checkBtn;\n    }\n\n    addText(text) {\n        let textElem = document.createElement('span');\n        textElem.innerText = text;\n        textElem.setAttribute('class', 'task__text');\n        textElem.addEventListener('click', () => {\n            this.toggleDone()\n        });\n        this.innerText = textElem;\n        return textElem;\n    }\n\n    render() {\n        let content = document.createElement('div');\n        content.setAttribute('class', 'task');\n        content.appendChild(this.addCheckBox());\n        content.appendChild(this.addText(this.text));\n        content.appendChild(this.addDate());\n        content.appendChild(this.addRemoveBtn());\n        this.innerText.style.textDecoration = this.done ? \"line-through\" : \"\";\n\n        this.htmlElem.removeChild(this.content);\n        this.content = content;\n        this.htmlElem.appendChild(this.content);\n\n        return this.htmlElem;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoItem);\n\n//# sourceURL=webpack:///./src/js/TodoItem.js?");

/***/ }),

/***/ "./src/js/TodoList.js":
/*!****************************!*\
  !*** ./src/js/TodoList.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoItem */ \"./src/js/TodoItem.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _DataBaseHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataBaseHandler */ \"./src/js/DataBaseHandler.js\");\n\n\n\n\nclass TodoList {\n    constructor(container, form, input, calendar, dbUrl) {\n        this.dbHandler = new _DataBaseHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\n            dbUrl === undefined ? \"http://localhost:3000/todoList\" : dbUrl\n        );\n        this.form = form;\n        this.inputForm = input;\n        this.calendar = calendar;\n        this.form.addEventListener('submit', (e) => {\n            e.preventDefault();\n            const text = this.inputForm.value;\n            if (!/\\S/.test(text)) return;\n            this.addTodoToDB({text:text, date:calendar.today, done:false});\n            this.inputForm.value = \"\";\n        });\n\n        this.todoItems = [];\n        this.getTodoItemsFromDB();\n\n        this.container = container;\n        this.htmlElem = document.createElement('ul');\n        this.htmlElem.setAttribute('class', 'tasks-container');\n        this.container.appendChild(this.htmlElem);\n\n        this.currentFilter = 'all';\n        this.filters = {\n            'all': (elem) => true,\n            'done': (elem) => elem.done,\n            'active': (elem) => !elem.done,\n            'date': (elem) => Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"compareDayMonthYear\"])(this.calendar.today, elem.date)\n        };\n        this.removeFilters = {\n            'done': (elem) => elem.done\n        };\n        this.render();\n    }\n\n    render() {\n        let content = document.createElement('ul');\n        content.setAttribute('class', 'tasks-container');\n        for (let elem in this.todoItems) {\n            if (this.filters[this.currentFilter](this.todoItems[elem])) {\n                content.appendChild(this.todoItems[elem].render());\n            }\n        }\n        this.container.removeChild(this.htmlElem);\n        this.htmlElem = content;\n        this.container.appendChild(this.htmlElem);\n    }\n\n    getTodoItemsFromDB(){\n        this.dbHandler.getAllTodos((dataFromResponce) => {\n            let jsonData = JSON.parse(dataFromResponce);\n            for(let i in jsonData){\n                this.addTodo(jsonData[i])\n            }\n        })\n    }\n\n\n    addBtnFilter(btn, filterName, filter) {\n        if (filter !== undefined) {\n            this.filters[filterName] = filter;\n        }\n        btn.onclick = () => {\n            this.currentFilter = filterName;\n            this.render();\n        };\n    }\n\n    removeByFilter(filter) {\n        let toRemove = [];\n        for (let elem in this.todoItems) {\n            if (filter(this.todoItems[elem])) {\n                toRemove.push(this.todoItems[elem])\n            }\n        }\n\n        for (let elem in toRemove) {\n            this.removeTodo(toRemove[elem])\n        }\n        this.render();\n    }\n\n    addBtnRemoveByFilter(btn, filterName, filter) {\n        if (filter !== undefined) {\n            this.removeFilters[filterName] = filter;\n        }\n        btn.onclick = () => {\n            this.removeByFilter(this.removeFilters[filterName])\n        };\n    }\n\n\n    addTodoToDB(jsonData) {\n        this.dbHandler.addTodo(jsonData, (dataFromResponce) => {\n            this.addTodo(JSON.parse(dataFromResponce));\n        });\n    };\n\n    addTodo(jsonData){\n        let newItem = new _TodoItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"](jsonData, this);\n        this.todoItems.unshift(newItem);\n        this.htmlElem.insertBefore(newItem.htmlElem, this.htmlElem.firstChild);\n    }\n\n    removeTodoFromDB(jsonData) {\n        this.dbHandler.removeTodoById(jsonData.id, ()=>{})\n    }\n\n    removeTodo(item) {\n        this.removeTodoFromDB(item);\n        this.todoItems.splice(this.todoItems.indexOf(item), 1);\n        this.htmlElem.removeChild(item.htmlElem);\n    };\n\n    replaceTodo(item, jsonDataToReplace){\n        this.dbHandler.replaceTodoById(item.id, jsonDataToReplace, (dataFromResponce)=>{\n            item.changeData(JSON.parse(dataFromResponce));\n        });\n\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoList);\n\n//# sourceURL=webpack:///./src/js/TodoList.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoList */ \"./src/js/TodoList.js\");\n/* harmony import */ var _Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Calendar */ \"./src/js/Calendar.js\");\n/* harmony import */ var _DataBaseHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataBaseHandler */ \"./src/js/DataBaseHandler.js\");\n\n\n\n\n/*\n  [\n    {\n      \"text\": \"Pass Web Course\",\n      \"date\": \"28/12/18\",\n      \"done\": false,\n      \"id\": 1\n    },\n    {\n      \"text\": \"Shave Misha's Beard\",\n      \"date\": \"1/1/18\",\n      \"done\": false,\n      \"id\": 2\n    },\n    {\n      \"text\": \"Rest In Peace\",\n      \"date\": \"1/1/18\",\n      \"done\": false,\n      \"id\": 3\n    }\n  ]\n  */\n\nconst form = document.getElementById(\"newTaskForm\");\nconst input = document.getElementById(\"newTaskInput\");\n\nlet calendar = new _Calendar__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document.getElementById('calendarPlaceholder'));\nlet todoList = new _TodoList__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById('content'), form, input, calendar);\ncalendar.todoList = todoList;\n\ntodoList.addBtnFilter(document.getElementById('filter-all'), 'all');\ntodoList.addBtnFilter(document.getElementById('filter-done'), 'done');\ntodoList.addBtnFilter(document.getElementById('filter-active'), 'active');\n\ntodoList.addBtnRemoveByFilter(document.getElementById('clear-done'), 'done');\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: createElementFromHTML, generateMonth, compareDayMonthYear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElementFromHTML\", function() { return createElementFromHTML; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateMonth\", function() { return generateMonth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compareDayMonthYear\", function() { return compareDayMonthYear; });\nfunction createElementFromHTML(htmlString) {\n    let div = document.createElement('div');\n    div.innerHTML = htmlString.trim();\n    return div.firstChild;\n}\n\nfunction generateMonth(month, year) {\n    if (month < 0 || month > 11) {\n        alert(\"error\");\n        return;\n    }\n    let today = new Date();\n    year = (year === undefined) ? today.getFullYear() : year;\n    month = (month === undefined) ? today.getMonth() : month;\n    let firstDay = new Date(year + '-' + (month + 1) + '-' + 1);\n    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];\n    if (month === 1) {\n        daysInMonth += year % 4 ? 0 : 1;\n    }\n    let offset = firstDay.getDay();\n\n    let monthTable = [[]];\n    let currWeek = 0;\n\n    if (offset > 1) {\n        for (let i = 1; i < offset; i++) {\n            monthTable[currWeek].push(-1);\n        }\n    } else if (offset === 1){\n        monthTable[0] = [-1,-1,-1,-1,-1,-1,-1];\n    }\n    else {\n        for (let i = 1; i < 7; i++) {\n            monthTable[currWeek].push(-1);\n        }\n\n    }\n    while (offset - firstDay.getDay() !== daysInMonth) {\n        if ((offset - 1) % 7 === 0) {\n            currWeek++;\n            monthTable.push([]);\n        }\n        monthTable[currWeek].push(\n            new Date(year, month, offset - firstDay.getDay() + 1)\n        );\n        offset++;\n    }\n    while (monthTable[monthTable.length - 1].length !== 7) {\n        monthTable[monthTable.length - 1].push(-1);\n    }\n    while (monthTable.length < 6) {\n        monthTable.unshift([-1, -1, -1, -1, -1, -1, -1])\n    }\n    return monthTable;\n}\n\nfunction compareDayMonthYear(d1, d2) {\n    return d1.getDay() === d2.getDay() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate() && d1.getFullYear() === d2.getFullYear();\n}\n\n\n\n//# sourceURL=webpack:///./src/js/utils.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/styles/main.scss?");

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/main.js ./src/styles/main.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/main.js */\"./src/js/main.js\");\nmodule.exports = __webpack_require__(/*! ./src/styles/main.scss */\"./src/styles/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/js/main.js_./src/styles/main.scss?");

/***/ }),

/***/ "xmlhttprequest":
/*!**************************************************!*\
  !*** external "{XMLHttpRequest:XMLHttpRequest}" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {XMLHttpRequest:XMLHttpRequest};\n\n//# sourceURL=webpack:///external_%22%7BXMLHttpRequest:XMLHttpRequest%7D%22?");

/***/ })

/******/ });