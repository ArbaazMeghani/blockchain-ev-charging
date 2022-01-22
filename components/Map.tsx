import dynamic from "next/dynamic";
import { forwardRef } from "react";

interface Props {
  stations: any;
  location: any;
  showStation: any;
  hoveringStation: any;
  onHoverStation: any;
  mapRef: any;
}

const DynamicMap = dynamic(() => import("./MapComponent"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
const Map = forwardRef((props: Props, ref) => (
  <DynamicMap {...props} mapRef={ref} />
));

export default Map;
