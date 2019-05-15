pragma solidity ^0.4.24;

import "../interfaces/IRequirementFilterCore.sol";


contract MRequirementFilterCore is
    IRequirementFilterCore
{
    // Mapping of orderHash => (takerAddress => times of the order filled by taker)
    mapping(bytes32 => mapping(address => uint256)) public filledTimes;

    /// @dev Validates signerAddress's filling times is in limitation. Succeeds or throws.
    /// @param takerAssetData TakerAssetData extracted from signedExchangeTransaction.
    /// @param embeddedSignature Signature extracted from signedExchangeTransaction.
    /// @param signerAddress Signer of signedExchangeTransaction.
    function assertValidFilledTimes(bytes memory takerAssetData, bytes memory embeddedSignature, address signerAddress)
        internal
        returns (bool);

    /// @dev Validates all requirements' achievement. Succeeds or throws.
    /// @param takerAssetData TakerAssetData extracted from signedExchangeTransaction.
    /// @param signerAddress Signer of signedExchangeTransaction.
    function assertRequirementsAchieved(bytes memory takerAssetData, address signerAddress)
        internal view
        returns (bool);
}
