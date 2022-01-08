import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useContract = (contract, signer) => {
  const [instance, setInstance] = useState(null);
  useEffect(() => {
    const getInstance = async () => {
      const instance = new ethers.Contract(
        contract.address,
        contract.abi,
        signer
      );
      setInstance(instance);
    };
    getInstance();
  }, [signer]);

  return instance;
};

export default useContract;
