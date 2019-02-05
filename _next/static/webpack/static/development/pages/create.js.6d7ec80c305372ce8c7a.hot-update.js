webpackHotUpdate("static/development/pages/create.js",{

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
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");

var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/pages/create.jsx";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 // Layouts

 // Components


 // Constants


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
            _context.prev = 0;
            _context.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("http://35.229.209.76/api/v1/contracts?limit=300&offset=0");

          case 3:
            _ref2 = _context.sent;
            data = _ref2.data;
            setContracts(data.contracts.reduce(function (p, _ref3) {
              var contractAddress = _ref3.contractAddress,
                  c = _objectWithoutProperties(_ref3, ["contractAddress"]);

              // eslint-disable-next-line no-param-reassign
              p[contractAddress] = c;
              return p;
            }, {}));
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            // eslint-disable-next-line no-console
            console.error(_context.t0);

          case 11:
            return _context.abrupt("return", function () {});

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  })), [0]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    var _ref5, data;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(props.selectedAddress !== _utils_constants__WEBPACK_IMPORTED_MODULE_6__["NULL_ADDRESS"])) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 1;
            _context2.next = 4;
            return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("http://35.229.209.76/api/v1/assets?ownerAddress=".concat(props.selectedAddress));

          case 4:
            _ref5 = _context2.sent;
            data = _ref5.data;
            setAssets(data.assets);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            // eslint-disable-next-line no-console
            console.error(_context2.t0);

          case 12:
            return _context2.abrupt("return", function () {});

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 9]]);
  })), [props.selectedAddress]);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_Layout__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Create_CreateSteps__WEBPACK_IMPORTED_MODULE_4__["default"], {
    step: step,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Create_SetupReward__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
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
//# sourceMappingURL=create.js.6d7ec80c305372ce8c7a.hot-update.js.map