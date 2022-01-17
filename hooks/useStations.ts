import { ethers } from "ethers";
import { useEffect, useState } from "react";
import stationUtils from "../utils";

const useStations = (contract) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const getStations = async () => {
      const stations = await contract.getStations();
      setStations(stations.map(stationUtils.parseStation));
    };

    if (contract) {
      getStations();
      contract.removeAllListeners();

      contract.on("StationCreated", async (stationId) => {
        const newStation = await contract.getStation(stationId);
        setStations([...stations, stationUtils.parseStation(newStation)]);
      });

      contract.on("StationUpdated", async (stationId) => {
        const updatedStation = await contract.getStation(stationId);
        const parsedStation = stationUtils.parseStation(updatedStation);
        const updatedStations = stations.map((station) =>
          station.id === parsedStation.id ? parsedStation : station
        );
        setStations(updatedStations);
      });

      contract.on("StationDeleted", (stationId) => {
        const updatedStations = stations.filter(
          (station) => station.id !== stationId.toNumber()
        );
        setStations(updatedStations);
      });

      contract.on("StationInUse", (stationId, duration) => {
        const seconds = Number(ethers.utils.formatEther(duration));
        const updatedStations = stations.map((station) => {
          if (station.id === stationId.toNumber()) {
            station.inUseUntil = Date.now() + seconds * 1000;
          }
          return station;
        });
        setStations(updatedStations);
      });

      return () => {
        contract.removeAllListeners();
      };
    }
  }, [contract]);

  return stations;
};

export default useStations;
