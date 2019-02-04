webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layouts_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layouts/Layout */ "./layouts/Layout.jsx");
/* harmony import */ var _components_Missions_Missions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Missions/Missions */ "./components/Missions/Missions.jsx");
/* harmony import */ var _assets_missions_missions_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/missions/missions.json */ "./assets/missions/missions.json");
var _assets_missions_missions_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../assets/missions/missions.json */ "./assets/missions/missions.json", 1);
/* harmony import */ var _eth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../eth */ "./eth/index.js");
/* harmony import */ var _utils_abiUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/abiUtils */ "./utils/abiUtils/index.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");

var _jsxFileName = "/Users/han0110/playground/lootex/archived/loothunt/client/pages/index.jsx";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // Layouts

 // Components

 // Assets

 // Utils


 // Constants



var IndexPage =
/*#__PURE__*/
function (_Component) {
  _inherits(IndexPage, _Component);

  function IndexPage() {
    var _this;

    _classCallCheck(this, IndexPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexPage).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onGetReward",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(misisonIndex) {
        var missions, newMissions, _ref2, tx, txSignature, _ref3, txHash;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                missions = _this.state.missions;
                newMissions = missions;
                _context.prev = 2;
                _context.next = 5;
                return _eth__WEBPACK_IMPORTED_MODULE_5__["default"].signZeroExTransaction(newMissions[misisonIndex].order, newMissions[misisonIndex].orderSignature);

              case 5:
                _ref2 = _context.sent;
                tx = _ref2.tx;
                txSignature = _ref2.txSignature;
                _context.next = 10;
                return _eth__WEBPACK_IMPORTED_MODULE_5__["default"].sendExecuteTransaction(tx, txSignature);

              case 10:
                _ref3 = _context.sent;
                txHash = _ref3.txHash;
                newMissions[misisonIndex].txHash = txHash;

                _this.setState({
                  missions: newMissions
                });

                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](2);
                console.error(_context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 16]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _this.state = {
      missions: _assets_missions_missions_json__WEBPACK_IMPORTED_MODULE_4__.map(function (m) {
        return _objectSpread({}, _utils_abiUtils__WEBPACK_IMPORTED_MODULE_6__["default"].decodeMission(m.order), m);
      })
    };
    return _this;
  }

  _createClass(IndexPage, [{
    key: "componentWillReceiveProps",
    value: function () {
      var _componentWillReceiveProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(props) {
        var _this2 = this;

        var missions, newMissions, _loop, i, l;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                missions = this.state.missions;
                newMissions = missions.map(function (m) {
                  return _objectSpread({}, m, {
                    fetching: true
                  });
                });

                if (props.selectedAddress !== _utils_constants__WEBPACK_IMPORTED_MODULE_7__["NULL_ADDRESS"]) {
                  this.setState({
                    missions: newMissions
                  });

                  _loop = function _loop(i, l) {
                    _eth__WEBPACK_IMPORTED_MODULE_5__["default"].getRequirementAchieved(missions[i].order, props.selectedAddress).then(function (requirementAchieved) {
                      newMissions[i].fetching = false;
                      newMissions[i].requirementAchieved = requirementAchieved;

                      _this2.setState({
                        missions: newMissions
                      });
                    });
                    _eth__WEBPACK_IMPORTED_MODULE_5__["default"].getFilled(missions[i].orderHash).then(function (filled) {
                      console.log("".concat(i, " filled: ").concat(filled));
                    });
                  };

                  for (i = 0, l = missions.length; i < l; i += 1) {
                    _loop(i, l);
                  }
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentWillReceiveProps(_x2) {
        return _componentWillReceiveProps.apply(this, arguments);
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: "render",
    value: function render() {
      var missions = this.state.missions;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Missions_Missions__WEBPACK_IMPORTED_MODULE_3__["default"], {
        title: "\uD83D\uDD25 LootHunt Airdrop",
        missions: missions,
        onGetReward: this.onGetReward,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }));
    }
  }]);

  return IndexPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=index.js.6e1d6427ad5df8e50530.hot-update.js.map