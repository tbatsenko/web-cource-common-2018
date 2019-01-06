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

/***/ "./js/Game.js":
/*!********************!*\
  !*** ./js/Game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Game = function Game(container) {\n    var _this = this;\n\n    _classCallCheck(this, Game);\n\n    this.backgroundColors = ['#EEE4DA', '#EDE0C8', '#F2B179', '#F59563', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F', '#F67C5F'];\n    this.foregroundColors = ['#776E65', '#776E65', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2', '#F9F6F2'];\n\n    this.startGame = function () {\n        _this.generateElems();\n        _this.FIELD_SIZE = 4;\n        _this.field = Array(_this.FIELD_SIZE).fill().map(function () {\n            return Array(_this.FIELD_SIZE).fill(0);\n        });\n        _this.moves = 0;\n        _this.score = 0;\n        _this.startTime = new Date();\n        _this.updateMoves(\".moves\");\n        _this.updateScore(\".score\");\n        _this.updateTime(\".time\");\n        _this.field = _this.generateNumber(_this.field);\n        _this.intervalId = setInterval(function () {\n            _this.updateTime(\".time\");\n        }, 1000);\n        _this.renderField(_this.field, _this.container.querySelector(\".layout__game-placeholder\"));\n        _this.addEventListeners();\n    };\n\n    this.generateElems = function () {\n        console.log(_this.container);\n        _this.container.innerHTML = '\\n        <div class=\"layout__score-placeholder\">\\n                    <div class=\"score\">Score: 0</div>\\n                    <div class=\"moves\">Move: 0</div>\\n                    <div class=\"time\">Time: 00:00:00</div>\\n                </div>\\n            \\n                <div class=\"layout__game-placeholder\"></div>            \\n            \\n                <div class=\"layout__lose-placeholder\">\\n                    <div class=\"layout__lose\">\\n                            <div class=\"layout__lose-score\"></div>\\n                            <div class=\"layout__lose-moves\"></div>\\n                            <div class=\"layout__lose-time\"></div>\\n                        </div>\\n        </div>';\n    };\n\n    this.valid = function (i, j) {\n        return i >= 0 && i < _this.FIELD_SIZE && j >= 0 && j < _this.FIELD_SIZE;\n    };\n\n    this.checkLose = function (field) {\n        var di = [1, -1, 0, 0];\n        var dj = [0, 0, 1, -1];\n        for (var i = 0; i < _this.FIELD_SIZE; i++) {\n            for (var j = 0; j < _this.FIELD_SIZE; j++) {\n                var val = field[i][j];\n                for (var k = 0; k < 4; k++) {\n                    if (_this.valid(i + di[k], j + dj[k])) {\n                        if (field[i + di[k]][j + dj[k]] == val) {\n                            return false;\n                        }\n                    }\n                }\n            }\n        }\n        return true;\n    };\n\n    this.displayLose = function () {\n        _this.container.querySelector(\".layout__score-placeholder\").style.display = \"none\";\n        _this.container.querySelector(\".layout__game-placeholder\").style.display = \"none\";\n        _this.container.querySelector(\".layout__lose\").style.display = \"flex\";\n        _this.updateScore(\".layout__lose-score\");\n        _this.updateMoves(\".layout__lose-moves\");\n        _this.updateTime(\".layout__lose-time\");\n        clearInterval(_this.intervalId);\n        document.removeEventListener(\"keyup\", _this.keyHandler);\n    };\n\n    this.generateNumber = function (field) {\n        var free = [];\n        for (var _i = 0; _i < _this.FIELD_SIZE; _i++) {\n            for (var _j = 0; _j < _this.FIELD_SIZE; _j++) {\n                if (field[_i][_j] == 0) {\n                    free.push(_i * _this.FIELD_SIZE + _j);\n                }\n            }\n        }\n        if (free.length < 1) {\n            if (_this.checkLose(field)) {\n                _this.displayLose();\n            }\n            return field;\n        }\n        var pos = Math.floor(Math.random() * free.length);\n        var i = Math.floor(free[pos] / _this.FIELD_SIZE);\n        var j = free[pos] % _this.FIELD_SIZE;\n\n        field[i][j] = Math.floor(Math.random() * 10) >= 8 ? 4 : 2;\n        return field;\n    };\n\n    this.mergeNums = function (field, e) {\n\n        if (e.key == \"ArrowUp\") {\n\n            for (var i = 0; i < _this.FIELD_SIZE; i++) {\n                for (var j = 1; j < _this.FIELD_SIZE; j++) {\n                    if (field[i][j - 1] == field[i][j]) {\n                        _this.score += field[i][j] * 2;\n                        field[i][j - 1] *= 2;\n                        field[i][j] = 0;\n                        j++;\n                    }\n                }\n            }\n        }\n        if (e.key == \"ArrowDown\") {\n\n            for (var _i2 = 0; _i2 < _this.FIELD_SIZE; _i2++) {\n                for (var _j2 = _this.FIELD_SIZE - 2; _j2 >= 0; _j2--) {\n                    if (field[_i2][_j2 + 1] == field[_i2][_j2]) {\n                        _this.score += field[_i2][_j2] * 2;\n                        field[_i2][_j2 + 1] *= 2;\n                        field[_i2][_j2] = 0;\n                        _this.score += field[_i2][_j2 + 1];\n                        _j2--;\n                    }\n                }\n            }\n        }\n        if (e.key == \"ArrowLeft\") {\n\n            for (var _j3 = 0; _j3 < _this.FIELD_SIZE; _j3++) {\n                for (var _i3 = 1; _i3 < _this.FIELD_SIZE; _i3++) {\n                    if (field[_i3 - 1][_j3] == field[_i3][_j3]) {\n                        _this.score += field[_i3][_j3] * 2;\n                        field[_i3 - 1][_j3] *= 2;\n                        field[_i3][_j3] = 0;\n                        _i3++;\n                    }\n                }\n            }\n        }\n        if (e.key == \"ArrowRight\") {\n\n            for (var _j4 = 0; _j4 < _this.FIELD_SIZE; _j4++) {\n                for (var _i4 = _this.FIELD_SIZE - 2; _i4 >= 0; _i4--) {\n                    if (field[_i4 + 1][_j4] == field[_i4][_j4]) {\n                        _this.score += field[_i4][_j4] * 2;\n                        field[_i4 + 1][_j4] *= 2;\n                        field[_i4][_j4] = 0;\n                        _i4--;\n                    }\n                }\n            }\n        }\n        _this.updateScore(\".score\");\n    };\n\n    this.moveNums = function (field, e) {\n        var hasMoves = false;\n        if (e.key == \"ArrowUp\") {\n            for (var iteration = 0; iteration < _this.FIELD_SIZE - 1; iteration++) {\n                for (var i = 0; i < _this.FIELD_SIZE; i++) {\n                    for (var j = 1; j < _this.FIELD_SIZE; j++) {\n                        if (field[i][j - 1] == 0) {\n                            field[i][j - 1] = field[i][j];\n                            field[i][j] = 0;\n                            hasMoves = true;\n                        }\n                    }\n                }\n            }\n        }\n        if (e.key == \"ArrowDown\") {\n            for (var _iteration = 0; _iteration < _this.FIELD_SIZE - 1; _iteration++) {\n                for (var _i5 = 0; _i5 < _this.FIELD_SIZE; _i5++) {\n                    for (var _j5 = _this.FIELD_SIZE - 2; _j5 >= 0; _j5--) {\n                        if (field[_i5][_j5 + 1] == 0) {\n                            field[_i5][_j5 + 1] = field[_i5][_j5];\n                            field[_i5][_j5] = 0;\n                            hasMoves = true;\n                        }\n                    }\n                }\n            }\n        }\n        if (e.key == \"ArrowLeft\") {\n            for (var _iteration2 = 0; _iteration2 < _this.FIELD_SIZE - 1; _iteration2++) {\n                for (var _j6 = 0; _j6 < _this.FIELD_SIZE; _j6++) {\n                    for (var _i6 = 1; _i6 < _this.FIELD_SIZE; _i6++) {\n                        if (field[_i6 - 1][_j6] == 0) {\n                            field[_i6 - 1][_j6] = field[_i6][_j6];\n                            field[_i6][_j6] = 0;\n                            hasMoves = true;\n                        }\n                    }\n                }\n            }\n        }\n        if (e.key == \"ArrowRight\") {\n            for (var _iteration3 = 0; _iteration3 < _this.FIELD_SIZE - 1; _iteration3++) {\n                for (var _j7 = 0; _j7 < _this.FIELD_SIZE; _j7++) {\n                    for (var _i7 = _this.FIELD_SIZE - 2; _i7 >= 0; _i7--) {\n                        if (field[_i7 + 1][_j7] == 0) {\n                            field[_i7 + 1][_j7] = field[_i7][_j7];\n                            field[_i7][_j7] = 0;\n                            hasMoves = true;\n                        }\n                    }\n                }\n            }\n        }\n        return hasMoves;\n    };\n\n    this.updateScore = function (query) {\n        _this.container.querySelector(query).innerHTML = 'Score: ' + _this.score;\n    };\n\n    this.updateMoves = function (query) {\n        _this.container.querySelector(query).innerHTML = 'Moves: ' + _this.moves;\n    };\n\n    this.updateTime = function (query) {\n        var diffTime = new Date(new Date() - _this.startTime);\n        diffTime.setHours(diffTime.getHours() - 3);\n        var timeToDisplay = \"Time: \" + ('0' + diffTime.getHours()).slice(-2) + ':' + ('0' + diffTime.getMinutes()).slice(-2) + ':' + ('0' + diffTime.getSeconds()).slice(-2);\n        _this.container.querySelector(query).innerHTML = timeToDisplay;\n    };\n\n    this.colorizeBackground = function (number) {\n        return _this.backgroundColors[Math.log2(number) - 1];\n    };\n\n    this.colorizeForeground = function (number) {\n        return _this.foregroundColors[Math.log2(number) - 1];\n    };\n\n    this.renderCell = function (cellNumber) {\n        if (cellNumber > 0) {\n            return '<div class=\"game__cell\"\\n            style=\"\\n            background-color:' + _this.colorizeBackground(cellNumber) + ';\\n            color:' + _this.colorizeForeground(cellNumber) + ';\">\\n            ' + cellNumber + '</div>';\n        } else {\n            return '<div class=\"game__cell--empty\"></div>';\n        }\n    };\n\n    this.renderField = function (field) {\n        var game = _this.container.querySelector(\".layout__game-placeholder\");\n        game.innerHTML = '\\n            <div class=\"game\">\\n            ' + field.map(function (row) {\n            return '<div class=\"game__row\">' + row.map(_this.renderCell).join('') + '</div>';\n        }).join('') + '\\n            </div>\\n        ';\n    };\n\n    this.validKey = function (e) {\n        return e.key == \"ArrowUp\" || e.key == \"ArrowDown\" || e.key == \"ArrowLeft\" || e.key == \"ArrowRight\";\n    };\n\n    this.keyHandler = function (e) {\n        var move1 = _this.moveNums(_this.field, e);\n        _this.mergeNums(_this.field, e);\n        var move2 = _this.moveNums(_this.field, e);\n        if (move1 || move2) {\n            _this.moves++;\n        }\n        if (_this.validKey(e)) {\n            _this.field = _this.generateNumber(_this.field);\n        }\n        _this.updateMoves(\".moves\");\n        _this.renderField(_this.field);\n    };\n\n    this.addEventListeners = function () {\n        document.addEventListener(\"keyup\", _this.keyHandler);\n    };\n\n    this.container = container;\n    this.startGame();\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./js/Game.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Game = __webpack_require__(/*! ./Game */ \"./js/Game.js\");\n\nvar _Game2 = _interopRequireDefault(_Game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar gameContainer1 = document.querySelector(\".game-1\");\nvar game1 = new _Game2.default(gameContainer1);\n\nvar gameContainer2 = document.querySelector(\".game-2\");\nvar game2 = new _Game2.default(gameContainer2);\n\nvar gameContainer3 = document.querySelector(\".game-3\");\nvar game3 = new _Game2.default(gameContainer3);\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });