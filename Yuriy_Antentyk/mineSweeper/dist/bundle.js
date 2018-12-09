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

/***/ "./js/bem.js":
/*!*******************!*\
  !*** ./js/bem.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst bemToString = (blockName) => {\r\n    return (elementOrModifiers) =>{\r\n        const name = blockName + (elementOrModifiers.element? \"__\" + elementOrModifiers.element : \"\")\r\n\r\n        let modifiers = Object.keys(elementOrModifiers)\r\n        modifiers = modifiers.filter(modifier => modifier != \"element\")\r\n        modifiers = modifiers.filter(modifier => elementOrModifiers[modifier] !== false)\r\n\r\n        const res = [name].concat(\r\n            modifiers.map(\r\n                modifier => \r\n                    name + \"_\" + modifier + \r\n                        (elementOrModifiers[modifier] !== true ? \"_\" + elementOrModifiers[modifier]: \"\")\r\n            )\r\n        )\r\n        return res.join(\" \")\r\n    }\r\n}\r\n\r\nconst b = bemToString(\"field\")\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({bemToString, b});\n\n//# sourceURL=webpack:///./js/bem.js?");

/***/ }),

/***/ "./js/cell.js":
/*!********************!*\
  !*** ./js/cell.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bem */ \"./js/bem.js\");\n\r\n\r\nclass Cell{\r\n    constructor(discovered, flagged, mined, surroundingMines){\r\n        this.discovered = discovered\r\n        this.flagged = flagged\r\n        this.mined = mined\r\n        this.surroundingMines = surroundingMines\r\n    }\r\n\r\n    toHTML(){\r\n        const res = {element: \"cell\"}\r\n        res.opened = this.discovered\r\n        res.closed = !this.discovered\r\n        res.flagged = this.flagged\r\n        res.bombed = this.discovered && this.mined\r\n        if(this.discovered && !this.mined && this.surroundingMines > 0)\r\n            res.number = this.surroundingMines\r\n        const txt = this.surroundingMines > 0 && this.discovered && !this.mined? String(this.surroundingMines): \"\"\r\n        return `<div class='${_bem__WEBPACK_IMPORTED_MODULE_0__[\"default\"].b(res)}'>${txt}</div>`\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({Cell});\r\n\n\n//# sourceURL=webpack:///./js/cell.js?");

/***/ }),

