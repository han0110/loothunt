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
/* harmony import */ var _SetupReward_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SetupReward.sass */ "./components/Create/SetupReward.sass");
/* harmony import */ var _SetupReward_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SetupReward_sass__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/components/Create/SetupReward.jsx";
 // Styles



var SetupReward = function SetupReward(_ref) {
  var missionForm = _ref.missionForm,
      setReward = _ref.setReward,
      assets = _ref.assets,
      contracts = _ref.contracts;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _SetupReward_sass__WEBPACK_IMPORTED_MODULE_1___default.a.container,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _SetupReward_sass__WEBPACK_IMPORTED_MODULE_1___default.a.gift,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _SetupReward_sass__WEBPACK_IMPORTED_MODULE_1___default.a.form,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _SetupReward_sass__WEBPACK_IMPORTED_MODULE_1___default.a.tokens,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, missionForm.reward.contractAddress || 'Select token...', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _SetupReward_sass__WEBPACK_IMPORTED_MODULE_1___default.a.tokenList,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, assets.map(function (a) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: a.imageUrl,
      alt: "".concat(a.contractAddress, "-").concat(a.tokenId),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }));
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (SetupReward);

/***/ })

})
//# sourceMappingURL=create.js.b6c42ece2d4768e1b937.hot-update.js.map