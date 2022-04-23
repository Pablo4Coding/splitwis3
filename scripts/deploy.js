/* scripts/deploy.js */
const hre = require('hardhat');
const fs = require('fs');

async function main() {
  /* these two lines deploy the contract to the network */
  const signers = await hre.ethers.getSigners();

  const SplitConnect = await hre.ethers.getContractFactory('SplitConnect');
  const splitConnect = await SplitConnect.deploy('ETHAmsterdam group', [
    '0xdc4a210b6dbdab5ec77974df417310d20230d5b0',
    await signers[0].getAddress(),
  ]);

  await splitConnect.deployed();
  console.log('Blog deployed to:', splitConnect.address);

  await splitConnect.addExpense('Trip', 123);
  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync(
    './config.js',
    `
  export const contractAddress = "${splitConnect.address}"
  export const ownerAddress = "${splitConnect.signer.address}"
  `,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
