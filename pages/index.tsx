import { createRef, useState } from "react";
import EditStation from "../components/EditStation";
import PlusButton from "../components/PlusButton";
import SideBar from "../components/SideBar";
import Station from "../components/Station";
import Wallet from "../components/Wallet";
import useWallet from "../hooks/useWallet";
import useContract from "../hooks/useContract";
import contract from "../public/contracts/stations-contract.json";
import { MapRef } from "react-map-gl";
import useProvider from "../hooks/useProvider";
import useStations from "../hooks/useStations";
import stationUtils from "../utils";
import Map from "../components/Map";

const defaultStation = {
  id: 0,
  title: "",
  address: "",
  longitude: "",
  latitude: "",
  price: "",
  chargeRate: "",
  owner: null,
};

const defaultLocation = {
  longitude: -87.6244,
  latitude: 41.8765,
};

export default function Home() {
  const provider = useProvider();
  const wallet = useWallet();
  const stationsContract = useContract(contract, provider);
  const stations = useStations(stationsContract);
  const chainId = parseInt(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_CHAIN_ID);
  const [location, setLocation] = useState(defaultLocation);
  const [station, setStation] = useState(null);
  const [hoveringStation, setHoveringStation] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const mapRef = createRef<MapRef>();

  const createStation = () => {
    if (wallet.chainId !== chainId) {
      return;
    }
    setEdit(true);
    setOpen(true);
    setStation(defaultStation);
  };

  const onSaveStation = async (station) => {
    await stationUtils.saveStation(station, wallet, stationsContract);
    setEdit(false);
    setOpen(false);
  };

  const onDeleteStation = async (station) => {
    const contractWithSigner = stationsContract.connect(wallet.signer);
    await contractWithSigner.burn(station.id);
    setOpen(false);
  };

  const showStation = (station) => {
    if (wallet.chainId !== chainId) {
      return;
    }
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
        mapRef={mapRef}
      />
      <Map
        stations={stations}
        location={location}
        showStation={showStation}
        hoveringStation={hoveringStation}
        onHoverStation={setHoveringStation}
        ref={mapRef}
      />
      <PlusButton onClick={createStation} />
      <div className="hidden md:block absolute top-0 right-0 mr-12 mt-12">
        <Wallet />
      </div>
      {open && !edit && (
        <Station
          station={station}
          owner={wallet.address && station.owner == wallet.address}
          onClose={onClose}
          onEdit={() => setEdit(true)}
          onDelete={() => onDeleteStation(station)}
          stationsContract={stationsContract}
        />
      )}
      {open && edit && (
        <EditStation
          onClose={onClose}
          currentStation={station}
          onSave={onSaveStation}
        />
      )}
    </div>
  );
}
