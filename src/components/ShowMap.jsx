import { useEffect, useState } from "react"
import { useSearchParams} from 'react-router-dom'
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import GoogleMapsAPI from '../services/GoogleMapsAPI'
import Sidebar from "./Sidebar"
import SidebarList from "./SidebarList"
import RestaurantFilter from "../components/RestaurantFilter"

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
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})

	/* URL */
	const [searchParams, setSearchParams] = useSearchParams({ 
		city: '',
		position: {lat: null, lng: null},
	})
//  searchParams.city.replace(/åäö/gi, "aao"); //! glöm ej fixa

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
	


	/* GET AND SET LOCATION */
	useEffect(() => {

		const location = async () => {

			/*  ON SEARCH */
			if (searchData !== null) {
				// searchData = {lng, lat}
				setCurrentPosition(searchData)
				setSearchParams({
					city: searchedCity, 
					position: (searchData.lat, searchData.lng)
				})
				getData(searchedCity)

				// filter restaurants
				setCurrentFilter('All')
				return 
			} 

			/*  GET USER POSITION WITH GEOLOCATION */
			if (searchData === null) {

				const cityName = await GoogleMapsAPI.getCoordinates(searchParams.get('city'))

				// city & position
				const city = cityName.results[0].formatted_address.split(",")
				const position = cityName.results[0].geometry.location

				setSearchParams({city: city[0], position: (position.lat ,  position.lng)})
				setCurrentPosition(position)

				return
			}

			/* DEFAULT POSITION */
			setCurrentPosition({
				lat: 55.603075505110425, 
				lng: 13.00048440435288,
			})
		}
		location()

	},[searchData, searchedCity, searchParams])

	
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

