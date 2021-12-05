import React, { FC } from "react";
import GoogleMapReact from "google-map-react";

const Map: FC = (): JSX.Element => {
  const coordinates = {
    lat: 10,
    lng: 10,
  };
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50, 50, 50, 50]}
      options={{}}
      onChange={() => console.log("change")}
      onChildClick={() => console.log("child click")}
    ></GoogleMapReact>
  );
};

export default Map;
