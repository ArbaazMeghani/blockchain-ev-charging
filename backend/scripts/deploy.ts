import { ethers } from "hardhat";
import fs from "fs";
import { FormatTypes } from "ethers/lib/utils";

async function main() {
  const MyContract = await ethers.getContractFactory("Stations");
  const contract = await MyContract.deploy();

  await contract.deployed();

  console.log("Stations deployed to:", contract.address);
  const abi = contract.interface.format(FormatTypes.full);
  const deployment = {
    address: contract.address,
    abi,
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
