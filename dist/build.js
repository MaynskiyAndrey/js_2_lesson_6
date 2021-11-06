/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./components/CartCmp.js":
/*!*******************************!*\
  !*** ./components/CartCmp.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CartItemCmp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CartItemCmp.js */ \"./components/CartItemCmp.js\");\n/* harmony import */ var _CartItemCmp_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_CartItemCmp_js__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst postResponse = async (url, data) => {\r\n\treturn await fetch(url, {\r\n\t\tmethod: 'POST',\r\n\t\tbody: JSON.stringify(data),\r\n\t\theaders: {\r\n\t\t\t'Content-Type': 'application/json'\r\n\t\t},\r\n\t})\r\n};\r\n\r\nVue.component('cart-cmp', {\r\n\tprops: ['items'],\r\n\ttemplate: `\r\n\t<div>\r\n\t\t<button class=\"cart-button\" type=\"button\" v-on:click=\"changeVisibleBasket\">Корзина</button>\r\n\t\t<div class=\"cart\" v-show=\"isVisibleCart\">\r\n\t\t\t<div v-for=\"good in items\">\r\n\t\t\t\t<cart-item-cmp :item=\"good\" v-on:remove-item=\"removeFromCart\"></cart-item-cmp>\r\n\t\t\t</div>\r\n\t\t\t<p v-show=\"items.length==0\">Корзина пустая</p>\r\n\t\t</div>\r\n\t</div>\r\n\t`,\r\n\tdata() {\r\n\t\treturn {\r\n\t\t\tisVisibleCart: false\r\n\t\t}\r\n\t},\r\n\tmethods: {\r\n\t\tchangeVisibleBasket() {\r\n\t\t\tthis.isVisibleCart = !this.isVisibleCart;\r\n\t\t},\r\n\t\tremoveFromCart(cartItem) {\r\n\t\t\tpostResponse('/removeFromCart', cartItem)\r\n\t\t\t\t.then(resp => resp.json())\r\n\t\t\t\t.then(data => {\r\n\t\t\t\t\tthis.items = data;\r\n\t\t\t\t});\r\n\t\t}\r\n\t},\r\n})\n\n//# sourceURL=webpack://HomeWork/./components/CartCmp.js?");

/***/ }),

/***/ "./components/CartItemCmp.js":
/*!***********************************!*\
  !*** ./components/CartItemCmp.js ***!
  \***********************************/
/***/ (() => {

eval("\r\nVue.component('cart-item-cmp', {\r\n\tprops: ['item'],\r\n\ttemplate: `\r\n\t<div class=\"cart-item\">\r\n\t\t<p>{{ item.product_name }}</p>\r\n\t\t\t\t\t<p> : </p>\r\n\t\t\t\t\t<p>{{ item.price }}</p>\r\n\t\t\t\t\t<button  v-on:click=\"$emit('remove-item', item)\">Удалить</button>\r\n\t</div>`,\r\n});\n\n//# sourceURL=webpack://HomeWork/./components/CartItemCmp.js?");

/***/ }),

/***/ "./components/Find.js":
/*!****************************!*\
  !*** ./components/Find.js ***!
  \****************************/
/***/ (() => {

eval("Vue.component('find', {\r\n\tprops: ['value'],\r\n\ttemplate: `\r\n\t<div>\r\n\t\t<input\r\n\t\t\tv-bind:value=\"value\"\r\n\t\t\tv-on:input=\"$emit('input', $event.target.value)\">\r\n\t\t<button v-on:click=\"$emit('filter-on')\" class=\"search-button\" type=\"button\">Искать</button>\r\n\t</div>\r\n\t`\r\n})\r\n\n\n//# sourceURL=webpack://HomeWork/./components/Find.js?");

/***/ }),

/***/ "./components/GoodsItem.js":
/*!*********************************!*\
  !*** ./components/GoodsItem.js ***!
  \*********************************/
/***/ (() => {

eval("\r\nVue.component('goods-item', {\r\n\tprops: ['good'],\r\n\temits: { add: null, },\r\n\ttemplate: `\r\n    <div class=\"goods-item\">\r\n      <h3>{{ good.product_name }}</h3>\r\n      <p>{{ good.price }}</p>\r\n\t  <button @click.preventDefault=\"addToCart(good)\">Купить</button>\r\n    </div>\r\n  `,\r\n\tmethods: {\r\n\t\taddToCart(prod) {\r\n\t\t\tthis.$emit('add', prod);\r\n\t\t}\r\n\t}\r\n\r\n});\n\n//# sourceURL=webpack://HomeWork/./components/GoodsItem.js?");

/***/ }),

