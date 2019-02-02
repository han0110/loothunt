pragma solidity ^0.4.24;

import "./libs/LibConstants.sol";
import "./MixinExchangeCalldata.sol";
import "./MixinFakeERC20Token.sol";
import "./MixinRequirementFilterCore.sol";


contract RequirementFilter is
    LibConstants,
    MixinExchangeCalldata,
    MixinFakeERC20Token,
    MixinRequirementFilterCore
{
    constructor (address exchange)
        public
        LibConstants(exchange)
    {}
}
