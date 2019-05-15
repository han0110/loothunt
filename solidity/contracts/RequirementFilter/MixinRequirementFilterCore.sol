pragma solidity ^0.4.24;

import "./libs/LibConstants.sol";
import "./interfaces/IRequiredAsset.sol";
import "./mixins/MExchangeCalldata.sol";
import "./mixins/MRequirementFilterCore.sol";
import "@0x/contracts-interfaces/contracts/protocol/Exchange/IExchange.sol";
import "@0x/contracts-libs/contracts/libs/LibExchangeSelectors.sol";
import "@0x/contracts-libs/contracts/libs/LibFillResults.sol";
import "@0x/contracts-libs/contracts/libs/LibOrder.sol";
import "@0x/contracts-utils/contracts/utils/LibBytes/LibBytes.sol";


contract MixinRequirementFilterCore is
    LibConstants,
    LibExchangeSelectors,
    MExchangeCalldata,
    MRequirementFilterCore
{
    using LibBytes for bytes;

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
        returns (bool success)
    {
        bytes4 exchangeCalldataSelector = bytes4(exchangeCalldataload(0));

        require(
            exchangeCalldataSelector == LibExchangeSelectors.FILL_ORDER_SELECTOR,
            "INVALID_EXCHANGE_SELECTOR"
        );

        (uint256 takerAssetAmount, bytes memory takerAssetData) = loadTakerAssetDataFromOrder();
        bytes memory embeddedSignature = loadSignatureFromExchangeCalldata();

        // Assert valid filled times if takerAssetAmoun is larger than 1
        if (takerAssetAmount > 1) {
            assertValidFilledTimes(takerAssetData, embeddedSignature, signerAddress);
        }
        // Assert all requirements achieved
        assertRequirementsAchieved(takerAssetData, signerAddress);

        // All assertion passed. Execute exchange function.
        EXCHANGE.executeTransaction(
            salt,
            signerAddress,
            signedExchangeTransaction,
            signature
        );

        return true;
    }

    /// @dev Chech whether input signerAddress has achieved all
    ///      requirements specified in `takerAssetData`. Return
    ///      array of boolean of requirements' achievement.
    /// @param takerAssetData TakerAssetData extracted from signedExchangeTransaction.
    /// @param signerAddress Address of transaction signer.
    function getRequirementsAchieved(bytes memory takerAssetData, address signerAddress)
        public view
        returns (bool[] memory requirementsAchieved)
    {
        uint256 index;
        bytes4 proxyId = takerAssetData.readBytes4(0);

        if (proxyId == ERC20_DATA_ID) {
            index = 36;
        } else if (proxyId == ERC721_DATA_ID) {
            index = 68;
        } else {
            revert("UNSUPPORTED_ASSET_PROXY");
        }

        uint256 requirementsNumber = 0;
        uint256 takerAssetDataLength = takerAssetData.length;
        requirementsAchieved = new bool[]((takerAssetDataLength - index) / 68);

        while (index < takerAssetDataLength) {
            bytes4 dataId = takerAssetData.readBytes4(index);
            address tokenAddress = takerAssetData.readAddress(index + 16);
            IRequiredAsset requiredToken = IRequiredAsset(tokenAddress);

            if (dataId == BALANCE_THRESHOLD_DATA_ID) {
                uint256 balanceThreshold = takerAssetData.readUint256(index + 36);
                requirementsAchieved[requirementsNumber] = requiredToken.balanceOf(signerAddress) >= balanceThreshold;
                requirementsNumber += 1;
                index += 68;
            } else if (dataId == OWNERSHIP_DATA_ID) {
                uint256 tokenId = takerAssetData.readUint256(index + 36);
                requirementsAchieved[requirementsNumber] = requiredToken.ownerOf(tokenId) == signerAddress;
                requirementsNumber += 1;
                index += 68;
            } else if (dataId == FILLED_TIMES_DATA_ID) {
                index += 36;
            } else {
                revert("UNSUPPORTED_METHOD");
            }
        }

        return requirementsAchieved;
    }

    /// @dev Validates signerAddress's filling times is in limitation. Succeeds or throws.
    /// @param takerAssetData TakerAssetData extracted from signedExchangeTransaction.
    /// @param embeddedSignature Signature extracted from signedExchangeTransaction.
    /// @param signerAddress Signer of signedExchangeTransaction.
    function assertValidFilledTimes(bytes memory takerAssetData, bytes memory embeddedSignature, address signerAddress)
        internal
        returns (bool)
    {
        uint256 takerAssetDataLength = takerAssetData.length;
        bytes32 signatureHash = keccak256(embeddedSignature);
        uint256 filledTimesLimit = 1;

        if (takerAssetData.readBytes4(takerAssetDataLength - 36) == FILLED_TIMES_DATA_ID) {
            filledTimesLimit = takerAssetData.readUint256(takerAssetDataLength - 32);
        }

        require(
            filledTimes[signatureHash][signerAddress] < filledTimesLimit,
            "FILLED_TIMES_EXCEEDED"
        );

        filledTimes[signatureHash][signerAddress] += 1;

        return true;
    }

    /// @dev Validates all requirements' achievement. Succeeds or throws.
    /// @param takerAssetData TakerAssetData extracted from signedExchangeTransaction.
    /// @param signerAddress Signer of signedExchangeTransaction.
    function assertRequirementsAchieved(bytes memory takerAssetData, address signerAddress)
        internal view
        returns (bool)
    {
        bool[] memory requirementsAchieved = getRequirementsAchieved(takerAssetData, signerAddress);
        uint256 requirementsAchievedLength = requirementsAchieved.length;

        for (uint256 i = 0; i < requirementsAchievedLength; i += 1) {
            require(
                requirementsAchieved[i],
                "AT_LEAST_ONE_REQUIREMENT_NOT_ACHIEVED"
            );
        }

        return true;
    }
}
