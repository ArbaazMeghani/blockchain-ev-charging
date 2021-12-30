import { useState } from "react";
import dynamic from "next/dynamic";
import EditStation from "../components/EditStation";
import PlusButton from "../components/PlusButton";
import SideBar from "../components/SideBar";
import Station from "../components/Station";
import Wallet from "../components/Wallet";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const stations = [
  {
    id: 1,
    title: "1",
    address: "123 w something st, city, state 1234, united states",
    chargeRate: 200,
    price: 4.56,
    longitude: -93.625,
    latitude: 31.5868,
    owner: "0x0",
  },
];

export default function Home() {
  const [location, setLocation] = useState({
    longitude: -93.625,
    latitude: 41.5868,
  });
  const [station, setStation] = useState(stations[0]);
  const [hoveringStation, setHoveringStation] = useState(null);
  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState(false);

  const createStation = () => {
    setEdit(true);
    setOpen(true);
  };

  const showStation = (station) => {
    setStation(station);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
      {open && edit && <EditStation />}
    </div>
  );
}
