import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import EditStation from "../components/EditStation";
import PlusButton from "../components/PlusButton";
import SideBar from "../components/SideBar";
import Station from "../components/Station";
import Wallet from "../components/Wallet";
import useWallet from "../hooks/useWallet";
import useContract from "../hooks/useContract";
import contract from "../public/contracts/stations-contract.json";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const defaultStation = {
  title: null,
  address: null,
  price: null,
  chargeRate: null,
  longitude: null,
  latitue: null,
  owner: null,
};

export default function Home() {
  const wallet = useWallet();
  const stationsContract = useContract(contract, wallet.signer);

  const [location, setLocation] = useState({
    longitude: -93.625,
    latitude: 41.5868,
  });
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState(null);
  const [hoveringStation, setHoveringStation] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getStations = async () => {
      const stationData = await stationsContract.getAllStations();
      console.log(stationData);
      setStations(stationData);
    };

    if (stationsContract && stationsContract.signer) {
      getStations();
    }
  }, [stationsContract]);

  const createStation = () => {
    setEdit(true);
    setOpen(true);
    setStation(defaultStation);
  };

  const showStation = (station) => {
    setStation(station);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEdit(false);
    setStation(null);
  };

  return (
    <div className="flex flex-row justify-start items-start h-screen w-full overflow-hidden bg-gradient-to-b from-violet-800 to-indigo-900 text-slate-300">
      <SideBar
        stations={stations}
        setLocation={setLocation}
        selectedStation={station}
        showStation={showStation}
        hoveringStation={hoveringStation}
        onHoverStation={setHoveringStation}
      />
      <Map
        stations={stations}
        location={location}
        showStation={showStation}
        hoveringStation={hoveringStation}
        onHoverStation={setHoveringStation}
      />
      <PlusButton onClick={createStation} />
      <Wallet />
      {open && !edit && (
        <Station
          station={station}
          owner={station.owner == "0x0"}
          onClose={onClose}
          onEdit={() => setEdit(true)}
        />
      )}
      {open && edit && (
        <EditStation onClose={onClose} currentStation={station} />
      )}
    </div>
  );
}
