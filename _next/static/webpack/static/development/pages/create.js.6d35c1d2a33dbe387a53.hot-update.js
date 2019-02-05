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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layouts_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layouts/Layout */ "./layouts/Layout.jsx");
/* harmony import */ var _components_Create_CreateSteps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Create/CreateSteps */ "./components/Create/CreateSteps.jsx");
/* harmony import */ var _components_Create_SetupReward__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Create/SetupReward */ "./components/Create/SetupReward.jsx");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/pages/create.jsx";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(STEPS.REWARD_SETUP),
      _useState2 = _slicedToArray(_useState, 2),
      step = _useState2[0],
      setStep = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      assets = _useState4[0],
      setAssets = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState6 = _slicedToArray(_useState5, 2),
      contracts = _useState6[0],
      setContracts = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("http://35.229.209.76/api/v1/contracts?limit=300&offset=0").then(function (_ref) {
      var data = _ref.data;
      setContracts(data.contracts.reduce(function (p, _ref2) {
        var contractAddress = _ref2.contractAddress,
            c = _objectWithoutProperties(_ref2, ["contractAddress"]);

        // eslint-disable-next-line no-param-reassign
        p[contractAddress] = c;
        return p;
      }, {}));
    }).catch(console.error); // eslint-disable-line no-console
  }, [0]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (props.selectedAddress !== _utils_constants__WEBPACK_IMPORTED_MODULE_5__["NULL_ADDRESS"]) {
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("http://35.229.209.76/api/v1/assets?ownerAddress=".concat(props.selectedAddress)).then(function (_ref3) {
        var data = _ref3.data;
        setAssets(data.assets);
      }).catch(console.error); // eslint-disable-line no-console
    }
  }, [props.selectedAddress]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Create_CreateSteps__WEBPACK_IMPORTED_MODULE_3__["default"], {
    step: step,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Create_SetupReward__WEBPACK_IMPORTED_MODULE_4__["default"], {
    assets: assets,
    contracts: contracts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
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
//# sourceMappingURL=create.js.6d35c1d2a33dbe387a53.hot-update.js.map