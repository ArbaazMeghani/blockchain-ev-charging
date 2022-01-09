import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [network, setNetwork] = useState(null);
  useEffect(() => {
    const getWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner(accounts[0]);
        const network = await provider.getNetwork();

        setProvider(provider);
        setAddress(await signer.getAddress());
        setSigner(signer);
        setNetwork(network);
      } catch (error) {
        console.error(error);
      }
    };
    if (window.ethereum) {
      getWallet();

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (!accounts) {
          setProvider(null);
          setAddress(null);
          setSigner(null);
          setNetwork(null);
          return;
        }
        getWallet();
      });

      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  return {
    address,
    provider,
    signer,
    network,
  };
};

export default useWallet;
