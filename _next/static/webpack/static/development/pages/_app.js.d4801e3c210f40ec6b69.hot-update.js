webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./eth/index.js":
/*!**********************!*\
  !*** ./eth/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eth */ "./eth/eth.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./utils/index.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ETHWrapper =
/*#__PURE__*/
function (_ETH) {
  _inherits(ETHWrapper, _ETH);

  function ETHWrapper() {
    _classCallCheck(this, ETHWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(ETHWrapper).apply(this, arguments));
  }

  _createClass(ETHWrapper, [{
    key: "signZeroExTransaction",
    value: function () {
      var _signZeroExTransaction = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(order, orderSignature) {
        var tx, _ref, txSignature;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                tx = {
                  salt: _utils__WEBPACK_IMPORTED_MODULE_2__["orderUtils"].genSalt(),
                  signerAddress: this.currentProvider.selectedAddress,
                  data: _utils__WEBPACK_IMPORTED_MODULE_2__["abiUtils"].encodeFunctionCall('fillOrder', [order, '0x01', orderSignature])
                };
                _context.next = 4;
                return _utils__WEBPACK_IMPORTED_MODULE_2__["orderUtils"].ecSignTx(this.currentProvider, tx);

              case 4:
                _ref = _context.sent;
                txSignature = _ref.signature;
                return _context.abrupt("return", {
                  tx: tx,
                  txSignature: txSignature
                });

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function signZeroExTransaction(_x, _x2) {
        return _signZeroExTransaction.apply(this, arguments);
      }

      return signZeroExTransaction;
    }()
  }, {
    key: "sendExecuteTransaction",
    value: function () {
      var _sendExecuteTransaction = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(tx, signature) {
        var options, _ref2, txHash, txInstance;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                options = {
                  to: _utils_constants__WEBPACK_IMPORTED_MODULE_3__["CONTRACT_ADDRESSES"].REQUIREMENT_FILTER,
                  data: _utils__WEBPACK_IMPORTED_MODULE_2__["abiUtils"].encodeFunctionCall('executeTransaction', [tx.salt, tx.signerAddress, tx.data, signature])
                };
                _context2.next = 4;
                return this.send(options);

              case 4:
                _ref2 = _context2.sent;
                txHash = _ref2.txHash;
                txInstance = _ref2.txInstance;
                return _context2.abrupt("return", {
                  txHash: txHash,
                  txInstance: txInstance
                });

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function sendExecuteTransaction(_x3, _x4) {
        return _sendExecuteTransaction.apply(this, arguments);
      }

      return sendExecuteTransaction;
    }()
  }, {
    key: "getRequirementAchieved",
    value: function () {
      var _getRequirementAchieved = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(order, hunter) {
        var options, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                options = {
                  to: _utils_constants__WEBPACK_IMPORTED_MODULE_3__["CONTRACT_ADDRESSES"].REQUIREMENT_FILTER,
                  data: _utils__WEBPACK_IMPORTED_MODULE_2__["abiUtils"].encodeFunctionCall('getRequirementsAchieved', [order.takerAssetData, hunter])
                };
                _context3.next = 4;
                return this.call(options);

              case 4:
                data = _context3.sent;
                return _context3.abrupt("return", _utils__WEBPACK_IMPORTED_MODULE_2__["abiUtils"].decodeParameters('getRequirementsAchieved', data).requirementsAchieved);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function getRequirementAchieved(_x5, _x6) {
        return _getRequirementAchieved.apply(this, arguments);
      }

      return getRequirementAchieved;
    }()
  }, {
    key: "getFilled",
    value: function () {
      var _getFilled = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(orderHash) {
        var options, data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                options = {
                  to: _utils_constants__WEBPACK_IMPORTED_MODULE_3__["CONTRACT_ADDRESSES"].EXCHANGE,
                  data: _utils__WEBPACK_IMPORTED_MODULE_2__["abiUtils"].encodeFunctionCall('filled', [orderHash])
                };
                _context4.next = 4;
                return this.call(options);

              case 4:
                data = _context4.sent;
                return _context4.abrupt("return", _utils__WEBPACK_IMPORTED_MODULE_2__["abiUtils"].decodeParameters('filled', data)[0]);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function getFilled(_x7) {
        return _getFilled.apply(this, arguments);
      }

      return getFilled;
    }()
  }]);

  return ETHWrapper;
}(_eth__WEBPACK_IMPORTED_MODULE_1__["default"]);

var eth = new ETHWrapper();
/* harmony default export */ __webpack_exports__["default"] = (eth);

/***/ })

})
//# sourceMappingURL=_app.js.d4801e3c210f40ec6b69.hot-update.js.map