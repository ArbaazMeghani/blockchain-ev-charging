import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import stationUtils from "../utils";

const useStations = (contract) => {
  const [stations, _setStations] = useState([]);
  const stationsRef = useRef(stations);

  const setStations = (stations) => {
    stationsRef.current = stations;
    _setStations(stations);
  };

  useEffect(() => {
    const getStations = async () => {
      const stations = await contract.getAllStations();
      setStations(stations.map(stationUtils.parseStation));
    };

    if (contract) {
      getStations();
      contract.removeAllListeners();

      contract.on("StationCreated", async (stationId) => {
        const newStation = await contract.getStation(stationId);
        setStations([
          ...stationsRef.current,
          stationUtils.parseStation(newStation),
        ]);
      });

      contract.on("StationUpdated", async (stationId) => {
        const updatedStation = await contract.getStation(stationId);
        const parsedStation = stationUtils.parseStation(updatedStation);
        const updatedStations = stationsRef.current.map((station) =>
          station.id === parsedStation.id ? parsedStation : station
        );
        setStations(updatedStations);
      });

      contract.on("StationDeleted", (stationId) => {
        const updatedStations = stationsRef.current.filter(
          (station) => station.id !== stationId.toNumber()
        );
        setStations(updatedStations);
      });

      contract.on("StationInUse", (stationId, duration) => {
        const seconds = Number(ethers.utils.formatEther(duration));

        const setInUseUntil = (stationId, inUseUntil) => {
          const updatedStations = stationsRef.current.map((station) => {
            if (station.id === stationId.toNumber()) {
              station.inUseUntil = inUseUntil;
            }
            return station;
          });
          setStations(updatedStations);
        };

        const customEvent = new CustomEvent("ChargeComplete", {
          detail: stationId.toNumber(),
        });

        setTimeout(() => {
          setInUseUntil(stationId, null);
          window.dispatchEvent(customEvent);
        }, seconds * 1000);

        setInUseUntil(stationId, Date.now() + seconds * 1000);
      });

      return () => {
        contract.removeAllListeners();
      };
    }
  }, [contract]);

  return stations;
};

export default useStations;
