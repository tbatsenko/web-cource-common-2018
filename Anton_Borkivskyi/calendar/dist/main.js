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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: Calendar, TODOList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Calendar\", function() { return Calendar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TODOList\", function() { return TODOList; });\n// import TODOList from \"./todo\"\r\n// // import Calendar from \"./calendar\"\r\n// import \"./styles/index.scss\"\r\n//\r\n\r\n// var todo = new TODOList()\r\n\r\n\r\nclass Calendar{\r\n  constructor() {\r\n    this.months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"]\r\n    this.date = new Date()\r\n    this.last_day = 1\r\n    this.year = this.date.getFullYear()\r\n    this.month = this.date.getMonth()\r\n    this.build_calendar();\r\n\r\n  }\r\n\r\n  make_todo_list(day){\r\n    document.getElementById(this.last_day).setAttribute('style', \"background: #123C69\")\r\n    document.getElementById(day).setAttribute('style', \"background: #AC3B61; color: white\")\r\n    this.last_day = day\r\n    var date = this.year + '-' + (this.month + 1) + '-' + day\r\n\r\n    todo.date = date\r\n\r\n    var resp = todo.get(\"http://localhost:3000/todo_lists/\" + date)\r\n\r\n\r\n    if (resp === '{}'){\r\n\r\n      var resp = todo.post(\"http://localhost:3000/todo_lists\", JSON.stringify({\"id\": date, \"items\":[]}))\r\n\r\n    }\r\n    var decoded = JSON.parse(resp)\r\n    var items = decoded.items\r\n    todo.build_list(items)\r\n\r\n  }\r\n\r\n\r\n  build_calendar(){\r\n    var header = this.months[this.month] + \" \" + this.year;\r\n    document.getElementById(\"header__text\").innerHTML = header;\r\n\r\n    var blank_cells_before = this.get_blank_lines_before()\r\n\r\n    var days_in_month = new Date(this.year, this.month + 1, 0).getDate();\r\n\r\n    var blank_cells_after = 42 - blank_cells_before - days_in_month\r\n\r\n    var calendar_body_html = \"\"\r\n\r\n    for(var i = 0; i < blank_cells_before; i++){\r\n      calendar_body_html += '<div class=\"calendar__cell\"></div>'\r\n    }\r\n\r\n    for(var j = 1; j <= days_in_month; j++){\r\n      // calendar_body_html += '<div class=\"calendar__cell\" onclick=\"calendar.make_todo_list(' + j + ')\" id=\"' + j + '\">' + j + '</div>'\r\n      calendar_body_html += '<div class=\"calendar__cell\" onclick=\"this.make_t odo_list(' + j + ')\" id=\"' + j + '\">' + j + '</div>'\r\n    }\r\n\r\n    for(var k = 0; k < blank_cells_after; k++){\r\n      calendar_body_html += '<div class=\"calendar__cell\"></div>'\r\n    }\r\n\r\n    // document.getElementById(\"calendar\").innerHTML = blank_cells_before + \" \" + days_in_month + \" \" + blank_cells_after;\r\n    document.getElementById(\"calendar\").innerHTML = calendar_body_html\r\n  }\r\n\r\n  get_blank_lines_before(){\r\n    var first_day = new Date(this.year + \"-\" + (this.month + 1) + \"-01\").getDay()\r\n    var blank_cells_before = first_day - 1\r\n\r\n    if (first_day <= 1){\r\n      blank_cells_before = first_day + 6\r\n    }\r\n\r\n    return blank_cells_before\r\n  }\r\n\r\n  next_month(){\r\n    this.month += 1\r\n    if(this.month === 12){\r\n      this.month = 0\r\n      this.year += 1\r\n    }\r\n    this.build_calendar()\r\n  }\r\n\r\n  prev_month(){\r\n    this.month -= 1\r\n    if(this.month === -1){\r\n      this.month = 11\r\n      this.year -= 1\r\n    }\r\n    this.build_calendar()\r\n  }\r\n\r\n\r\n}\r\n\r\n\r\n\r\nclass TODOList{\r\n  constructor(){\r\n\r\n    this.date = ''\r\n\r\n  }\r\n\r\n  get(url){\r\n    var xmlHttp = new XMLHttpRequest();\r\n    xmlHttp.open( \"GET\", url, false ); // false for synchronous request\r\n    xmlHttp.send( null );\r\n    return xmlHttp.responseText;\r\n  }\r\n\r\n  post(url, req){\r\n    var xmlHttp = new XMLHttpRequest();\r\n    xmlHttp.open( \"POST\", url, false ); // false for synchronous request\r\n    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');\r\n    xmlHttp.send(req);\r\n    return xmlHttp.responseText;\r\n  }\r\n\r\n\r\n  put(url, req){\r\n    var xmlHttp = new XMLHttpRequest();\r\n    xmlHttp.open( \"PUT\", url, false ); // false for synchronous request\r\n    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');\r\n    xmlHttp.send(req);\r\n    return xmlHttp.responseText;\r\n  }\r\n\r\n\r\n  add() {\r\n    var input = document.getElementById('input')\r\n    var new_item = input.value.trim()\r\n    if (new_item !== '') {\r\n      var resp = todo.get(\"http://localhost:3000/todo_lists/\" + this.date)\r\n\r\n      var decoded = JSON.parse(resp)\r\n      var items = decoded.items\r\n      items.push(new_item)\r\n      var resp_put = todo.put(\"http://localhost:3000/todo_lists/\"+this.date, JSON.stringify({\"id\": this.date, \"items\":items}))\r\n\r\n      this.build_list(items)\r\n    }\r\n    input.value = ''\r\n  }\r\n\r\n  remove(i){\r\n    var resp = todo.get(\"http://localhost:3000/todo_lists/\" + this.date)\r\n\r\n    var decoded = JSON.parse(resp)\r\n    var items = decoded.items\r\n\r\n    items.splice(i, 1)\r\n    var resp_put = todo.put(\"http://localhost:3000/todo_lists/\"+this.date, JSON.stringify({\"id\": this.date, \"items\":items}))\r\n\r\n    this.build_list(items)\r\n  }\r\n\r\n  build_list(items) {\r\n    document.getElementById('todo').innerHTML = ''\r\n    var inner_html = ''\r\n    for (var i = 0; i < items.length; i++) {\r\n      inner_html += '<div class=\"item\"><p class=\"item__text\">' + items[i] + '</p><button class=\"cancel_button\" onclick=\"todo.remove(' + i + ')\">X</button></div>'\r\n    }\r\n    document.getElementById('todo').innerHTML = inner_html\r\n  }\r\n\r\n\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });