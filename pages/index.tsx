import { createRef, forwardRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import EditStation from "../components/EditStation";
import PlusButton from "../components/PlusButton";
import SideBar from "../components/SideBar";
import Station from "../components/Station";
import Wallet from "../components/Wallet";
import useWallet from "../hooks/useWallet";
import useContract from "../hooks/useContract";
import contract from "../public/contracts/stations-contract.json";
import SearchBar from "../components/SearchBar";
import { ethers } from "ethers";
import { MapRef } from "react-map-gl";
import MenuIcon from "../icons/MenuIcon";
import useWindowSize from "../hooks/useWindowSize";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
const ForwardedRefMap = forwardRef((props, ref) => (
  <Map {...props} mapRef={ref} />
));

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

export default function Home() {
  const windowSize = useWindowSize();
  const wallet = useWallet();
  const stationsContract = useContract(contract, wallet.signer);
  const chainId = parseInt(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_CHAIN_ID);
  const [location, setLocation] = useState({
    longitude: -87.6244,
    latitude: 41.8765,
  });
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState(null);
  const [hoveringStation, setHoveringStation] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mapRef = createRef<MapRef>();

  useEffect(() => {
    if (windowSize[0] > 768) {
      setSidebarOpen(true);
    }
  }, [windowSize]);

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
      wallet.chainId === chainId
    ) {
      getStations();
    }
  }, [stationsContract, wallet.chainId]);

  const createStation = () => {
    if (wallet.chainId !== chainId) {
      return;
    }
    setEdit(true);
    setOpen(true);
    setStation(defaultStation);
  };

  const getBalance = async () => {
    if (!wallet.signer) {
      return 0;
    }

    const balance = await wallet.signer.getBalance();
    return Number(ethers.utils.formatEther(balance));
  };

  const onSaveStation = async (station) => {
    const stationTuple = [
      station.id,
      station.title,
      station.address,
      ethers.utils.parseEther(station.longitude.toString()),
      ethers.utils.parseEther(station.latitude.toString()),
      ethers.utils.parseEther(station.price.toString()),
      ethers.utils.parseEther(station.chargeRate.toString()),
      wallet.address,
    ];
    await wallet.signer.un;
    if (station.id === 0) {
      await stationsContract.createStation(stationTuple);
    } else {
      await stationsContract.editStation(stationTuple);
    }

    setEdit(false);
    setOpen(false);
  };

  const onDeleteStation = async (station) => {
    await stationsContract.burn(station.id);
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
      <div className="absolute top-0 w-full mt-4 z-10 md:hidden">
        <div className="flex flex-row justify-evenly items-center">
          <button
            className="text-violet-600"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </button>
          <SearchBar setLocation={setLocation} />
        </div>
      </div>
      <SideBar
        stations={stations}
        setLocation={setLocation}
        selectedStation={station}
        showStation={showStation}
        hoveringStation={hoveringStation}
        onHoverStation={setHoveringStation}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        mapRef={mapRef}
      />
      <ForwardedRefMap
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
          getBalance={getBalance}
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
