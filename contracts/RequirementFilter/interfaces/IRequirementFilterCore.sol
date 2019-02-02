pragma solidity ^0.4.24;

import "@0x/contracts-libs/contracts/libs/LibFillResults.sol";
import "@0x/contracts-libs/contracts/libs/LibOrder.sol";


contract IRequirementFilterCore {

    /// @dev Executes an Exchange transaction iff the maker and taker meet 
    ///      all requirements specified in `takerAssetData`
    ///      Supported Exchange functions:
    ///         - fillOrder
    ///      Trying to call any other exchange function will throw.
    /// @param salt Arbitrary number to ensure uniqueness of transaction hash.
    /// @param signerAddress Address of transaction signer.
    /// @param signedExchangeTransaction AbiV2 encoded calldata.
    /// @param signature Proof of signer transaction by signer.
    function executeTransaction(
        uint256 salt,
        address signerAddress,
        bytes signedExchangeTransaction,
        bytes signature
    ) 
        external
        returns (bool success);

    /// @dev Chech whether input signerAddress has achieved all
    ///      requirements specified in `takerAssetData`. Return
    ///      array of boolean of requirements' achievement.
    /// @param takerAssetData TakerAssetData extracted from signedExchangeTransaction.
    /// @param signerAddress Address of transaction signer.
    function getRequirementsAchieved(
        bytes memory takerAssetData,
        address signerAddress
    )
        public view
        returns (bool[] memory requirementsAchieved);
}
