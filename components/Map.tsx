import dynamic from "next/dynamic";
import { forwardRef } from "react";

const DynamicMap = dynamic(() => import("./MapComponent"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
const Map = forwardRef((props, ref) => <DynamicMap {...props} mapRef={ref} />);

export default Map;
