import { useLoadScript } from "@react-google-maps/api";
import ShowMap from "../components/ShowMap";

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <ShowMap />;
}

export default MapPage