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

import "./mixins/MExchangeCalldata.sol";
import "@0x/contracts-libs/contracts/libs/LibOrder.sol";


contract MixinExchangeCalldata
    is MExchangeCalldata
{

    /// @dev Emulates the `calldataload` opcode on the embedded Exchange calldata,
    ///      which is accessed through `signedExchangeTransaction`.
    /// @param offset  Offset into the Exchange calldata.
    /// @return value  Corresponding 32 byte value stored at `offset`.
    function exchangeCalldataload(uint256 offset)
        internal pure
        returns (bytes32 value)
    {
        assembly {
            // Pointer to exchange transaction
            // 0x04 for calldata selector
            // 0x40 to access `signedExchangeTransaction`, which is the third parameter
            let exchangeTxPtr := calldataload(0x44)

            // Offset into Exchange calldata
            // We compute this by adding 0x24 to the `exchangeTxPtr` computed above.
            // 0x04 for calldata selector
            // 0x20 for length field of `signedExchangeTransaction`
            let exchangeCalldataOffset := add(exchangeTxPtr, add(0x24, offset))
            value := calldataload(exchangeCalldataOffset)
        }
        return value;
    }

    /// @dev Extracts the takerAssetData from an order stored in the Exchange calldata
    ///      (which is embedded in `signedExchangeTransaction`).
    /// @return takerAssetData The extracted takerAssetData.
    function loadTakerAssetDataFromOrder()
        internal pure
        returns (uint256 takerAssetAmount, bytes memory takerAssetData)
    {
        assembly {
            takerAssetData := mload(0x40)
            // Offset to exchange calldata
            // 0x04 for calldata selector
            // 0x40 to access `signedExchangeTransaction`, which is the third parameter
            let exchangeCalldataOffset := add(0x28, calldataload(0x44))
            // Offset to order
            let orderOffset := add(exchangeCalldataOffset, calldataload(exchangeCalldataOffset))
            // Offset to takerAssetData
            takerAssetAmount := calldataload(add(orderOffset, 160))
            let takerAssetDataOffset := add(orderOffset, calldataload(add(orderOffset, 352)))
            let takerAssetDataLength := calldataload(takerAssetDataOffset)
            // Locate new memory including padding
            mstore(0x40, add(takerAssetData, and(add(add(takerAssetDataLength, 0x20), 0x1f), not(0x1f))))
            mstore(takerAssetData, takerAssetDataLength)
            // Copy takerAssetData
            calldatacopy(add(takerAssetData, 32), add(takerAssetDataOffset, 32), takerAssetDataLength)
        }

        return (takerAssetAmount, takerAssetData);
    }

    /// @dev Extracts the signature from an order stored in the Exchange calldata
    ///      (which is embedded in `signedExchangeTransaction`).
    /// @return signature The extracted signature.
    function loadSignatureFromExchangeCalldata()
        internal pure
        returns (bytes memory signature)
    {
        assembly {
            signature := mload(0x40)
            // Offset to exchange calldata
            // 0x04 for calldata selector
            // 0x40 to access `signedExchangeTransaction`, which is the third parameter
            let exchangeCalldataOffset := add(0x28, calldataload(0x44))
            // Offset to signature
            // 0x40 to access `signature`, which is the third parameter of `fillOrder`
            let signatureOffset := add(exchangeCalldataOffset, calldataload(add(exchangeCalldataOffset, 0x40)))
            let signatureLength := calldataload(signatureOffset)
            // Locate new memory including padding
            mstore(0x40, add(signature, and(add(add(signatureLength, 0x20), 0x1f), not(0x1f))))
            mstore(signature, signatureLength)
            // Copy takerAssetData
            calldatacopy(add(signature, 32), add(signatureOffset, 32), signatureLength)
        }

        return signature;
    }
}
