import { ethers } from "ethers";

const parseStation = (station) => {
  return {
    id: station.id.toNumber(),
    title: station.title,
    address: station.stationAddress,
    longitude: Number(ethers.utils.formatEther(station.longitude)),
    latitude: Number(ethers.utils.formatEther(station.latitude)),
    price: Number(ethers.utils.formatEther(station.price)),
    chargeRate: Number(ethers.utils.formatEther(station.chargeRate)),
    owner: station.owner,
  };
};

const saveStation = async (station, wallet, contract) => {
  const stationTuple = [
    station.id,
    station.title,
    station.address,
    ethers.utils.parseEther(station.longitude.toString()),
    ethers.utils.parseEther(station.latitude.toString()),
    ethers.utils.parseEther(station.price.toString()),
    ethers.utils.parseEther(station.chargeRate.toString()),
    wallet.address,
  ];
  const contractWithSigner = contract.connect(wallet.signer);
  if (station.id === 0) {
    await contractWithSigner.createStation(stationTuple);
  } else {
    await contractWithSigner.editStation(stationTuple);
  }
};

const getBalance = async (signer) => {
  if (!signer) {
    return 0;
  }
  const balance = await signer.getBalance();
  return Number(ethers.utils.formatEther(balance));
};

export default { parseStation, saveStation, getBalance };
