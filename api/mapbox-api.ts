import Axios from "axios";

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export const getMatchingAddresses = async (address: string) => {
  const response = await Axios.get(
    `${url}/${encodeURIComponent(address)}.json?access_token=${
      process.env.NEXT_PUBLIC_MAPBOX_API_KEY
    }`
  );
  return response.data.features.map((feature) => ({
    address: feature.place_name,
    longitude: feature.center[0],
    latitude: feature.center[1],
  }));
};
