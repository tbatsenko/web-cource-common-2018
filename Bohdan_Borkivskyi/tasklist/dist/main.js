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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/calendar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calendar.js":
/*!*************************!*\
  !*** ./src/calendar.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("MONTHS = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"]\r\nWEEK_DAYS = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\", \"Sun\"]\r\n\r\nfunction get_number_of_days(year, month){\r\n  return new Date(year, month+1, 0).getDate();\r\n}\r\n\r\nfunction update_calendar() {\r\n  // Set new month label\r\n  document.getElementById(\"current_month\").innerText = MONTHS[current_month]+\" \"+current_year;\r\n  // Set weekdays\r\n  var calendar_weekdays = document.getElementById(\"calendar__weekdays\")\r\n  calendar_weekdays.innerHTML = \"\"\r\n  for(var i=0;i<7;++i){\r\n    calendar_weekdays.innerHTML += \"<span class='calendar__cell calendar__cell-weekday'>\"+WEEK_DAYS[i]+\"</span>\";\r\n  }\r\n\r\n  // fill calendar\r\n  var calendar_body = document.getElementById(\"calendar__body\");\r\n  calendar_body.innerHTML = \"\"\r\n  var first_day = new Date(current_year, current_month, 1).getDay();\r\n  var num_of_days = get_number_of_days(current_year, current_month);\r\n  if(first_day === 0){\r\n    first_day = 7;\r\n  }\r\n  for(i=0;i<first_day-1;++i){\r\n    calendar_body.innerHTML += \"<button class='calendar__cell calendar__cell-inactive'></button>\"\r\n  }\r\n\r\n  for(i=0;i<num_of_days;++i){\r\n    var additional_class = (i+1 === current_day ? \" calendar__cell-selected\":\"\")\r\n    calendar_body.innerHTML += \"<button onclick='current_day = parseInt(this.innerText); update_window()' class='calendar__cell\"+additional_class+\"'>\"+(i+1)+\"</button>\"\r\n  }\r\n}\r\n\r\nfunction update_list() {\r\n  var tasks = get_tasks()\r\n  var task_list = document.getElementById(\"tasks_list\")\r\n  task_list.innerHTML = \"\"\r\n  for(var i=0;i<tasks.length;++i){\r\n    if(tasks[i][\"year\"] !== current_year ||\r\n      tasks[i][\"month\"] !== current_month+1 ||\r\n      tasks[i][\"day\"] !== current_day){continue}\r\n\r\n    task_list.innerHTML += \"<section class='list__task'>\"\r\n     + \"<span class='list__task-text'>\"+tasks[i][\"task\"]+\"</span>\"\r\n     + \"<button class='list__task-button' id=\"+tasks[i]['id']+\">X</button>\"\r\n     + \"</section>\"\r\n  }\r\n  buttons = document.getElementsByClassName(\"list__task-button\")\r\n  for(var i=0;i<buttons.length;++i){\r\n    buttons[i].addEventListener(\"click\", (event)=>{\r\n      delete_task(event.path[0].id);\r\n      update_list()\r\n    })\r\n  }\r\n}\r\n\r\nfunction update_window() {\r\n  update_calendar();\r\n  update_list();\r\n}\r\n\r\nvar current_year = new Date().getFullYear();\r\nvar current_month = new Date().getMonth(); // 0-11\r\nvar current_day = new Date().getDate(); // 1-31\r\nvar url = \"http://localhost:3000/tasks\"\r\n\r\nupdate_window();\r\n\r\ndocument.getElementById(\"change_month_button_prev\").addEventListener(\"click\", (event)=>{\r\n  if(current_month === 0){\r\n    current_year -= 1;\r\n    current_month = 11;\r\n  }else{\r\n    current_month -= 1;\r\n  }\r\n\r\n  if(get_number_of_days(current_year, current_month) < current_day){\r\n    current_day = 1;\r\n  }\r\n\r\n  update_window();\r\n})\r\n\r\ndocument.getElementById(\"change_month_button_next\").addEventListener(\"click\", (event)=>{\r\n  if(current_month === 11){\r\n    current_year += 1;\r\n    current_month = 0;\r\n  }else{\r\n    current_month += 1;\r\n  }\r\n  if(get_number_of_days(current_year, current_month) < current_day){\r\n    current_day = 1;\r\n  }\r\n  update_window();\r\n})\r\n\r\ndocument.getElementById(\"add\").addEventListener(\"click\", (event)=>{\r\n  input_el = document.getElementById(\"input\")\r\n  if(input_el.value === \"\"){return}\r\n  create_task(input_el.value);\r\n  input_el.value = \"\"\r\n  update_list();\r\n})\r\n\r\nfunction get_tasks() {\r\n  var xmlHttp = new XMLHttpRequest();\r\n  xmlHttp.open( \"GET\", url, false ); // false for synchronous request\r\n  xmlHttp.send( null );\r\n  return JSON.parse(xmlHttp.responseText);\r\n}\r\n\r\nfunction create_task(text) {\r\n  var xmlHttp = new XMLHttpRequest();\r\n  xmlHttp.open( \"POST\", url, false ); // false for synchronous request\r\n  xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');\r\n  xmlHttp.send( JSON.stringify({\"year\":current_year, \"month\": current_month+1, \"day\": current_day, \"task\": text}) );\r\n  return JSON.parse(xmlHttp.responseText);\r\n}\r\n\r\nfunction delete_task(task_id) {\r\n  var xmlHttp = new XMLHttpRequest();\r\n  xmlHttp.open( \"DELETE\", url+\"/\"+task_id, false ); // false for synchronous request\r\n  xmlHttp.send( null );\r\n  console.log(JSON.parse(xmlHttp.responseText))\r\n  return JSON.parse(xmlHttp.responseText);\r\n}\n\n//# sourceURL=webpack:///./src/calendar.js?");

/***/ })

/******/ });