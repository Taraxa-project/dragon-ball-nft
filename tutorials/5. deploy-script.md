In this section, we're going to deploy our Dragon Ball Super Token and Dragon Ball Super Ledger contracts. We’ll be using Hardhat, a powerful development tool for Ethereum. Let's get started.

Our script begins with importing ‘ethers’ from ‘hardhat’. The ‘ethers’ library is a collection of utilities for Ethereum which makes it easier to interact with the Ethereum blockchain.

We have a main async function that handles the deployment process. Asynchronous functions are crucial in blockchain development due to the nature of network requests and transactions.

We start by defining the total supply for our Dragon Ball Super Token. Here, we've set it to 10,000 tokens, taking into account the 18 decimal places used in Ethereum.

Next, we use Hardhat's ‘getContractFactory’ method to create a factory for our Dragon Ball Super Token contract. We then deploy the contract with our specified total supply. The ‘await’ keyword is used to ensure that the contract is fully deployed before moving on.

After deployment, we log the address of the deployed token contract. This address is essential for interacting with the contract on the blockchain.

Similarly, we deploy the Dragon Ball Super Ledger contract. Notice that we pass the address of the Dragon Ball Super Token as a parameter. This links our two contracts together.

We then log the address of the deployed Dragon Ball Super Ledger contract, just like we did with the token contract. This address is crucial for accessing and interacting with our NFT ledger on the blockchain.

The script concludes with a promise chain, ensuring a clean exit after successful deployment or logging errors in case of any issues. This is a standard practice in asynchronous programming, helping to manage the script’s execution flow.

[Scene: Final Thoughts on Deployment]

Deploying contracts with Hardhat is a straightforward process, but it's important to be mindful of details like contract addresses and parameters. Always test your deployments on a testnet before moving to the mainnet.

I encourage you to play around with this script. Try changing the total supply or linking different contracts. Deploying contracts is a fundamental skill in blockchain development, and the more you practice, the more proficient you'll become.

Thank you for following along with this tutorial on deploying smart contracts with Hardhat. If you have any questions or want to delve deeper into smart contract development, feel free to reach out.
