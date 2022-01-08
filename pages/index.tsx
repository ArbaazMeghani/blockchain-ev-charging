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
import { ethers } from "ethers";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const defaultStation = {
  id: 0,
  title: null,
  address: null,
  longitude: null,
  latitude: null,
  price: null,
  chargeRate: null,
  owner: null,
};

export default function Home() {
  const wallet = useWallet();
  const stationsContract = useContract(contract, wallet.signer);

  const [location, setLocation] = useState({
    longitude: -87.6244,
    latitude: 41.8765,
  });
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState(null);
  const [hoveringStation, setHoveringStation] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getStations = async () => {
      const stationData = await stationsContract.getAllStations();
      const stations = stationData.map((station) => ({
        id: station.id.toNumber(),
        title: station.title,
        address: station.stationAddress,
        longitude: Number(ethers.utils.formatEther(station.longitude)),
        latitude: Number(ethers.utils.formatEther(station.latitude)),
        price: Number(ethers.utils.formatEther(station.price)),
        chargeRate: Number(ethers.utils.formatEther(station.chargeRate)),
        owner: station.owner,
      }));
      setStations(stations);
    };

    if (
      stationsContract &&
      stationsContract.signer &&
      wallet.network.chainId ===
        process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_CHAIN_ID
    ) {
      getStations();
    }
  }, [stationsContract]);

  const createStation = () => {
    if (
      !wallet.signer ||
      wallet.network.chainId !==
        process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_CHAIN_ID
    ) {
      return;
    }
    setEdit(true);
    setOpen(true);
    setStation(defaultStation);
  };

  const onSaveStation = async (station) => {
    console.log(station);
    if (station.id === 0) {
      station.owner = wallet.address;
      await stationsContract.createStation([
        station.id,
        station.title,
        station.address,
        ethers.utils.parseEther(station.longitude.toString()),
        ethers.utils.parseEther(station.latitude.toString()),
        ethers.utils.parseEther(station.price.toString()),
        ethers.utils.parseEther(station.chargeRate.toString()),
        station.owner,
      ]);
    } else {
      await stationsContract.updateStation(station);
    }
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
          owner={wallet.address && station.owner == wallet.address}
          onClose={onClose}
          onEdit={() => setEdit(true)}
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
