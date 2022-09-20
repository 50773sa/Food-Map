import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF } from "@react-google-maps/api"


const showMap = () => {
	const [currentPosition, setCurrentPosition] = useState({})
	

	// Find  and set user's position
	const onSuccess = async (pos) => {
		const positionCords  = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		setCurrentPosition(positionCords)
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess)
	}, [])
	
	

    return (
    	<GoogleMap 
			mapContainerClassName="map-container vh-100"
			zoom={13} 
			center={currentPosition} 
		>
			{currentPosition.lat && (
				<MarkerF position={currentPosition} />
			)}
     	</GoogleMap>
    );
}
export default showMap

