import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    const getWallet = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(accounts[0]);
      setProvider(provider);
      setAddress(await signer.getAddress());
      setSigner(signer);
    };
    if (window.ethereum) {
      getWallet();
    }
  }, []);

  return {
    address,
    provider,
    signer,
  };
};

export default useWallet;
