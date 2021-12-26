import { useState } from "react";
import Map from "../components/Map";
import PlusButton from "../components/PlusButton";
import SideBar from "../components/SideBar";
import Station from "../components/Station";
import Wallet from "../components/Wallet";

const stations = [
  {
    id: 1,
    title: "1",
    streetAddress: "123 w something st",
    city: "city",
    state: "state",
    zipCode: "zip",
    chargeRate: 1,
    price: 4.56,
    longitude: -93.625,
    latitude: 31.5868,
  },
];

export default function Home() {
  const [location, setLocation] = useState({
    longitude: -93.625,
    latitude: 41.5868,
  });
  const [stationData, setStationData] = useState({ station: stations[0] });
  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState(false);
  return (
    <div className="flex flex-row justify-start items-start h-screen w-full overflow-hidden bg-gradient-to-b from-violet-800 to-indigo-900 text-slate-300">
      <SideBar stations={stations} setLocation={setLocation} />
      <Map stations={stations} location={location} />
      <PlusButton setStationData={setStationData} />
      <Wallet />
      {open && !edit && (
        <Station
          station={stationData.station}
          owner={true}
          onClose={() => setOpen(false)}
          onEdit={() => setEdit(true)}
        />
      )}
    </div>
  );
}
