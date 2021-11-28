import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const MyContract = await ethers.getContractFactory("Greeter");
  const contract = await MyContract.deploy("Hello, Hardhat!");

  await contract.deployed();

  console.log("Greeter deployed to:", contract.address);
  const deployment = {
    address: contract.address,
    abi: contract.interface,
  };
  fs.writeFileSync(
    `${process.env.DEPLOYMENT_LOCATION}/${contract.address}.json`,
    JSON.stringify(deployment)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
