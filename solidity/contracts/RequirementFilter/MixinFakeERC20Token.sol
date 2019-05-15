pragma solidity ^0.4.24;

import "./libs/LibConstants.sol";


contract MixinFakeERC20Token is
    LibConstants
{
    /// @dev Fake `transferFrom` for scenorios like puzzle huting, airdrop, etc...
    /// @param from The address of the sender
    /// @param to The address of the recipient
    /// @param amount The amount of token to be transferred
    /// @return True if transfer was successful
    function transferFrom(address from, address to, uint256 amount)
        external returns (bool)
    {
        require(
            amount == 1,
            "INVALID_TAKER_ASSET_FILL_AMOUNT"
        );
        return true;
    }

    /// @dev Fake `allowance` for scenorios like puzzle huting, airdrop, etc...
    /// @param owner The address of the account owning tokens
    /// @param spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address owner, address spender)
        external pure returns (uint256)
    {
        return MAX_UINT;
    }
}
