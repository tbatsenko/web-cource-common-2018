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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/Calendar.js":
/*!************************!*\
  !*** ./js/Calendar.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Calendar = function Calendar(container, list) {\n    var _this = this;\n\n    _classCallCheck(this, Calendar);\n\n    this.addListener = function () {\n        _this.container.addEventListener(\"click\", function (e) {\n            e.preventDefault();\n            if (e.target !== e.currentTarget) {\n                var clickedItem = e.target;\n                if (clickedItem.classList.contains(\"calendar__item\") && !clickedItem.classList.contains(\"calendar__item--empty\") && !clickedItem.classList.contains(\"calendar__item--selected\") && !clickedItem.classList.contains(\"calendar__item--header\")) {\n                    _this.selected.setDate(clickedItem.innerText);\n                    _this.selected.setMonth(_this.month.getMonth());\n                    _this.selected.setFullYear(_this.month.getFullYear());\n                    _this.list.render();\n                    _this.render();\n                } else if (clickedItem.classList.contains(\"calendar__left-arrow\")) {\n                    _this.previous();\n                    _this.render();\n                } else if (clickedItem.classList.contains(\"calendar__right-arrow\")) {\n                    _this.next();\n                    _this.render();\n                }\n            }\n            e.stopPropagation();\n        });\n    };\n\n    this.next = function () {\n        _this.month.setMonth(_this.month.getMonth() + 1);\n    };\n\n    this.previous = function () {\n        _this.month.setMonth(_this.month.getMonth() - 1);\n    };\n\n    this.daysInMonth = function () {\n        return 32 - new Date(_this.month.getFullYear(), _this.month.getMonth(), 32).getDate();\n    };\n\n    this.getFirstDay = function (date) {\n        return new Date(date.getFullYear(), date.getMonth(), 2);\n    };\n\n    this.getFirstIndex = function () {\n        return (_this.month.getDay() + 5) % 7;\n    };\n\n    this.setDate = function (date) {\n        _this.now.setDate(date);\n    };\n\n    this.render = function () {\n        _this.renderHeader();\n        var amountOfDays = _this.daysInMonth();\n        var firstIndex = _this.getFirstIndex();\n        for (var week = 0; week < 6; week++) {\n            var weekContainer = document.createElement(\"div\");\n            weekContainer.classList.add(\"calendar__row\");\n            for (var day = 0; day < 7; day++) {\n                var dayContainer = document.createElement(\"button\");\n                var currentIndex = week * 7 + day;\n                dayContainer.classList.add(\"material-btn\");\n                dayContainer.classList.add(\"calendar__item\");\n                if (currentIndex < firstIndex || currentIndex - firstIndex >= amountOfDays) {\n                    dayContainer.classList.add(\"calendar__item--empty\");\n                } else {\n                    dayContainer.textContent = (currentIndex - firstIndex + 1).toString();\n                }\n                if (currentIndex - firstIndex + 1 === _this.selected.getDate() && _this.month.getMonth() === _this.selected.getMonth() && _this.month.getFullYear() === _this.selected.getFullYear()) {\n                    dayContainer.classList.add(\"calendar__item--selected\");\n                }\n                weekContainer.appendChild(dayContainer);\n            }\n            _this.container.appendChild(weekContainer);\n        }\n    };\n\n    this.renderHeader = function () {\n        _this.container.innerHTML = \"\\n        <header class=\\\"calendar__header noselect\\\">\\n            <div class=\\\"calendar__left-arrow\\\">&lt;</div>\\n            <div class=\\\"calendar__name\\\">TodoMe</div>\\n            <div class=\\\"calendar__right-arrow\\\">&gt;</div>\\n        </header>\\n        <header class=\\\"calendar__header-date noselect\\\">\\n            \" + _this.monthNames[_this.month.getMonth()] + \" \" + _this.month.getFullYear() + \"\\n        </header>\\n        <div class=\\\"calendar__row calendar__row--header noselect\\\">\\n            <button class=\\\"material-btn calendar__item calendar__item--header\\\">Mon</button>\\n            <button class=\\\"material-btn calendar__item calendar__item--header\\\">Tue</button>\\n            <button class=\\\"material-btn calendar__item calendar__item--header\\\">Wed</button>\\n            <button class=\\\"material-btn calendar__item calendar__item--header\\\">Thu</button>\\n            <button class=\\\"material-btn calendar__item calendar__item--header\\\">Fri</button>\\n            <button class=\\\"material-btn calendar__item calendar__item--header\\\">Sat</button>\\n            <button class=\\\"material-btn calendar__item calendar__item--header\\\">Sun</button>\\n        </div>\\n    \";\n    };\n\n    this.monthNames = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"November\", \"October\", \"December\"];\n    this.container = container;\n    this.list = list;\n    this.selected = new Date();\n    this.month = this.getFirstDay(this.selected);\n    this.render();\n    this.addListener();\n};\n\nmodule.exports = Calendar;\n\n//# sourceURL=webpack:///./js/Calendar.js?");

/***/ }),

