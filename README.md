<img src="https://raw.githubusercontent.com/han0110/loothunt/master/frontend/client/assets/images/loothunt.png" width="300px" >

---

[**LootHunt**](https://hunt.lootex.dev) is a reward tool for airdrop marketing. Providers can offer a reward to anyone who meets the requirements. For users, it’s fun to collect NFTs and even unlock/discover other items. It is as amazing as treasure hunting!

## Introduction

This repository contains 0x extension contract **RequirementFilter**, which acts two roles

- **Requirements Checker**

  Implement a hook to check whether all requirements have been achieved by `signer` before calling `executeTransaction` to exchange.

- **Fake ERC20**

  Implement an always-success `transferFrom` interface for no need for taker asset, which is useful when holding an airdrop or hunting!

  Besides, in addition to take advantage of the feature of partial filling of 0x, we require the amount in `transferFrom` to be 1, which makes airdrop issuers more convenient to issue multiple amount of goods in one signing action (no need for transaction).

## Development

- ### Installing

```
git clone https://github.com/han0110/loothunt && cd loothunt
yarn
```

- ### Developing demo page

```
yarn dev
```

## Contributors

- [Han Jian](https://github.com/han0110)
- [Xavier Lupin](https://github.com/XavierLupin)
- [David Tseng](https://github.com/InjayTseng)
- Justine Lu