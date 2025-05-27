/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   ZH: () => (/* binding */ capitalize),
/* harmony export */   xv: () => (/* binding */ truncate)
/* harmony export */ });
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  function truncate(str, maxLength = 10, suffix = '...') {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + suffix;
  }
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    capitalize,
    truncate
  });
const __webpack_exports__capitalize = __webpack_exports__.ZH;
const __webpack_exports__default = __webpack_exports__.Ay;
const __webpack_exports__truncate = __webpack_exports__.xv;
export { __webpack_exports__capitalize as capitalize, __webpack_exports__default as default, __webpack_exports__truncate as truncate };