/***/ "./js/Database.js":
/*!************************!*\
  !*** ./js/Database.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _RequestHandler = __webpack_require__(/*! ./RequestHandler */ \"./js/RequestHandler.js\");\n\nvar _RequestHandler2 = _interopRequireDefault(_RequestHandler);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Database = function Database(url) {\n    var _this = this;\n\n    _classCallCheck(this, Database);\n\n    this.getTodos = function (callback) {\n        _this.requestHandler.getAll().then(function (data) {\n            callback(JSON.parse(data));\n        });\n    };\n\n    this.getTodo = function (id, callback) {\n        _this.requestHandler.get(id).then(function (data) {\n            callback(JSON.parse(data));\n        });\n    };\n\n    this.updateTodo = function (id, data, callback) {\n        _this.requestHandler.put(id, data).then(function (data) {\n            callback(JSON.parse(data));\n        });\n    };\n\n    this.deleteTodo = function (id, callback) {\n        _this.requestHandler.delete(id).then(function (data) {\n            callback(JSON.parse(data));\n        });\n    };\n\n    this.addTodo = function (data, callback) {\n        _this.requestHandler.post(data).then(function (data) {\n            callback(JSON.parse(data));\n        });\n    };\n\n    this.getTodosForSelectedDay = function (day, callback) {\n        _this.getTodos(function (data) {\n            data = _this.filter(data, day);\n            callback(data);\n        });\n    };\n\n    this.filter = function (data, day) {\n        return data.filter(function (todo) {\n            var todoDate = _this.toDate(todo.time);\n            return todoDate.getDate() == day.getDate() && todoDate.getMonth() == day.getMonth() && todoDate.getFullYear() == day.getFullYear();\n        });\n    };\n\n    this.toDate = function (timestamp) {\n        timestamp = timestamp instanceof String ? parseInt(timestamp, 10) : timestamp;\n        return new Date(timestamp * 1000);\n    };\n\n    this.requestHandler = new _RequestHandler2.default(url);\n};\n\nmodule.exports = Database;\n\n//# sourceURL=webpack:///./js/Database.js?");

/***/ }),

/***/ "./js/List.js":
/*!********************!*\
  !*** ./js/List.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar List = function List(container, db, calendar) {\n    var _this = this;\n\n    _classCallCheck(this, List);\n\n    this.addListener = function () {\n        _this.container.addEventListener(\"keyup\", function (e) {\n            e.preventDefault();\n            if (e.target !== e.currentTarget) {\n                var clickedItem = e.target;\n                if (clickedItem.classList.contains(\"list__submit-btn\")) {\n                    if (e.keyCode === 13 && clickedItem.value.length > 0) {\n                        var newTodo = {\n                            \"text\": clickedItem.value,\n                            \"time\": _this.toTimestamp(_this.calendar.selected)\n                        };\n                        _this.db.addTodo(newTodo, function () {\n                            _this.render();\n                            clickedItem.value = \"\";\n                        });\n                    }\n                }\n            }\n        });\n        _this.container.addEventListener(\"click\", function (e) {\n            if (e.target !== e.currentTarget) {\n                var clickedItem = e.target;\n                if (clickedItem.classList.contains(\"list__close\")) {\n                    var id = clickedItem.parentNode.dataset.listId;\n                    _this.db.deleteTodo(id, function () {\n                        _this.render();\n                    });\n                }\n            }\n        });\n    };\n\n    this.render = function () {\n        var selectedDayDate = _this.calendar.selected;\n        _this.db.getTodosForSelectedDay(selectedDayDate, function (data) {\n            _this.container.innerHTML = \"\";\n            _this.renderTodos(data);\n            _this.renderInput();\n        });\n    };\n\n    this.renderTodos = function (data) {\n        var html = \"\";\n        html += \"\\n        <div class=\\\"list__content\\\">\\n        \";\n        data.forEach(function (todoItem) {\n            html += \"\\n            <div class=\\\"list__item\\\" data-list-id=\\\"\" + todoItem.id + \"\\\">\\n                <p>\" + todoItem.text + \"</p>\\n                <img class=\\\"list__close\\\" src=\\\"images/close.png\\\" />\\n            </div>\\n            \";\n        });\n        html += \"\\n        </div>\\n        \";\n        _this.container.innerHTML += html;\n    };\n\n    this.renderInput = function () {\n        _this.container.innerHTML += \"\\n        <div class=\\\"list__input material__group\\\">\\n        <input class=\\\"material__input list__submit-btn\\\" type=\\\"text\\\">\\n        <span class=\\\"material__highlight\\\"></span>\\n        <span class=\\\"material__bar\\\"></span>\\n        </div>\\n        \";\n    };\n\n    this.toTimestamp = function (date) {\n        var timestamp = Date.parse(date);\n        return timestamp / 1000;\n    };\n\n    this.container = container;\n    this.db = db;\n    this.calendar = calendar;\n    this.render();\n    this.addListener();\n};\n\nmodule.exports = List;\n\n//# sourceURL=webpack:///./js/List.js?");

/***/ }),

