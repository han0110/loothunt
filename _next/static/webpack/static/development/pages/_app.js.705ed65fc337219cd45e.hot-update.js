webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./utils/abiUtils/raw.js":
/*!*******************************!*\
  !*** ./utils/abiUtils/raw.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var raw = [{
  name: 'fillOrder',
  constant: false,
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
  inputs: [{
    components: [{
      name: 'makerAddress',
      type: 'address'
    }, {
      name: 'takerAddress',
      type: 'address'
    }, {
      name: 'feeRecipientAddress',
      type: 'address'
    }, {
      name: 'senderAddress',
      type: 'address'
    }, {
      name: 'makerAssetAmount',
      type: 'uint256'
    }, {
      name: 'takerAssetAmount',
      type: 'uint256'
    }, {
      name: 'makerFee',
      type: 'uint256'
    }, {
      name: 'takerFee',
      type: 'uint256'
    }, {
      name: 'expirationTimeSeconds',
      type: 'uint256'
    }, {
      name: 'salt',
      type: 'uint256'
    }, {
      name: 'makerAssetData',
      type: 'bytes'
    }, {
      name: 'takerAssetData',
      type: 'bytes'
    }],
    name: 'order',
    type: 'tuple'
  }, {
    name: 'takerAssetFillAmount',
    type: 'uint256'
  }, {
    name: 'signature',
    type: 'bytes'
  }],
  outputs: [{
    components: [{
      name: 'makerAssetFilledAmount',
      type: 'uint256'
    }, {
      name: 'takerAssetFilledAmount',
      type: 'uint256'
    }, {
      name: 'makerFeePaid',
      type: 'uint256'
    }, {
      name: 'takerFeePaid',
      type: 'uint256'
    }],
    name: 'fillResults',
    type: 'tuple'
  }]
}, {
  name: 'executeTransaction',
  constant: false,
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
  inputs: [{
    name: 'salt',
    type: 'uint256'
  }, {
    name: 'signerAddress',
    type: 'address'
  }, {
    name: 'signedExchangeTransaction',
    type: 'bytes'
  }, {
    name: 'signature',
    type: 'bytes'
  }],
  outputs: [{
    name: 'success',
    type: 'bool'
  }]
}, {
  "name": "getRequirementsAchieved",
  "constant": true,
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "inputs": [{
    "name": "takerAssetData",
    "type": "bytes"
  }, {
    "name": "signerAddress",
    "type": "address"
  }],
  "outputs": [{
    "name": "requirementsAchieved",
    "type": "bool[]"
  }]
}, {
  "name": "filled",
  "constant": true,
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "inputs": [{
    "name": "",
    "type": "bytes32"
  }],
  "outputs": [{
    "name": "",
    "type": "uint256"
  }]
}];
/* harmony default export */ __webpack_exports__["default"] = (raw);

/***/ })

})
//# sourceMappingURL=_app.js.705ed65fc337219cd45e.hot-update.js.map