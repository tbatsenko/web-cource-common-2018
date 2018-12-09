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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/todo-list.js");
/******/ })
/************************************************************************/
/******/ ({

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