/***/ "./js/field.js":
/*!*********************!*\
  !*** ./js/field.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ \"./js/utilities.js\");\n/* harmony import */ var _bem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bem */ \"./js/bem.js\");\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cell */ \"./js/cell.js\");\n\r\n\r\n\r\n\r\nclass Field{\r\n    constructor(size, minesCnt){\r\n        this.__size = size\r\n        minesCnt = Math.min(minesCnt, size * size)\r\n\r\n        this.__cells = _utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get2dArray(size, size, undefined)\r\n        for(let i = 0; i < size; ++i)\r\n            for(let j = 0; j < size; ++j)\r\n                this.__cells[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"].Cell(false, false, false, 0)\r\n        \r\n        while(minesCnt > 0){\r\n            let i = _utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getRandomInt(0, size - 1), j = _utilities__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getRandomInt(0, size - 1)\r\n            if(this.getCell(i, j).mined)\r\n                continue\r\n            this.getCell(i, j).mined = true\r\n            --minesCnt\r\n        }\r\n\r\n        for(const {i, j, cell} of this)\r\n            cell.surroundingMines = this.getNeighbors(i, j).map(entry => (entry.cell.mined? 1: 0)).reduce((a, b) => a + b, 0)\r\n    }\r\n\r\n    get size(){return this.__size}\r\n\r\n    getCell(i, j){return this.__cells[i][j]}\r\n\r\n    getNeighbors(i, j){\r\n        const valid = (i, j) => {return i >= 0 && i < this.size && j >= 0 && j < this.size}\r\n\r\n        const di = [-1, -1, -1, 0, 1, 1, 1, 0]\r\n        const dj = [-1, 0, 1, 1, 1, 0, -1, -1]\r\n\r\n        const res = []\r\n        for(let d = 0; d < di.length; ++d){\r\n            let ni = i + di[d], nj = j + dj[d]\r\n            if(!valid(ni, nj))\r\n                continue\r\n            res.push({i: ni, j: nj, cell: this.getCell(ni, nj)})\r\n        }\r\n\r\n        return res\r\n    }\r\n\r\n    *[Symbol.iterator]() {\r\n        for(let i = 0; i < this.size; ++i)\r\n            for(let j = 0; j < this.size; ++j)\r\n                yield {i: i, j: j, cell: this.getCell(i, j)}\r\n    }\r\n\r\n    toHTML(){\r\n        const inner = Array.from(this).map(obj => obj.cell).map(cell => cell.toHTML()).join(\"\")\r\n        return `<div class='${_bem__WEBPACK_IMPORTED_MODULE_1__[\"default\"].b({})}'>` + inner + `</div>`\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({Field});\r\n\n\n//# sourceURL=webpack:///./js/field.js?");

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field */ \"./js/field.js\");\n\r\n\r\nclass Game{\r\n    restart(fieldSize, minesCnt){this.field = new _field__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Field(fieldSize, minesCnt)}\r\n    constructor(fieldSize, minesCnt){this.restart(fieldSize, minesCnt)}\r\n\r\n    checkLose(){return Array.from(this.field).map(obj => obj.cell).filter(cell => (cell.mined && cell.discovered)).length > 0}\r\n\r\n    checkWin(){return Array.from(this.field).map(obj => obj.cell).filter(cell => (cell.mined && !cell.flagged)).length === 0}\r\n\r\n    flag(i, j){\r\n        const cell = this.field.getCell(i, j)\r\n        cell.flagged = cell.discovered ? false: cell.flagged ? false: true\r\n    }\r\n\r\n    discover(i, j){\r\n        const cell = this.field.getCell(i, j)\r\n        if(cell.flagged)\r\n            return\r\n        this.__discover(i, j)\r\n    }\r\n\r\n    __discover(ti, tj){\r\n        const cell = this.field.getCell(ti, tj)\r\n\r\n        if(cell.discovered)\r\n            return\r\n        cell.discovered = true\r\n        if(cell.mined || cell.surroundingMines > 0)\r\n            return\r\n        \r\n        for(const {i, j, cell} of this.field.getNeighbors(ti, tj))\r\n            this.__discover(i, j)\r\n    }\r\n\r\n    discoverAllMines(){\r\n        for(const {i, j, cell} of this.field)\r\n            cell.discovered = (cell.discovered || cell.mined)\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({Game});\n\n//# sourceURL=webpack:///./js/game.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./js/game.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ \"./js/utilities.js\");\n\r\n\r\n\r\nconst fieldSize = 10\r\nconst minesCnt = 10\r\n\r\ndocument.documentElement.style.setProperty('--field-size', fieldSize)\r\nconst fieldView = document.getElementById(\"field\")\r\n\r\nconst g = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Game(fieldSize, minesCnt)\r\n\r\nconst render = () => {fieldView.innerHTML = g.field.toHTML()}\r\nrender()\r\n\r\nconst bindDiscover = (i, j) => {g.discover(i, j)}\r\nconst bindFlag = (i, j) => {g.flag(i, j)}\r\n\r\nconst handleMove = (ev, action) => {\r\n    ev.preventDefault()\r\n\r\n    if(g.checkLose() || g.checkWin())\r\n        return\r\n\r\n    const index = _utilities__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getIndexOfDOMNode(ev.target)\r\n    const i = Math.floor(index / fieldSize), j = index % fieldSize\r\n\r\n    action(i, j)\r\n\r\n    render()\r\n\r\n    if(!(g.checkLose() || g.checkWin()))\r\n        return\r\n\r\n    if(g.checkLose()){\r\n        g.discoverAllMines()\r\n        render()\r\n    }\r\n\r\n    alert(g.checkWin()? \"You won!\" : \"You lost!\")\r\n}\r\n\r\nconst click = fieldView.addEventListener(\"click\", (ev) => handleMove(ev, bindDiscover))\r\nconst contextmenu = fieldView.addEventListener(\"contextmenu\", (ev) => handleMove(ev, bindFlag))\r\nconst restart = document.getElementById(\"restart\").addEventListener(\"click\", (ev) => {\r\n    g.restart(fieldSize, minesCnt)\r\n    render()\r\n})\r\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/utilities.js":
/*!*************************!*\
  !*** ./js/utilities.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst getRandomInt = (min, max) => {\r\n    min = Math.ceil(min)\r\n    max = Math.floor(max)\r\n    return Math.floor(Math.random() * (max - min + 1)) + min\r\n}\r\n\r\nconst get2dArray = (n, m, initialValue) => ((new Array(n)).fill(0).map(entry => (new Array(m)).fill(initialValue)))\r\n\r\nconst getIndexOfDOMNode = (element) => {return Array.from(element.parentNode.children).indexOf(element)}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({getRandomInt, get2dArray, getIndexOfDOMNode});\n\n//# sourceURL=webpack:///./js/utilities.js?");

/***/ })

/******/ });