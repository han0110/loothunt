/*

  Copyright 2018 ZeroEx Intl.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

pragma solidity ^0.4.24;

import "@0x/contracts-libs/contracts/libs/LibOrder.sol";


contract MExchangeCalldata {

    /// @dev Emulates the `calldataload` opcode on the embedded Exchange calldata,
    ///      which is accessed through `signedExchangeTransaction`.
    /// @param offset  Offset into the Exchange calldata.
    /// @return value  Corresponding 32 byte value stored at `offset`.
    function exchangeCalldataload(uint256 offset)
        internal pure
        returns (bytes32 value);

    /// @dev Extracts the takerAssetData from an order stored in the Exchange calldata
    ///      (which is embedded in `signedExchangeTransaction`).
    /// @return takerAssetData The extracted takerAssetData.
    function loadTakerAssetDataFromOrder()
        internal pure
        returns (uint256 takerAssetAmount, bytes memory takerAssetData);

    /// @dev Extracts the signature from an order stored in the Exchange calldata
    ///      (which is embedded in `signedExchangeTransaction`).
    /// @return signature The extracted signature.
    function loadSignatureFromExchangeCalldata()
        internal pure
        returns (bytes memory signature);
}
