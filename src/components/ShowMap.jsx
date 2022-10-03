import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import useGetRestaurants from "../hooks/useGetRestaurants"
import Sidebar from "./Sidebar"
import { toast } from "react-toastify"
import SidebarList from "./SidebarList"

const showMap = ({searchData}) => {
	const [show, setShow] = useState(false)
	const [restaurant, setRestaurant] = useState(null)
	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})
	const { data: restaurants } = useGetRestaurants()	

	// Find  and set user's position
	const onSuccess = (pos) => {
		const positionCords = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		
		setCurrentPosition(positionCords)
		console.log('platsen vi är på', positionCords)
	}

	if (!navigator.geolocation) {
		console.log('Geolocation is not supported by your browser')
	}

	const error = (err) => {
		toast.warning(`Vi kunde inte hitta din position, vänligen sök på stad i sökfältet. ${err.message}`)
	}

	// Get and set restaurants position
	const markerPosition = () => {
		const marker = restaurants.map(rest => rest)
		setRestaurant(marker)
	}

	// Close infoBox
	const closeInfoBox = () => {
		setShow(false)
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess, error)

		markerPosition()

	},[])

	useEffect(() => {
		if(searchData !== null) {
			setCurrentPosition(searchData)
			
		} else {
			//om där är searchdata men den är null så placerar vi användaren på default (i malmö)
			setCurrentPosition({
				lat: 55.603075505110425, 
				lng: 13.00048440435288,
			})
		}

	}, [searchData])

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
				<Sidebar show={show} closeInfoBox={closeInfoBox} selectedRestaurant={selectedRestaurant}/>	
			)}

			{restaurants && (
				<SidebarList restaurant={restaurants} />
			)}

     	</GoogleMap>
    )
}
export default showMap

