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
/* harmony import */ var _MissionData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MissionData */ "./components/Missions/MissionData.jsx");
/* harmony import */ var _Missions_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Missions.sass */ "./components/Missions/Missions.sass");
/* harmony import */ var _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Missions_sass__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/components/Missions/Missions.jsx";
 // Components

 // Styles



var Missions = function Missions(_ref) {
  var title = _ref.title,
      missions = _ref.missions,
      onGetReward = _ref.onGetReward;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.container,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, title), missions.map(function (_ref2, missionIndex) {
    var orderHash = _ref2.orderHash,
        requirements = _ref2.requirements,
        reward = _ref2.reward,
        fetching = _ref2.fetching,
        requirementAchieved = _ref2.requirementAchieved,
        txHash = _ref2.txHash;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.mission,
      key: orderHash,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.requirements,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, requirements.map(function (r, requirementIndex) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MissionData__WEBPACK_IMPORTED_MODULE_1__["default"], {
        fetching: fetching,
        achieved: (requirementAchieved || [])[requirementIndex],
        data: r,
        key: JSON.stringify(r),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      });
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.divider,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.reward,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MissionData__WEBPACK_IMPORTED_MODULE_1__["default"], {
      data: reward,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    })), txHash || Math.random() > 0.5 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.viewTx,
      href: "https://etherscan.io/tx/".concat(txHash),
      target: "_blank",
      rel: "noopener noreferrer",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, "VIEW TX")) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: _Missions_sass__WEBPACK_IMPORTED_MODULE_2___default.a.get,
      onClick: function onClick() {
        return onGetReward(missionIndex);
      },
      "data-active": !requirementAchieved.includes(false),
      type: "button",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, "GET")));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Missions);

/***/ })

})
//# sourceMappingURL=index.js.c4b45447b2bf66298c32.hot-update.js.map