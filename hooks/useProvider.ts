import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useProvider = () => {
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    const network = ethers.providers.getNetwork(
      Number(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_CHAIN_ID)
    );
    const provider = new ethers.providers.AlchemyProvider(
      network,
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    );
    setProvider(provider);
  }, []);

  return provider;
};

export default useProvider;
