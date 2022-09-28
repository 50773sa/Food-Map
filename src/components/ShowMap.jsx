import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF, InfoWindowF} from "@react-google-maps/api"
import useGetRestaurants from "../hooks/useGetRestaurants"
import InfoBox from "./InfoBox"


const showMap = ({searchData}) => {
	const [show, setShow] = useState(false)
	const [restaurant, setRestaurant] = useState(null)
	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})
	//console.log('selected in showMap', searchData)
	const {data: restaurants} = useGetRestaurants()
	console.log("sökdata",searchData)
	console.log("defaultplats",currentPosition)

	// Find  and set user's position
	const onSuccess = (pos) => {
		const positionCords = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		if (searchData === null) {
			setCurrentPosition(positionCords)
			console.log('platsen vi är på', positionCords)
		} else {
			setCurrentPosition(searchData)
		}
	}

	// Get and set restaurants position
	const markerPosition = () => {
		const marker = restaurants.map(rest => rest)
		setRestaurant(marker)
	}

	//! ska fixa så denna blir en onMouseOver istället
	const closeWindow = () => {
		setShow(false)
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess)

		markerPosition()

	},[])	

	console.log(restaurant)

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
					onClick={() => {setSelectedRestaurant(rest), setShow(true)}}
					value={rest.id}
					position={{
						lat: rest.position.latitude, 
						lng: rest.position.longitude
					}}
				/>
			))}

			{selectedRestaurant && (
				<>
					<InfoWindowF
						position={{
							lat: selectedRestaurant.position.latitude, 
							lng: selectedRestaurant.position.longitude
						}}

						onCloseClick={() => setSelectedRestaurant(null)}
					>
						<p>{selectedRestaurant.name}</p>

					</InfoWindowF>	

					<InfoBox show={show} closeWindow={closeWindow} selectedRestaurant={selectedRestaurant}/>
				</>
			)}

     	</GoogleMap>
    )
}
export default showMap

