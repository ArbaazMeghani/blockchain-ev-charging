import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useContract = (contract, provider) => {
  const [instance, setInstance] = useState(null);
  useEffect(() => {
    const getInstance = async () => {
      const instance = new ethers.Contract(
        contract.address,
        contract.abi,
        provider
      );
      setInstance(instance);

      instance.on("StationCreated", (stationId) => {
        console.log(`Station ${stationId} created`);
      });

      instance.on("StationDeleted", (stationId) => {
        console.log(`Station ${stationId} removed`);
      });

      instance.on("StationUpdated", (stationId) => {
        console.log(`Station ${stationId} updated`);
      });

      instance.on("StationInUse", (stationId, endTime) => {
        console.log(`Station ${stationId} in use until ${endTime}`);
      });
    };
    if (provider) {
      getInstance();
    }

    return () => {
      if (instance) {
        instance.removeAllListeners();
      }
    };
  }, [provider]);

  return instance;
};

export default useContract;
