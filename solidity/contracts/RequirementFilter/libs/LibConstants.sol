/*

  Copyright 2018 ZeroEx Intl.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

pragma solidity ^0.4.24;

import "@0x/contracts-interfaces/contracts/protocol/Exchange/IExchange.sol";


contract LibConstants {

    bytes4 constant internal ERC20_DATA_ID = bytes4(keccak256("ERC20Token(address)"));
    bytes4 constant internal ERC721_DATA_ID = bytes4(keccak256("ERC721Token(address,uint256)"));
    bytes4 constant internal BALANCE_THRESHOLD_DATA_ID = bytes4(keccak256("BalanceThreshold(address,uint256)"));
    bytes4 constant internal OWNERSHIP_DATA_ID = bytes4(keccak256("Ownership(address,uint256)"));
    bytes4 constant internal FILLED_TIMES_DATA_ID = bytes4(keccak256("FilledTimes(uint256)"));
    uint256 constant internal MAX_UINT = 2**256 - 1;
 
    // solhint-disable var-name-mixedcase
    IExchange internal EXCHANGE;
    // solhint-enable var-name-mixedcase

    constructor (address exchange)
        public
    {
        EXCHANGE = IExchange(exchange);
    }
}
