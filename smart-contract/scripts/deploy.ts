import { ethers } from "hardhat";

async function main() {
  const totalSupply = "10000000000000000000000"; // 10000 * 1e18

  const DragonBallSuperTokenContract = await ethers.getContractFactory(
    "DragonBallSuperToken"
  );
  const dragonBallSuperToken = await DragonBallSuperTokenContract.deploy(
    totalSupply
  );
  await dragonBallSuperToken.deployed();
  console.log(
    `[DragonBallSuperToken]: Deployed at address:`,
    dragonBallSuperToken.address
  );

  const DragonBallSuperLedgerContract = await ethers.getContractFactory(
    "DragonBallSuperLedger"
  );
  const dragonBallSuperLedger = await DragonBallSuperLedgerContract.deploy(
    dragonBallSuperToken.address
  );
  await dragonBallSuperLedger.deployed();
  console.log(
    `[DragonBallSuperLedger]: Deployed at address:`,
    dragonBallSuperLedger.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
