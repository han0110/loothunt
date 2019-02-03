export const CONTRACT_ADDRESSES = {
  ERC20_PROXY: '0x2240dab907db71e64d3e0dba4800c83b5c502d4e',
  ERC721_PROXY: '0x208e41fb445f1bb1b6780d58356e81405f3e6127',
  ZRX_TOKEN: '0xe41d2489571d322189246dafa5ebde1f4699f498',
  ETHER_TOKEN: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  EXCHANGE: '0x4f833a24e1f95d70f028921e27040ca56e09ab0b',
  ASSET_PROXY_OWNER: '0x17992e4ffb22730138e4b62aaa6367fa9d3699a6',
  FORWARDER: '0x5468a1dc173652ee28d249c271fa9933144746b1',
  ORDER_VALIDATOR: '0x9463e518dea6810309563c81d5266c1b1d149138',
  REQUIREMENT_FILTER: '0xce2bf8f5c9b88c62e20e7166acc7294fc147a13e'
}

export const EIP712_SCHEMAS = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'verifyingContract', type: 'address' },
  ],
  Order: [
    { name: 'makerAddress', type: 'address' },
    { name: 'takerAddress', type: 'address' },
    { name: 'feeRecipientAddress', type: 'address' },
    { name: 'senderAddress', type: 'address' },
    { name: 'makerAssetAmount', type: 'uint256' },
    { name: 'takerAssetAmount', type: 'uint256' },
    { name: 'makerFee', type: 'uint256' },
    { name: 'takerFee', type: 'uint256' },
    { name: 'expirationTimeSeconds', type: 'uint256' },
    { name: 'salt', type: 'uint256' },
    { name: 'makerAssetData', type: 'bytes' },
    { name: 'takerAssetData', type: 'bytes' },
  ],
  ZeroExTransaction: [
    { name: 'salt', type: 'uint256' },
    { name: 'signerAddress', type: 'address' },
    { name: 'data', type: 'bytes' },
  ],
}

export const EIP712_DOMAIN = {
  name: '0x Protocol',
  version: '2',
  verifyingContract: CONTRACT_ADDRESSES.EXCHANGE,
}

export const ASSET_DATA_IDS = {
  ERC20: 'ERC20Token(address)',
  ERC721: 'ERC721Token(address,uint256)',
  MULTI_ASSET: 'MultiAsset(uint256[],bytes[])',
  BALANCE_THRESHOLD: 'BalanceThreshold(address,uint256)',
  OWNERSHIP: 'Ownership(address,uint256)',
  FILLED_TIMES: 'FilledTimes(uint256)',
}

export const ASSET_DATA_SELECTORS = {
  ERC20: '0xf47261b0',
  ERC721: '0x02571792',
  MULTI_ASSET: '0x94cfcdd7',
  BALANCE_THRESHOLD: '0x64612554',
  OWNERSHIP: '0xcc0234e7',
  FILLED_TIMES: '0xd68b1106',
}

export const SINGATURE_TYPES = {
  EIP712: '02',
  ETH_SIGN: '03',
  WALLET: '04',
  VALIDATOR: '05',
  PRE_SIGNED: '06',
}

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const MAX_UINT256 =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'