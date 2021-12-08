import { useState } from "react";
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import Wallet from "../components/Wallet";

const sampleData = [
  {
    title: "1",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "2",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "3",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "4",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "5",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "6",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "7",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "8",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "9",
    address: "123 w something st",
    price: 4.56,
  },
  {
    title: "10",
    address: "123 w something st",
    price: 4.56,
  },
];

export default function Home() {
  const [location, setLocation] = useState();
  return (
    <div className="flex flex-row justify-start items-start h-screen w-full overflow-hidden">
      <SideBar data={sampleData} setLocation={setLocation} />
      <Map />
      <Wallet />
    </div>
  );
}
