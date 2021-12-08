import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";

export default function Home() {
  const [location, setLocation] = useState();
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header location={location} setLocation={setLocation} />
      <div className="flex flex-row justify-start items-start h-full w-full">
        <List data={[]} />
        <Map />
      </div>
    </div>
  );
}
