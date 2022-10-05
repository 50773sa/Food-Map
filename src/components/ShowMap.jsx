import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import useGetRestaurants from "../hooks/useGetRestaurants"
import Sidebar from "./Sidebar"
import { toast } from "react-toastify"
import GoogleMapsAPI from '../services/GoogleMapsAPI'
import { db } from '../firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import SidebarList from "./SidebarList"
import dogcation from '../assets/Images/location.png'

const showMap = ({searchData, searchedCity}) => {
	const [city, setCity] = useState('Malmö')
	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState(false)
	const [restaurant, setRestaurant] = useState([])
	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})
	const {data: restaurants} = useGetRestaurants()

	const getData = (positionCity) => {
		setRestaurant([])
		setLoading(true)

		//fetch restaurants where city is the same as the setCity
		const queryRef = query(
			collection(db, 'restaurants'),
			where('approved', '==', true),
			where('address.city', '==', positionCity)
		)

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			// got a snapshot and will change the data to the format we can use
			const docs = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data(),
				}
			})

			setRestaurant(docs)
			setLoading(false)
		})
		return unsubscribe
	}

	// Find  and set user's position
	const onSuccess = async (pos) => {
		const positionCords = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		
		setCurrentPosition(positionCords)
		setCity('')

		// get city from lat and lng
		if(currentPosition) {
			const res = await GoogleMapsAPI.getCity(positionCords.lat, positionCords.lng)
			if (res) {
				const positionCity = res.results[0].address_components[0].long_name
				setCity(positionCity)
				getData(positionCity)
			}
		}
	}

	if (!navigator.geolocation) {
		console.log('Geolocation is not supported by your browser')
	}

	const error = (err) => {
		toast.warning(`Vi kunde inte hitta din position, vänligen sök på stad i sökfältet. ${err.message}`)
	}

	// Close infoBox
	const closeInfoBox = () => {
		setShow(false)
	}

	useEffect(() => {
		//get position from platstjänster
		navigator.geolocation.getCurrentPosition(onSuccess, error)
	},[])

	//when we search for a city run this useEffect
	useEffect(() => {
		if(searchData !== null) {
			// searchData = {lng, lat}
			setCurrentPosition(searchData)
			
			//searchedCity = ''
			setCity(searchedCity)
			getData(searchedCity)

		} else {
			//if there is searchdata but it is null then we will place the user on default position (in malmö)
			setCurrentPosition({
				lat: 55.603075505110425, 
				lng: 13.00048440435288,
			})
			setCity('Malmö')
			getData('Malmö')
		}
	}, [searchData, searchedCity])

	return (
    	<GoogleMap 
			mapContainerClassName="map-container vh-100"
			zoom={13} 
			center={currentPosition} 
		>
			{loading && <p>Loading...</p>}

			{currentPosition.lat && (
				<MarkerF position={currentPosition} />
			)}

			{restaurant && restaurant.map((rest) => (
				<MarkerF 
					icon={dogcation}
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

