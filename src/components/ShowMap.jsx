import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import useGetRestaurants from "../hooks/useGetRestaurants"


const showMap = () => {
	const [restaurantPosition, setRestaurantPosition] = useState(null)
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})

	const {data: restaurants, isSuccess, isError} = useGetRestaurants()

	// Find  and set user's position
	const onSuccess = (pos) => {
		const positionCords  = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		setCurrentPosition(positionCords)
	}

	// Get and set restaurants position
	const markerPosition = () => {
		const marker = restaurants
			.map(rest => rest.position)

		setRestaurantPosition(marker)
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

			{restaurantPosition && restaurantPosition.map((rest) => (
				<MarkerF 
					key={rest.id} 
					position={{lat: rest.latitude, lng: rest.longitude}}/>
			))}

     	</GoogleMap>
    )
}
export default showMap

