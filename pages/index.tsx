import Head from "next/head";
import Map from "../components/Map";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row justify-center items-center h-screen w-screen">
        <Map />
      </div>
    </div>
  );
}
