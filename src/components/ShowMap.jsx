import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import useGetRestaurants from "../hooks/useGetRestaurants"
import SearchBar from "./SearchBar"
import SearchBarAuto from "./SearchBarAuto"


const showMap = () => {
	const [restaurant, setRestaurant] = useState(null)
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})

	const {data: restaurants, isSuccess, isError, isLoading} = useGetRestaurants()

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
			.map(rest => rest)

		setRestaurant(marker)
	}


	
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess)

		markerPosition()

	},[])	


	return (
		<>
			{isLoading && <p>Loading the map...</p>}
			<SearchBar data={restaurants} />
			<SearchBarAuto data={restaurants}/>
			
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
						position={{lat: rest.position.latitude, lng: rest.position.longitude}}/>
				))}

			</GoogleMap>
		 </>
    )
}
export default showMap

