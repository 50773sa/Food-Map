import { useEffect, useState } from "react"
import { useSearchParams} from 'react-router-dom'
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import GoogleMapsAPI from '../services/GoogleMapsAPI'
import Sidebar from "./Sidebar"
import SidebarList from "./SidebarList"
import RestaurantFilter from "./RestaurantFilter"
import useAddress from '../hooks/useAddress'
// styles
import { toast } from "react-toastify"
import dogcation from '../assets/Images/location.png'


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
		city: '',
		position: {lat: null, lng: null},
	})
	const cityUrl = searchParams.get('city')

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

	/* WHEN THE USER SEARCHES FOR A CITY - CHANGE THE POSITION AND THE MARKERS */
	useEffect(() => {
		const handleSearch = () => {
			/*  ON SEARCH */
			if (searchData !== null) {
				// searchData = {lng, lat}
				setCurrentPosition(searchData)
				setSearchParams({
					city: searchedCity, 
					position: (searchData.lat, searchData.lng)
				})
				getData(searchedCity)

				// show all restaurants
				setCurrentFilter('All')
				return 
			}
		}
		handleSearch()

	},[searchData, searchedCity, setSearchParams, setCurrentPosition])
		

	/* PLACE THE USER ON THE MAP (WHEN PLATSTJÄNSTER IS ACTIVE) */
	const handleGeoLocation = async (pos) => {

		if ('geolocation' in navigator) {
			const positionCoords = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
			}
			setCurrentPosition(positionCoords)

		}
		console.log('current',currentPosition)


		if (pos) {
			// get address, position & city 
			const address = await GoogleMapsAPI.getCity(pos.lat, pos.lng)

			if (address) {
				const position = address.results[0].geometry.location
				const city = address.results[0].address_components[2].long_name

				console.log('address', address)

				setSearchParams({city: city, position: (position.lat ,  position.lng)})
				setCurrentPosition({lat: position.lat ,  lng:position.lng})
				getData(cityUrl)

			}


		

		} else {
			toast.warning('Sorry, we cannot fetch your position, please try searching for a specific city')

		}
	}	

	/* IF PLATSTJÄNSTER IS ACTING UP */
	const error = (err) => {
		toast.warning(`Vi kunde inte hitta din position, vänligen sök på stad i sökfältet. ${err.message}`)
	}

	/* WHEN USER ENTERS THE PAGE, CHECK IF THEY WANT TO USE PLATSTJÄNSTER */
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleGeoLocation, error)

	}, [searchData, searchedCity, setSearchParams, setCurrentPosition])

	
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

