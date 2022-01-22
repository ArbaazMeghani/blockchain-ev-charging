import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare let window: any;

const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  useEffect(() => {
    const getWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner(accounts[0]);
        const chainId = await signer.getChainId();

        setAddress(await signer.getAddress());
        setSigner(signer);
        setChainId(chainId);
      } catch (error) {
        console.error(error);
      }
    };
    if (window.ethereum) {
      getWallet();

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (!accounts) {
          setAddress(null);
          setSigner(null);
          setChainId(null);
          return;
        }
        getWallet();
      });

      window.ethereum.on("chainChanged", () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return {
    address,
    signer,
    chainId,
  };
};

export default useWallet;
