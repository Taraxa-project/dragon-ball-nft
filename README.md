# Getting Started

## Prerequistes

Must have TARA in your testnet account
Make sure you are connected to the correct network (recommended Taraxa Testnet)

## Setup Smart Contracts

Go to the project directory, you can run:

### `yarn install`

Create a new .env file and copy the contents from inside the .env.example
Replace the PRIVATE_KEY in the new .env with your own

Deploy the smart contracts on the Testnet network

### `yarn deploy-testnet`

The output will look something like this:
[DragonBallSuperToken]: Deployed at address: 0x3D81536A3b91F8c2A6ab49Eaa8F77299c63B0511
[DragonBallSuperLedger]: Deployed at address: 0x9DA8951085d91f7907E604CF4FA57B239eD97E04

Make sure you copy the two addresses in the frontend .env file

Don't forget to import the tokens from the DragonBallSuperToken in your wallet:

- Go to your wallet address that you used to deploy the contracts
- Go to Tokens tab and select `+Import tokens`
- Paste in your DragonBallSuperToken deployed address, in this case `0x3D81536A3b91F8c2A6ab49Eaa8F77299c63B0511`
- Click Import
- Now you can transfer to other accounts `DBS tokens`

## Setup Frontend

Go to the project directory, you can run:

### `yarn install`

Create a new .env file and copy the contents from inside the .env.example
Add the two copied addresses from the smart-contract output and paste them as values for the following variables:
REACT_APP_TOKEN_ADDRESS=0x3D81536A3b91F8c2A6ab49Eaa8F77299c63B0511
REACT_APP_LEDGER_ADDRESS=0x9DA8951085d91f7907E604CF4FA57B239eD97E04

You also need to provide values for IPFS if you are using infura or something similar and change the value REACT_APP_IPFS_USE_AUTH to true
In the case of a local setup with local IPFS you do not need to provide any values and leave REACT_APP_IPFS_USE_AUTH to false
Now you can run the following:

### `yarn start`

The app will start on localhost:3000

Before minting an NFT, go to localhost:3000/admin
Click Enable minting
Now you are ready to MINT NFT
