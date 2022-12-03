import { useEffect, useRef, useState } from "react"
import { useSearchParams} from 'react-router-dom'
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import GoogleMapsAPI from '../services/GoogleMapsAPI'
import Sidebar from "./Sidebar"
import SidebarList from "./SidebarList"
import RestaurantFilter from "../components/RestaurantFilter"
import useAddress from '../hooks/useAddress'
// styles
import { toast } from "react-toastify"
import dogcation from '../assets/Images/location.png'
import { Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import { Autocomplete } from '@react-google-maps/api'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from "./SearchBar"



const showMap = ({ searchData, searchedCity }) => {
	const [show, setShow] = useState(false)
	const [restaurants, setRestaurants] = useState([])
	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
	const [filteredRest, setFilteredRest] = useState([])
	const [currentFilter, setCurrentFilter] = useState('All')
	const [loading, setLoading] = useState(false)
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603172135495065, 
		lng: 13.001112428195901
	})


	/* URL */
	const [searchParams, setSearchParams] = useSearchParams({ 
		city: "Malmö",
		position: {
			lat: 55.603075505110425,
			lng: 13.00048440435288,
		},
	})
	
	// const city = searchParams.get('city')

	/* CLOSE INFO BOX */
	const closeInfoBox = () => {
		setShow(false)
	}

	/* FILTER THE PLACES DEPENDING ON WHICH BUTTON YOU PRESS */
	const changeFilter = (newFilter) => {
        
		setLoading(true)
        
		// filter the restaurants
		const filteredRestaurants = restaurants ? restaurants.filter((rest) => {
            //if it returns true is it saved in filteredrestaurants array
            
			switch (newFilter) {
				case 'All':
					return true
				case 'Lunch':
				case 'After work':
				case 'Á la carte':
				case 'Bar':
					return rest.restaurant_info.restaurantSort === newFilter
				case 'Café':
				case 'Restaurang':
				case 'Snabbmat':
				case 'Kiosk/Grill':
				case 'Food truck':
					return rest.restaurant_info.restaurantType === newFilter
				default:
					return true
			}
		}) : null

		setCurrentFilter(newFilter)
		setFilteredRest(filteredRestaurants)
		setLoading(false)
	}

	/* GET ALL THE RESTAURANTS IN YOUR CITY */
	const getData = (positionCity) => {
		setLoading(true)
		let newcity = positionCity.toLowerCase()
		//fetch restaurants where city is the same as the setCity
		const queryRef = query(
			collection(db, 'restaurants'),
			where('approved', '==', true),
			where('address.city', '==', newcity)
		)

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			// got a snapshot and will change the data to the format we can use
			const docs = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data(),
				}
			})

			setRestaurants(docs)
			setFilteredRest(docs)
			setLoading(false)
		})
		return unsubscribe
	}

	/* PLACE THE USER ON THE MAP (WHEN PLATSTJÄNSTER IS ACTIVE) */
	const handleGeoLocation = () => {

		if (!navigator.geolocation) {
			console.log('Geolocation is not supported by your browser')
		}

		if (navigator.geolocation) {
			try {
				 navigator.geolocation.getCurrentPosition(async(pos) => {

					const positionCoords = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					}
			
					// get lat and lng
					const address = await GoogleMapsAPI.getCity(positionCoords.lat, positionCoords.lng)
					const position = address.results[0].geometry.location

					// get city from lat & lng
					const city = address.results[0].address_components[2].long_name

					setSearchParams({city: city, position: (position.lat, position.lng)})
					setCurrentPosition({lat: position.lat, lng: position.lng})

						
					getData(searchParams.get('city'))
				})

			} catch {
				toast.warning('Sorry, browser doesn\'t support geolocation, please try searching for a specific city')
			}
		}
	}

	/* WHEN THE USER SEARCHES FOR A CITY - CHANGE THE POSITION AND THE MARKERS */
	useEffect(() => {

		const handleSearch = () => {
			if(searchData !== null) {
				// searchData = {lng, lat}
				setCurrentPosition(searchData)
				setSearchParams({
					city: searchedCity,
					position: (searchData.lat, searchData.lng)
				})
				
				getData(searchedCity)
				setCurrentFilter('All')

			} else {
			// 	setSearchParams({city: 'Malmö', position: (currentPosition.lat, currentPosition.lng)})
				getData('Malmö')
			}
		}
		handleSearch()
		
	}, [searchData, searchedCity, setSearchParams])

	const handleGeo = () => {
		handleGeoLocation()
	}

	return (
		<>

			{restaurants && (
				<RestaurantFilter 
					currentFilter={currentFilter} 
					changeFilter={changeFilter} 
				/>
			)}

			<GoogleMap 
				mapContainerClassName="map-container vh-100"
				zoom={13} 
				center={currentPosition} 
			>
				

				{loading && <p>Loading...</p>}

				{currentPosition && (
					<MarkerF 
						position={currentPosition}
						title={'Här är du'}
					/>
				)}

				{filteredRest && filteredRest.map((rest) => (
					<MarkerF 
						icon={dogcation}
						key={rest.id} 
						title={rest.name}
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

				{filteredRest && (
					<SidebarList restaurant={filteredRest} />
				)}
 
			</GoogleMap>
		</>
	)
}

export default showMap

