webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Missions/Missions.jsx":
/*!******************************************!*\
  !*** ./components/Missions/Missions.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "../node_modules/web3-utils/src/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(web3_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MissionData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MissionData */ "./components/Missions/MissionData.jsx");
/* harmony import */ var _Missions_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Missions.sass */ "./components/Missions/Missions.sass");
/* harmony import */ var _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Missions_sass__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/components/Missions/Missions.jsx";

 // Components

 // Utils
// Styles



var Missions = function Missions(_ref) {
  var title = _ref.title,
      missions = _ref.missions,
      onGetReward = _ref.onGetReward;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.container,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, title), missions.map(function (_ref2, missionIndex) {
    var order = _ref2.order,
        orderHash = _ref2.orderHash,
        requirements = _ref2.requirements,
        reward = _ref2.reward,
        fetching = _ref2.fetching,
        requirementAchieved = _ref2.requirementAchieved,
        filled = _ref2.filled,
        txHash = _ref2.txHash,
        active = _ref2.active;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.mission,
      key: orderHash,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.requirements,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, requirements.map(function (r, requirementIndex) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MissionData__WEBPACK_IMPORTED_MODULE_2__["default"], {
        fetching: fetching,
        achieved: (requirementAchieved || [])[requirementIndex],
        data: r,
        key: JSON.stringify(r),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      });
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.divider,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.reward,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MissionData__WEBPACK_IMPORTED_MODULE_2__["default"], {
      data: reward,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    })), txHash ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.viewTx,
      href: "https://etherscan.io/tx/".concat(txHash),
      target: "_blank",
      rel: "noopener noreferrer",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, "VIEW TX")) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_3___default.a.get,
      onClick: function onClick() {
        return onGetReward(missionIndex);
      },
      "data-active": active,
      type: "button",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }, "GET"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, filled || 0, " /", ' ', Object(web3_utils__WEBPACK_IMPORTED_MODULE_1__["hexToNumber"])(order.takerAssetAmount))));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Missions);

/***/ })

})
//# sourceMappingURL=index.js.26b775f2f4386e79366f.hot-update.js.map