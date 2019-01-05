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

/***/ "./src/adapter.js":
/*!************************!*\
  !*** ./src/adapter.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Adapter = {\n    baseUrl: \"http://localhost:3000\",\n    toJson: function (data) {\n        return data.then((res) => res.json());\n    },\n    getAll: function () {\n        return this.toJson(fetch(this.baseUrl));\n    },\n    getById: function (list, id) {\n        return this.toJson(fetch(`${this.baseUrl}/${list}/${id}`));\n    },\n    removeById: function (list, id) {\n        let options = { method: 'DELETE' };\n        return this.toJson(fetch(`${this.baseUrl}/${list}/${id}`, options));\n    },\n    add: function (list, data) {\n        let options = {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(data),\n        };\n\n        return this.toJson(fetch(`${this.baseUrl}/${list}`, options));\n    },\n    update: function (list, id, data) {\n        let options = {\n            method: 'PATCH',\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(data),\n        };\n\n        return this.toJson(fetch(`${this.baseUrl}/${list}/${id}`, options));\n    },\n    getTasks: function (list) {\n        return this.toJson(fetch(`${this.baseUrl}/${list}`));\n    },\n};\n\nmodule.exports = Adapter;\n\n//# sourceURL=webpack:///./src/adapter.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_todo__WEBPACK_IMPORTED_MODULE_0__);\n\n\n_todo__WEBPACK_IMPORTED_MODULE_0___default()();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const adapter = __webpack_require__(/*! ./adapter */ \"./src/adapter.js\");\n\nmodule.exports = function todo() {\n    const taskInput = document.getElementById('text-input');\n    const submitButton = document.getElementById('submit');\n    const tasksList = document.getElementById('list');\n    const completedTasksList = document.getElementById('completed-list');\n    let index = 0;\n\n    let createNewTask = (taskName) => {\n        let listItem = document.createElement('li');\n        let label = document.createElement('label');\n        let buttonsContainer = document.createElement('div');\n        let doneButton = document.createElement('button');\n        let editButton = document.createElement('button');\n        let removeButton = document.createElement('button');\n\n        label.innerText = taskName;\n        label.className = \"label-text\";\n\n        doneButton.innerText = 'Done';\n        editButton.innerText = 'Edit';\n        removeButton.innerText = 'Remove';\n\n        listItem.className = 'tasks__item';\n        index += 1;\n        listItem.id = index.toString();\n        buttonsContainer.className = 'tasks__buttons';\n        doneButton.id = 'done';\n        editButton.id = 'edit';\n        removeButton.id = 'remove';\n\n        listItem.appendChild(label);\n\n        buttonsContainer.appendChild(doneButton);\n        buttonsContainer.appendChild(editButton);\n        buttonsContainer.appendChild(removeButton);\n\n        listItem.appendChild(buttonsContainer);\n\n        bindTaskEvents(listItem);\n\n        return listItem;\n    };\n\n    let addTask = () => {\n        console.log('Add task');\n\n        if (taskInput.value !== '') {\n            const listItem = createNewTask(taskInput.value);\n            tasksList.appendChild(listItem);\n\n            let data = {\n                id: Number(listItem.id),\n                title: taskInput.value,\n            };\n\n            adapter.add(\"task\", data);\n\n            taskInput.value = '';\n        }\n    };\n\n    let taskCompleted = (taskItem) => {\n        console.log('Item checked');\n\n        let ul = taskItem.parentNode;\n        const data = {\n            id: Number(taskItem.id),\n            title: taskItem.querySelector(\"label\").innerText,\n        };\n        removeTask(taskItem);\n\n        if (ul.id === \"list\") {\n            taskItem.querySelector(\"#done\").innerText = 'Undone';\n            taskItem.querySelector(\"label\").className = \"label-text--completed\";\n            completedTasksList.appendChild(taskItem);\n            adapter.add(\"done\", data);\n            console.log('Task is moved to complete list');\n        } else {\n            taskItem.querySelector(\"#done\").innerText = 'Done';\n            taskItem.querySelector(\"label\").className = \"label-text\";\n            tasksList.appendChild(taskItem);\n            adapter.add(\"task\", data);\n            console.log('Task is moved to incomplete list');\n        }\n    };\n\n    let editTask = (taskItem) => {\n        console.log(\"Edit task\");\n\n        let editButton = taskItem.querySelector('#edit');\n        let doneButton = taskItem.querySelector('#done');\n\n        if (editButton.className !== 'edit--active') {\n            const label = taskItem.querySelector(\"label\");\n\n            let editField = document.createElement('input');\n            editField.placeholder = label.innerText;\n            editField.className = 'label-text__edit';\n            editField.type = 'text';\n\n            taskItem.replaceChild(editField, label);\n\n            editButton.className = 'edit--active';\n            doneButton.disabled = true;\n        } else {\n            const editField = taskItem.querySelector(\"input\");\n            let newLabel = document.createElement('label');\n            newLabel.innerText = editField.value === '' ? editField.placeholder : editField.value;\n            const ul = taskItem.parentNode;\n            newLabel.className = ul.id === 'list' ? 'label-text' : 'label-text--completed';\n\n            const list = ul.id === 'list' ? \"task\" : \"done\";\n            const data = {\n                id: Number(taskItem.id),\n                title: newLabel.innerText,\n            };\n\n            adapter.update(list, data.id, data);\n            taskItem.replaceChild(newLabel, editField);\n\n            editButton.className = null;\n            doneButton.disabled = false;\n        }\n    };\n\n    let removeTask = (taskItem) => {\n        console.log(\"Delete Task...\");\n\n        let ul = taskItem.parentNode;\n        const id = Number(taskItem.id);\n        const list = ul.id === \"list\" ? \"task\" : \"done\";\n        adapter.removeById(list, id);\n        ul.removeChild(taskItem);\n    };\n\n    let bindTaskEvents = (taskListItem) => {\n        console.log(\"bind list item events\");\n\n        let doneButton = taskListItem.querySelector('#done');\n        let editButton = taskListItem.querySelector('#edit');\n        let removeButton = taskListItem.querySelector(\"#remove\");\n\n        removeButton.onclick = () => { removeTask(taskListItem); };\n        doneButton.onclick = () => { taskCompleted(taskListItem); };\n        editButton.onclick = () => { editTask(taskListItem); };\n\n    };\n\n    let initList = () => {\n        console.log(\"init db\");\n\n        adapter.getTasks(\"task\").then(result => {\n            for (let i = 0; i < result.length; i++) {\n                const item = result[i];\n                const listItem = createNewTask(item.title);\n                listItem.id = item.id;\n                tasksList.appendChild(listItem);\n            }\n        });\n\n        adapter.getTasks(\"done\").then(result => {\n            for (let i = 0; i < result.length; i++) {\n                const item = result[i];\n                let listItem = createNewTask(item.title);\n                listItem.querySelector(\"label\").className = \"label-text--completed\";\n                listItem.id = item.id;\n                completedTasksList.appendChild(listItem);\n            }\n        });\n    };\n\n    submitButton.onclick = addTask;\n    initList();\n};\n\n//# sourceURL=webpack:///./src/todo.js?");

/***/ })

/******/ });