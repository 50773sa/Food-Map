import { useLoadScript } from "@react-google-maps/api";
import ShowMap from "../components/ShowMap";


const MapPage = () => {
  	const { isLoaded } = useLoadScript({
   		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    
  	})

 	return (
    	<>
			{!isLoaded && <div>Loading...</div>}

    		{isLoaded && (
           		<ShowMap  />
    		)}	
    	</>
  	)
}

export default MapPage