/***/ "./js/RequestHandler.js":
/*!******************************!*\
  !*** ./js/RequestHandler.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar RequestHandler = function RequestHandler(url) {\n    var _this = this;\n\n    _classCallCheck(this, RequestHandler);\n\n    this.getAll = function () {\n        return new Promise(function (resolve, reject) {\n            var request = new XMLHttpRequest();\n            request.onload = function () {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText);\n                }\n            };\n            request.onerror = reject;\n            request.open(\"GET\", _this.url, true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send();\n        });\n    };\n\n    this.get = function (id) {\n        return new Promise(function (resolve, reject) {\n            var request = new XMLHttpRequest();\n            request.onload = function () {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText);\n                }\n            };\n            request.onerror = reject;\n            request.open(\"GET\", _this.url + \"/\" + id.toString(), true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send();\n        });\n    };\n\n    this.post = function (data) {\n        data = data instanceof String ? data : JSON.stringify(data);\n        return new Promise(function (resolve, reject) {\n            var request = new XMLHttpRequest();\n            request.onload = function () {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText);\n                }\n            };\n            request.onerror = reject;\n            request.open(\"POST\", _this.url, true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send(data);\n        });\n    };\n\n    this.put = function (id, data) {\n        data = data instanceof String ? data : JSON.stringify(data);\n        return new Promise(function (resolve, reject) {\n            var request = new XMLHttpRequest();\n            request.onload = function () {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText);\n                }\n            };\n            request.onerror = reject;\n            request.open(\"PUT\", _this.url + \"/\" + id.toString(), true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send(data);\n        });\n    };\n\n    this.delete = function (id) {\n        return new Promise(function (resolve, reject) {\n            var request = new XMLHttpRequest();\n            request.onload = function () {\n                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {\n                    resolve(request.responseText);\n                } else {\n                    reject(request.responseText);\n                }\n            };\n            request.onerror = reject;\n            request.open(\"DELETE\", _this.url + \"/\" + id.toString(), true);\n            request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n            request.send();\n        });\n    };\n\n    this.url = url;\n};\n\nmodule.exports = RequestHandler;\n\n//# sourceURL=webpack:///./js/RequestHandler.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Calendar = __webpack_require__(/*! ./Calendar */ \"./js/Calendar.js\");\n\nvar _Calendar2 = _interopRequireDefault(_Calendar);\n\nvar _List = __webpack_require__(/*! ./List */ \"./js/List.js\");\n\nvar _List2 = _interopRequireDefault(_List);\n\nvar _Database = __webpack_require__(/*! ./Database */ \"./js/Database.js\");\n\nvar _Database2 = _interopRequireDefault(_Database);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar calendarContainer = document.getElementById(\"calendar\");\nvar calendar = new _Calendar2.default(calendarContainer);\n\nvar listContainer = document.getElementById(\"list\");\nvar db = new _Database2.default(\"http://localhost:3000/todo\");\nvar list = new _List2.default(listContainer, db, calendar);\ncalendar.list = list;\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });