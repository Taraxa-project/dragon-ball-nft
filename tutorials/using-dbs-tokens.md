Welcome back! In this part of our tutorial, we're going to learn how to use the address of our newly deployed Dragon Ball Super Token (DBS) and how to import these tokens into a wallet. This is an exciting step, as it brings our development work into the real world. Let's get started.

Recall in our deployment script, after deploying the DBS token, we logged its contract address to the console. This address is the unique identifier for our token on the blockchain.

First, you'll need to find the address that was logged during deployment. It should look something like this: 'Deployed at address: 0x123...'. Copy this address as we'll be using it shortly.

Now, let’s talk about Ethereum wallets and private keys. A wallet allows you to interact with Ethereum blockchain, and the private key is what grants you access to the tokens and assets within it.

Remember, your private key is extremely sensitive information. Never share it and always keep it secure. For the purpose of this tutorial, we're using a private key from our .env file, which should be kept confidential.

To import your DBS tokens into a wallet, you’ll need two things: the token’s contract address, which we've just located, and access to an Ethereum wallet that supports custom tokens, like MetaMask.

Open your Ethereum wallet. For this example, let's assume you're using MetaMask.
Navigate to the ‘Assets’ tab in your wallet.
You'll see an option to ‘Import Tokens’ or ‘Add Token’. Click on that. 4. In the token import section, enter the DBS token contract address that you copied earlier. The wallet should automatically fill in the token symbol (DBS) and its decimals if it's a recognized token on the network.

If required, confirm the addition of the token to your wallet.

Now, to access the tokens, you'll need the account associated with the private key in your .env file. If this account is not already in your wallet, you'll need to import it.

In MetaMask or your chosen wallet, look for an option to ‘Import Account’ or ‘Add Account’.
Select the option to import an account using a private key.
Enter the private key from your .env file. Remember, do this in a secure and private environment to prevent exposure of your key.
Once the account is imported, you should be able to see your DBS tokens under the ‘Assets’ tab if the account had any DBS tokens from the contract deployment.

Again, I want to remind you about the importance of security. Importing accounts and handling private keys should be done with utmost care. Only use secure and trusted wallets, and never expose your private keys publicly.

Now you know how to import and view your custom DBS tokens in your wallet! This process is essential for testing and interacting with tokens you develop. I encourage you to explore further - try sending tokens to another account, or add your token to other wallets to understand the process fully.

Thank you for following along in this tutorial. We've covered a lot, from deploying our token to importing it into a wallet. If you have any questions or want to learn more about blockchain development, feel free to reach out. Until next time, happy coding and stay secure!
