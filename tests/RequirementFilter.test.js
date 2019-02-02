const { toHex, hexToNumber, randomHex } = require('web3-utils')
const eth = require('./utils/eth')
const deployer = require('./utils/deployer')
const {
  transferERC20Token,
  mintERC721Token,
  approveERC20,
  approveERC721,
  getBalances,
  getAssetsOwner,
} = require('./utils/tokenUtils')
const {
  BALANCE_THRESHOLD_DATA_ID,
  OWNERSHIP_DATA_ID,
  FILLED_TIMES_DATA_ID,
  NULL_ADDERSS,
  ZERO_UINT256,
  SMALL_DECIMAL,
  CX,
} = require('./utils/constants')
const {
  encodeERC20AssetData,
  encodeERC721AssetData,
  encodeRequirementData,
  getOrderHash,
  getZeroExTxHash,
  ecSignHash,
} = require('./utils/orderUtils')

describe('RequirementFilter', () => {
  let lootex
  let maker
  let other
  let hunterA
  let hunterB

  let exchange
  let erc20Proxy
  let erc721Proxy
  let requirementFilter
  let zrxToken
  let AAAToken
  let BBBToken
  let CCCToken
  let DDDToken

  let defaultOrder
  let defaultZeroExTx

  let orderFactory
  let zeroExTxFactory

  let tokenBalances
  let assetsOwner

  beforeAll(async () => {
    [lootex, maker, other, hunterA, hunterB] = await eth.getAccounts()
    eth.defaultAccount = lootex;

    [zrxToken, AAAToken, BBBToken] = await deployer.deployERC20([
      ['zrxToken', 'ZRC', toHex(SMALL_DECIMAL), toHex(100 * (10 ** SMALL_DECIMAL))],
      ['aToken', 'AAA', toHex(SMALL_DECIMAL), toHex(100 * (10 ** SMALL_DECIMAL))],
      ['bToken', 'BBB', toHex(SMALL_DECIMAL), toHex(100 * (10 ** SMALL_DECIMAL))],
    ]);
    [CCCToken, DDDToken] = await deployer.deployERC721([
      ['cToken', 'CCC'],
      ['dToken', 'DDD'],
    ]);
    [exchange, erc20Proxy, erc721Proxy] = await deployer.deployProtocol(zrxToken)
    requirementFilter = await deployer.deployRequirementFilter(exchange)

    await transferERC20Token([
      [zrxToken, maker, toHex(100 * (10 ** SMALL_DECIMAL))],
      [AAAToken, hunterA, toHex(10 ** SMALL_DECIMAL)],
      [BBBToken, hunterA, toHex(10 ** SMALL_DECIMAL)],
      [AAAToken, hunterB, toHex(10 ** SMALL_DECIMAL)],
    ])
    await mintERC721Token([
      [CCCToken, maker, toHex(777)],
      [CCCToken, hunterA, toHex(1)],
      [CCCToken, hunterA, toHex(2)],
      [CCCToken, hunterA, toHex(3)],
      [DDDToken, hunterA, toHex(1)],
      [DDDToken, hunterB, toHex(100)],
    ])
    await approveERC20(erc20Proxy, [zrxToken], maker)
    await approveERC721(erc721Proxy, [CCCToken], maker)

    defaultOrder = {
      exchangeAddress: exchange.options.address,
      makerAddress: maker,
      takerAddress: NULL_ADDERSS,
      feeRecipientAddress: NULL_ADDERSS,
      senderAddress: requirementFilter.options.address,
      makerAssetAmount: toHex(10 ** SMALL_DECIMAL),
      takerAssetAmount: toHex(1),
      makerFee: ZERO_UINT256,
      takerFee: ZERO_UINT256,
      expirationTimeSeconds: '0x5e1851cc',
      makerAssetData: encodeERC20AssetData(zrxToken.options.address),
      takerAssetData: encodeRequirementData(requirementFilter.options.address),
    }
    defaultZeroExTx = {
      exchangeAddress: exchange.options.address,
      salt: randomHex(32),
    }

    orderFactory = async (args = {}, signer) => {
      const order = {
        ...defaultOrder,
        ...args,
        salt: randomHex(32),
      }
      return {
        ...order,
        signature: await ecSignHash(eth, getOrderHash(order), signer),
      }
    }
    
    zeroExTxFactory = async (args = {}) => {
      const tx = {
        ...defaultZeroExTx,
        ...args,
        salt: randomHex(32),
      }
      return {
        ...tx,
        signature: await ecSignHash(eth, getZeroExTxHash(tx), args.signerAddress)
      }
    }
  }, 5000)
  afterAll(async () => {
    eth.currentProvider.disconnect()
  })
  beforeEach(async () => {
    await eth.lifecycle.start()
    tokenBalances = await getBalances(
      [zrxToken, AAAToken, BBBToken, CCCToken, DDDToken],
      [lootex, maker, other, hunterA, hunterB],
    )
    assetsOwner = await getAssetsOwner(
      [
        [CCCToken, [toHex(1), toHex(2), toHex(3), toHex(777)]],
        [DDDToken, [toHex(1), toHex(100)]],
      ],
    )
  }, 5000)
  afterEach(async () => {
    await eth.lifecycle.revert()
  })
  it('should get 1 ZRX with no requirements', async () => {
    const order = await orderFactory({}, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
  }, 5000)
  it('should get 1 ZRX with achieving 1 requirement (holding 1 AAA)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [AAAToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[B])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
  }, 5000)
  it('should get 1 ZRX with achieving 2 requirement (holding 1 AAA) + (holding 1 BBB)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [AAAToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [BBBToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[B,B])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
  }, 5000)
  it('should get 1 ZRX with achieving 1 requirement (holding CCC id = 1)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: OWNERSHIP_DATA_ID, args: [CCCToken.options.address, toHex(3)] },
        ]
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[O])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
  }, 5000)
  it('should get 1 ZRX with achieving 2 requirement (holding CCC id = 1) + (holding DDD id = 1)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: OWNERSHIP_DATA_ID, args: [CCCToken.options.address, toHex(1)] },
          { dataId: OWNERSHIP_DATA_ID, args: [DDDToken.options.address, toHex(1)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[B,O])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
  }, 5000)
  it('should get 1 ZRX with achieving 1 requirement (holding 3 CCC)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [CCCToken.options.address, toHex(3)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[B,O])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
  }, 5000)
  it('should get 1 ZRX with achieving 2 requirement (holding 1 BBB) + (holding CCC id = 1)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [BBBToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
          { dataId: OWNERSHIP_DATA_ID, args: [CCCToken.options.address, toHex(3)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[B,O])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
  }, 5000)
  it('should get CCC id = 777 with achieving 1 requirement (holding 1 AAA)', async () => {
    const order = await orderFactory({
      makerAssetData: encodeERC721AssetData(CCCToken.options.address, toHex(777)),
      makerAssetAmount: toHex(1),
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [AAAToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC721,[B])')

    const newTokenBalances = await getBalances([CCCToken, AAAToken], [maker, hunterA])
    const newAssetsOwner = await getAssetsOwner([[CCCToken, [toHex(777)]]])

    // Expect balances transfer
    expect(tokenBalances[CCCToken.options.address][maker] - newTokenBalances[CCCToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[CCCToken.options.address][hunterA] - tokenBalances[CCCToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
    // Ownership transfer
    expect(assetsOwner[CCCToken.options.address][toHex(777)]).toEqual(maker)
    expect(newAssetsOwner[CCCToken.options.address][toHex(777)]).toEqual(hunterA)
  }, 5000)
  it('should get CCC id = 777 with achieving 2 requirement (holding 1 AAA) + (holding 1 BBB)', async () => {
    const order = await orderFactory({
      makerAssetData: encodeERC721AssetData(CCCToken.options.address, toHex(777)),
      makerAssetAmount: toHex(1),
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [AAAToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [BBBToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC721,[B,B])')

    const newTokenBalances = await getBalances([CCCToken, AAAToken, BBBToken], [maker, hunterA])
    const newAssetsOwner = await getAssetsOwner([[CCCToken, [toHex(777)]]])

    // Expect balances transfer
    expect(tokenBalances[CCCToken.options.address][maker] - newTokenBalances[CCCToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[CCCToken.options.address][hunterA] - tokenBalances[CCCToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
    // Ownership transfer
    expect(assetsOwner[CCCToken.options.address][toHex(777)]).toEqual(maker)
    expect(newAssetsOwner[CCCToken.options.address][toHex(777)]).toEqual(hunterA)
  }, 5000)
  it('should get CCC id = 777 with achieving 1 requirement (holding CCC id = 1)', async () => {
    const order = await orderFactory({
      makerAssetData: encodeERC721AssetData(CCCToken.options.address, toHex(777)),
      makerAssetAmount: toHex(1),
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: OWNERSHIP_DATA_ID, args: [CCCToken.options.address, toHex(3)] },
        ]
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC721,[O])')

    const newTokenBalances = await getBalances([CCCToken], [maker, hunterA])
    const newAssetsOwner = await getAssetsOwner([[CCCToken, [toHex(777)]]])

    // Expect balances transfer
    expect(tokenBalances[CCCToken.options.address][maker] - newTokenBalances[CCCToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[CCCToken.options.address][hunterA] - tokenBalances[CCCToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
    // Ownership transfer
    expect(assetsOwner[CCCToken.options.address][toHex(777)]).toEqual(maker)
    expect(newAssetsOwner[CCCToken.options.address][toHex(777)]).toEqual(hunterA)
  }, 5000)
  it('should get CCC id = 777 with achieving 2 requirement (holding 1 BBB) + (holding CCC id = 1)', async () => {
    const order = await orderFactory({
      makerAssetData: encodeERC721AssetData(CCCToken.options.address, toHex(777)),
      makerAssetAmount: toHex(1),
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [BBBToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
          { dataId: OWNERSHIP_DATA_ID, args: [CCCToken.options.address, toHex(3)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC721,[B,O])')

    const newTokenBalances = await getBalances([CCCToken], [maker, hunterA])
    const newAssetsOwner = await getAssetsOwner([[CCCToken, [toHex(777)]]])

    // Expect balances transfer
    expect(tokenBalances[CCCToken.options.address][maker] - newTokenBalances[CCCToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount))
    expect(newTokenBalances[CCCToken.options.address][hunterA] - tokenBalances[CCCToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount))
    // Ownership transfer
    expect(assetsOwner[CCCToken.options.address][toHex(777)]).toEqual(maker)
    expect(newAssetsOwner[CCCToken.options.address][toHex(777)]).toEqual(hunterA)
  }, 5000)
  it('should get 0.1 ZRX for only 1 time (default)', async () => {
    const totalFillingTimes = 10
    const order = await orderFactory({
      takerAssetAmount: toHex(totalFillingTimes),
    }, maker)
    let tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[,0])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount) / totalFillingTimes)
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount) / totalFillingTimes)

    tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })
    await expect(eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[,1])')).rejects.toThrow(/FILLED_TIMES_EXCEEDED/)
  }, 5000)
  it('should get 0.1 ZRX for only 1 time (set)', async () => {
    const totalFillingTimes = 10
    const maxFillingTimes = 1
    const order = await orderFactory({
      takerAssetAmount: toHex(totalFillingTimes),
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: FILLED_TIMES_DATA_ID, args: [toHex(maxFillingTimes)] },
        ]
      )
    }, maker)
    let tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[T1,0])')

    const newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount) / totalFillingTimes)
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount) / totalFillingTimes)

    tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })
    await expect(eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[T1,1])')).rejects.toThrow(/FILLED_TIMES_EXCEEDED/)
  }, 5000)
  it('should get 0.1 ZRX for only 2 time (set)', async () => {
    const totalFillingTimes = 10
    const maxFillingTimes = 2
    const order = await orderFactory({
      takerAssetAmount: toHex(totalFillingTimes),
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: FILLED_TIMES_DATA_ID, args: [toHex(maxFillingTimes)] },
        ]
      )
    }, maker)
    let tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[T2,0])')

    let newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(hexToNumber(order.makerAssetAmount) / totalFillingTimes)
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(hexToNumber(order.makerAssetAmount) / totalFillingTimes)

    tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    }, 'fillOrder(ERC20,[T2,1])')

    newTokenBalances = await getBalances([zrxToken], [maker, hunterA])

    // Expect balances transfer
    expect(tokenBalances[zrxToken.options.address][maker] - newTokenBalances[zrxToken.options.address][maker]).toEqual(2 * hexToNumber(order.makerAssetAmount) / totalFillingTimes)
    expect(newTokenBalances[zrxToken.options.address][hunterA] - tokenBalances[zrxToken.options.address][hunterA]).toEqual(2 * hexToNumber(order.makerAssetAmount) / totalFillingTimes)

    tx = await zeroExTxFactory({
      signerAddress: hunterA,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await expect(eth.sendTransaction({
      from: hunterA,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    })).rejects.toThrow(/FILLED_TIMES_EXCEEDED/)
  }, 5000)
  it('should revert with insufficient balance (holding 1 BBB)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [BBBToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterB,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await expect(eth.sendTransaction({
      from: hunterB,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    })).rejects.toThrow(/AT_LEAST_ONE_REQUIREMENT_NOT_ACHIEVED/)
  }, 5000)
  it('should revert with insufficient balance (holding 3 CCC)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: BALANCE_THRESHOLD_DATA_ID, args: [CCCToken.options.address, toHex(10 ** SMALL_DECIMAL)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterB,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await expect(eth.sendTransaction({
      from: hunterB,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    })).rejects.toThrow(/AT_LEAST_ONE_REQUIREMENT_NOT_ACHIEVED/)
  }, 5000)
  it('should revert with insufficient ownership (holding DDD id = 1) + (holding DDD id = 100)', async () => {
    const order = await orderFactory({
      takerAssetData: encodeRequirementData(
        requirementFilter.options.address,
        [
          { dataId: OWNERSHIP_DATA_ID, args: [DDDToken.options.address, toHex(1)] },
          { dataId: OWNERSHIP_DATA_ID, args: [DDDToken.options.address, toHex(100)] },
        ],
      )
    }, maker)
    const tx = await zeroExTxFactory({
      signerAddress: hunterB,
      data: exchange.methods.fillOrder(order, toHex(1), order.signature).encodeABI(),
    })

    await expect(eth.sendTransaction({
      from: hunterB,
      to: requirementFilter.options.address,
      data: requirementFilter.methods.executeTransaction(tx.salt, tx.signerAddress, tx.data, tx.signature).encodeABI(),
      ...CX,
    })).rejects.toThrow(/AT_LEAST_ONE_REQUIREMENT_NOT_ACHIEVED/)
  }, 5000)
})
