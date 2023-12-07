# Assessment Smart Contract and Script

## Overview

This Solidity smart contract, named Assessment, provides basic functionalities for handling deposits, withdrawals, and transfers of Ethereum funds. It includes access control to ensure that only the owner (specified during contract deployment) can perform certain operations.

#### Contract Address

The contract is deployed at the following address:

```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

#### Contract ABI

The ABI (Application Binary Interface) for the contract can be found in the `artifacts/contracts/Assessment.sol/Assessment.json` file.

### Smart Contract Features

Deposit: The owner can deposit funds into the contract.
Withdraw: The owner can withdraw funds from the contract, provided there is a sufficient balance.
Transfer: The owner can transfer funds to another contract address.

### Usage

To interact with the smart contract a frontend script is provided for the integration. 
The necessary dependencies installed and follow the instructions in the script section.

## Frontend Script

### HomePage.js

This React script serves as the frontend for interacting with the Assessment smart contract. It connects to the MetaMask wallet, allows the user to deposit, withdraw, and transfer funds. Additionally, it displays account information and balances.

#### Dependencies

- React
- ethers.js
- MetaMask

#### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the application:

   ```bash
   npm start
   ```

3. Connect your MetaMask wallet to interact with the smart contract.

### Script Features
Connect Wallet: Allows the user to connect their MetaMask wallet.
Deposit: Deposits 1 ETH into the smart contract.
Withdraw: Withdraws 1 ETH from the smart contract.
Transfer: Transfers a specified amount of ETH to another contract address.

## Author
Jeremiah Samuel
livinalt@gmail.com

## License

This project is licensed under the MIT License 
