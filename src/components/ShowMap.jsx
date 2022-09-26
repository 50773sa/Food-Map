import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF, InfoWindowF} from "@react-google-maps/api"
import useGetRestaurants from "../hooks/useGetRestaurants"
import InfoBox from "./InfoBox"


const showMap = ({ }) => {
	const [restaurant, setRestaurant] = useState(null)
	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})

	// console.log('selected restaurant:', selectedRestaurant)
	const {data: restaurants} = useGetRestaurants()

	// Find  and set user's position
	const onSuccess = (pos) => {
		const positionCords  = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		setCurrentPosition(positionCords)
	}

	// Get and set restaurants position
	const markerPosition = (e) => {
		const marker = restaurants.map(rest => rest)
		setRestaurant(marker)
	}


	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess)

		markerPosition()

	},[])	


	return (
    	<GoogleMap 
			mapContainerClassName="map-container vh-100"
			zoom={13} 
			center={currentPosition} 
		>

			{currentPosition.lat && (
				<MarkerF position={currentPosition} />
			)}

			{restaurant && restaurant.map((rest) => (
				<MarkerF 
					key={rest.id} 
					onClick={() => setSelectedRestaurant(rest)}
					value={rest.id}
					position={{
						lat: rest.position.latitude, 
						lng: rest.position.longitude
					}}
				/>
			))}

			{selectedRestaurant && (
				<InfoWindowF
					position={{
						lat: selectedRestaurant.position.latitude, 
						lng: selectedRestaurant.position.longitude
					}}

					onCloseClick={() => setSelectedRestaurant(null)}
				>
					<p>{selectedRestaurant.name}</p>

				</InfoWindowF>	
			)}

     	</GoogleMap>
    )
}
export default showMap