/***/ "./components/GoodsList.js":
/*!*********************************!*\
  !*** ./components/GoodsList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GoodsItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoodsItem */ \"./components/GoodsItem.js\");\n/* harmony import */ var _GoodsItem__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_GoodsItem__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n\r\nVue.component('goods-list', {\r\n\tprops: ['goods'],\r\n\temits: { 'add-item': null, },\r\n\ttemplate: `\r\n    <div class=\"goods-list\">\r\n      <goods-item v-for=\"good in goods\" :good=\"good\" v-on:add=\"addChild\"></goods-item>\r\n    </div>\r\n  `,\r\n\tmethods: {\r\n\t\taddChild(newItem) {\r\n\t\t\tthis.$emit('add-item', newItem);\r\n\t\t}\r\n\t}\r\n});\n\n//# sourceURL=webpack://HomeWork/./components/GoodsList.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_CartCmp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/CartCmp.js */ \"./components/CartCmp.js\");\n/* harmony import */ var _components_Find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Find */ \"./components/Find.js\");\n/* harmony import */ var _components_Find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_Find__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_GoodsList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/GoodsList */ \"./components/GoodsList.js\");\n\r\n\r\n\r\n\r\nconst app = new Vue({\r\n\tel: '#app',\r\n\tdata: {\r\n\t\tgoods: [],\r\n\t\tfilteredGoods: [],\r\n\t\tsearchLine: '',\r\n\t\tcart: []\r\n\t},\r\n\tmethods: {\r\n\t\tmakeGETRequest(url) {\r\n\t\t\treturn new Promise((resolve, reject) => {\r\n\t\t\t\tvar xhr;\r\n\r\n\t\t\t\tif (window.XMLHttpRequest) {\r\n\t\t\t\t\txhr = new XMLHttpRequest();\r\n\t\t\t\t} else if (window.ActiveXObject) {\r\n\t\t\t\t\txhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\r\n\t\t\t\t}\r\n\r\n\t\t\t\txhr.onreadystatechange = function () {\r\n\t\t\t\t\tif (xhr.readyState === 4) {\r\n\t\t\t\t\t\tif (xhr.status === 200) {\r\n\t\t\t\t\t\t\tresolve(xhr.responseText);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\telse {\r\n\t\t\t\t\t\t\treject('Error');\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\r\n\t\t\t\txhr.open('GET', url, true);\r\n\t\t\t\txhr.send();\r\n\t\t\t})\r\n\t\t},\r\n\t\tfilterGoods() {\r\n\t\t\tconst regexp = new RegExp(this.searchLine, 'i');\r\n\t\t\tthis.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));\r\n\t\t},\r\n\t\tmakePOSTRequest(url, data, callback) {\r\n\t\t\tlet xhr;\r\n\r\n\t\t\tif (window.XMLHttpRequest) {\r\n\t\t\t\txhr = new XMLHttpRequest();\r\n\t\t\t} else if (window.ActiveXObject) {\r\n\t\t\t\txhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\r\n\t\t\t}\r\n\r\n\t\t\txhr.onreadystatechange = function () {\r\n\t\t\t\tif (xhr.readyState === 4) {\r\n\t\t\t\t\tcallback(xhr.responseText);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\txhr.open('POST', url, true);\r\n\t\t\txhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');\r\n\r\n\t\t\txhr.send(data);\r\n\t\t},\r\n\t\tasync onAddCartItem(good) {\r\n\t\t\tfetch('/addToCart', {\r\n\t\t\t\tmethod: 'POST',\r\n\t\t\t\theaders: {\r\n\t\t\t\t\t'Content-Type': 'application/json'\r\n\t\t\t\t},\r\n\t\t\t\tbody: JSON.stringify(good)\r\n\t\t\t})\r\n\t\t\t\t.then(resp => resp.json())\r\n\t\t\t\t.then(data => {\r\n\t\t\t\t\tthis.cart = data;\r\n\t\t\t\t});\r\n\t\t}\r\n\t},\r\n\tmounted: async function getData() {\r\n\t\tawait fetch('/catalog')\r\n\t\t\t.then(resp => resp.json())\r\n\t\t\t.then(data => {\r\n\t\t\t\tthis.goods = data;\r\n\t\t\t\tthis.filteredGoods = data;\r\n\t\t\t});\r\n\t\tawait fetch('/cart')\r\n\t\t\t.then(resp => resp.json())\r\n\t\t\t.then(data => {\r\n\t\t\t\tthis.cart = data;\r\n\t\t\t});\r\n\t}\r\n});\n\n//# sourceURL=webpack://HomeWork/./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./script.js");
/******/ 	
/******/ })()
;