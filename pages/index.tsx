import { useState } from "react";
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import Wallet from "../components/Wallet";

const stations = [
  {
    title: "1",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 31.5868,
  },
  {
    title: "2",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 32.5868,
  },
  {
    title: "3",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 33.5868,
  },
  {
    title: "4",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 34.5868,
  },
  {
    title: "5",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 35.5868,
  },
  {
    title: "6",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 36.5868,
  },
  {
    title: "7",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 37.5868,
  },
  {
    title: "8",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 38.5868,
  },
  {
    title: "9",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 39.5868,
  },
  {
    title: "10",
    address: "123 w something st",
    price: 4.56,
    longitude: -93.625,
    latitude: 40.5868,
  },
];

export default function Home() {
  const [location, setLocation] = useState({
    longitude: -93.625,
    latitude: 41.5868,
  });
  return (
    <div className="flex flex-row justify-start items-start h-screen w-full overflow-hidden">
      <SideBar stations={stations} setLocation={setLocation} />
      <Map stations={stations} location={location} />
      <Wallet />
    </div>
  );
}
