// import { useEffect, useState } from "react"
// import { useSearchParams} from 'react-router-dom'
// import { GoogleMap,  MarkerF } from "@react-google-maps/api"
// import { collection, query, where, onSnapshot } from 'firebase/firestore'
// import { db } from '../firebase'
// import GoogleMapsAPI from '../services/GoogleMapsAPI'
// import Sidebar from "./Sidebar"
// import SidebarList from "./SidebarList"
// import RestaurantFilter from "../components/RestaurantFilter"

// // styles
// import { toast } from "react-toastify"
// import dogcation from '../assets/Images/location.png'


// const showMap = ({ searchData, searchedCity }) => {
// 	const [show, setShow] = useState(false)
// 	const [restaurants, setRestaurants] = useState([])
// 	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
// 	const [filteredRest, setFilteredRest] = useState([])
// 	const [currentFilter, setCurrentFilter] = useState('All')
// 	const [loading, setLoading] = useState(false)
// 	const [currentPosition, setCurrentPosition] = useState({
// 		lat: 55.603075505110425, 
// 		lng: 13.00048440435288,
// 	})

// 	/* URL */
// 	const [searchParams, setSearchParams] = useSearchParams({ 
// 		city: "",
// 	})
	
// 	const city = searchParams.get('city')

// 	/* FILTER THE PLACES DEPENDING ON WHICH BUTTON YOU PRESS */
// 	const changeFilter = (newFilter) => {
        
// 		setLoading(true)
        
// 		// filter the restaurants
// 		const filteredRestaurants = restaurants ? restaurants.filter((rest) => {
//             //if it returns true is it saved in filteredrestaurants array
            
// 			switch (newFilter) {
// 				case 'All':
// 					return true
// 				case 'Lunch':
// 				case 'After work':
// 				case 'Á la carte':
// 				case 'Bar':
// 					return rest.restaurant_info.restaurantSort === newFilter
// 				case 'Café':
// 				case 'Restaurang':
// 				case 'Snabbmat':
// 				case 'Kiosk/Grill':
// 				case 'Food truck':
// 					return rest.restaurant_info.restaurantType === newFilter
// 				default:
// 					return true
// 			}
// 		}) : null

// 		setCurrentFilter(newFilter)
// 		setFilteredRest(filteredRestaurants)
// 		setLoading(false)
// 	}

// 	/* GET ALL THE RESTAURANTS IN YOUR CITY */
// 	const getData = (positionCity) => {
// 		setLoading(true)
// 		let newcity = positionCity.toLowerCase()
// 		//fetch restaurants where city is the same as the setCity
// 		const queryRef = query(
// 			collection(db, 'restaurants'),
// 			where('approved', '==', true),
// 			where('address.city', '==', newcity)
// 		)

// 		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
// 			// got a snapshot and will change the data to the format we can use
// 			const docs = snapshot.docs.map(doc => {
// 				return {
// 					id: doc.id,
// 					...doc.data(),
// 				}
// 			})

// 			setRestaurants(docs)
// 			setFilteredRest(docs)
// 			setLoading(false)
// 		})
// 		return unsubscribe
// 	}

// 	/* PLACE THE USER ON THE MAP (WHEN PLATSTJÄNSTER IS ACTIVE) */
// 	const onSuccess = async (pos) => {
// 		const positionCords = {
// 			lat: pos.coords.latitude,
// 			lng: pos.coords.longitude,
// 		}
		
// 		setCurrentPosition(positionCords)
// 		// get city from lat and lng
// 		if(currentPosition) {
// 			const res = await GoogleMapsAPI.getCity(positionCords.lat, positionCords.lng)
// 			console.log(res)
// 			if (res) {
// 				const positionCity = res.results[0].address_components[0].long_name.toLowerCase()
// 				getData(positionCity)
// 			} else {
// 				toast.warning('Sorry, we cannot fetch your position, please try searching for a specific city')
// 			}
// 		} else {
// 			toast.warning('Sorry, we cannot fetch your position, please try searching for a specific city')
// 		}
// 	}

// 	if (!navigator.geolocation) {
// 		console.log('Geolocation is not supported by your browser')
// 	}

// 	/* IF PLATSTJÄNSTER IS ACTING UP */
// 	const error = (err) => {
// 		toast.warning(`Vi kunde inte hitta din position, vänligen sök på stad i sökfältet. ${err.message}`)
// 	}

// 	/* CLOSE INFO BOX */
// 	const closeInfoBox = () => {
// 		setShow(false)
// 	}

// 	/* WHEN USER ENTERS THE PAGE, CHECK IF THEY WANT TO USE PLATSTJÄNSTER */
// 	useEffect(() => {

// 		//get position from platstjänster
// 		navigator.geolocation.getCurrentPosition(onSuccess, error)
// 	},[])

// 	/* WHEN THE USER SEARCHES FOR A CITY - CHANGE THE POSITION AND THE MARKERS */
// 	useEffect(() => {
// 		if(searchData !== null) {
// 			// searchData = {lng, lat}
// 			setCurrentPosition(searchData)
// 			setSearchParams({city: searchedCity})
			
// 			getData(searchedCity)
// 			setCurrentFilter('All')

// 		} else {
// 			//if there is searchdata but it is null then we will place the user on default position (in malmö)
// 			setCurrentPosition({
// 				lat: 55.603075505110425, 
// 				lng: 13.00048440435288,
// 			})
// 			getData('Malmö')
// 			setSearchParams({city: currentPosition})// detta blir ej namn

// 		}
// 	}, [searchData, searchedCity, city])

// 	return (
// 		<>
// 			{restaurants && (
// 				<RestaurantFilter 
// 					currentFilter={currentFilter} 
// 					changeFilter={changeFilter} 
// 				/>
// 			)}

// 			<GoogleMap 
// 				mapContainerClassName="map-container vh-100"
// 				zoom={13} 
// 				center={currentPosition} 
// 			>
// 				{loading && <p>Loading...</p>}

// 				{currentPosition.lat && (
// 					<MarkerF 
// 						position={currentPosition}
// 						title={'Här är du'}
// 					/>
// 				)}

// 				{filteredRest && filteredRest.map((rest) => (
// 					<MarkerF 
// 						icon={dogcation}
// 						key={rest.id} 
// 						title={rest.name}
// 						onClick={() => {setSelectedRestaurant(rest), setShow(true)}}
// 						value={rest.id}
// 						position={{
// 							lat: rest.position.latitude, 
// 							lng: rest.position.longitude
// 						}}
// 					/>
// 				))}

// 				{selectedRestaurant && (
// 					<Sidebar show={show} closeInfoBox={closeInfoBox} selectedRestaurant={selectedRestaurant}/>	
// 				)}

// 				{filteredRest && (
// 					<SidebarList restaurant={filteredRest} />
// 				)}

// 			</GoogleMap>
// 		</>
// 	)
// }
// export default showMap

