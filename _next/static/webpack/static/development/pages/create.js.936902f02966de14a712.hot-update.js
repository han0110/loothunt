webpackHotUpdate("static/development/pages/create.js",{

/***/ "./components/Create/SetupReward.jsx":
/*!*******************************************!*\
  !*** ./components/Create/SetupReward.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/components/Create/SetupReward.jsx";


var SetupReward = function SetupReward() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  });
};

/* harmony default export */ __webpack_exports__["default"] = (SetupReward);

/***/ }),

/***/ "./pages/create.jsx":
/*!**************************!*\
  !*** ./pages/create.jsx ***!
  \**************************/
/*! exports provided: STEPS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STEPS", function() { return STEPS; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _layouts_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../layouts/Layout */ "./layouts/Layout.jsx");
/* harmony import */ var _components_Create_CreateSteps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Create/CreateSteps */ "./components/Create/CreateSteps.jsx");
/* harmony import */ var _components_Create_SetupReward__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Create/SetupReward */ "./components/Create/SetupReward.jsx");

var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/pages/create.jsx";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 // Layouts

 // Components



var STEPS = {
  REWARD_SETUP: 'REWARD_SETUP',
  REQUIREMENTS_SETUP: 'REQUIREMENTS_SETUP',
  DEPLOYMENT: 'DEPLOYMENT'
};

var CreatePage = function CreatePage(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(STEPS.REWARD_SETUP),
      _useState2 = _slicedToArray(_useState, 2),
      step = _useState2[0],
      setStep = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      assets = _useState4[0],
      setAssets = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({}),
      _useState6 = _slicedToArray(_useState5, 2),
      contracts = _useState6[0],
      setContracts = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var _ref2, data;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("http://35.229.209.76/api/v1/contracts?limit=300&offset=0");

          case 2:
            _ref2 = _context.sent;
            data = _ref2.data;
            console.log(data);
            return _context.abrupt("return", function () {});

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })), [0]);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_Layout__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Create_CreateSteps__WEBPACK_IMPORTED_MODULE_4__["default"], {
    step: step,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Create_SetupReward__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (CreatePage);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/create")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=create.js.936902f02966de14a712.hot-update.js.map