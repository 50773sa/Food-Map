import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import Markers from "./Markers"
import useGetRestaurants from "../hooks/useGetRestaurants"
import MarkerItem from "./MarkerItem"


const showMap = () => {
	const [markerPos, setMarkerPos] = useState()
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})
	const {data: restaurants, isSuccess, isError} = useGetRestaurants()

	const mark = restaurants.map(rest => rest.position)


	// Find  and set user's position
	const onSuccess = (pos) => {
		const positionCords  = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		setCurrentPosition(positionCords)
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess)

		setMarkerPos(mark)
	
	},[])	

	console.log('MARKER POS', markerPos)

	return (
    	<GoogleMap 
			mapContainerClassName="map-container vh-100"
			zoom={13} 
			center={currentPosition} 
		>

			{currentPosition.lat && (
				<MarkerF position={currentPosition} />
			)}

			{markerPos && markerPos.map((rest) => (
				<MarkerF key={rest.id} position={{lat: rest.latitude, lng: rest.longitude}}/>
			))}

     	</GoogleMap>
    )
}
export default showMap

