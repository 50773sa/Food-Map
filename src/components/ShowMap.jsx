import { useMemo } from "react";
import { GoogleMap,  MarkerF } from "@react-google-maps/api";

const showMap = () => {
    const center = useMemo(() => ({ lat: 56, lng: 17 }), []);
  
    return (
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container vh-100">
        <MarkerF position={center} />
      </GoogleMap>
    );
}
export default showMap

