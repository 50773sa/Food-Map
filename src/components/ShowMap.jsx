import { useEffect, useState } from "react"
import { GoogleMap,  MarkerF } from "@react-google-maps/api"
import useGetRestaurants from "../hooks/useGetRestaurants"
import Sidebar from "./Sidebar"
import { toast } from "react-toastify"
import GoogleMapsAPI from '../services/GoogleMapsAPI'
import { db } from '../firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import SidebarList from "./SidebarList"
import cutlery from '../assets/Images/restaurant.png'
import RestaurantFilter from "../components/RestaurantFilter"

const showMap = ({ searchData, searchedCity }) => {
	const [currentFilter, setCurrentFilter] = useState('All')
	const [currentPosition, setCurrentPosition] = useState({
		lat: 55.603075505110425, 
		lng: 13.00048440435288,
	})
	const [loading, setLoading] = useState(false)
	const [restaurants, setRestaurants] = useState([])
	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
	const [show, setShow] = useState(false)

	//const { data: restaurants } = useGetRestaurants()

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter)

		try {
			setRestaurants([])
			setLoading(true)
			// filter the restaurants
			const filteredRestaurants = restaurants ? restaurants.filter((rest) => {
				//if it returns true is it saved in filteredrestaurants array
				switch (currentFilter) {
					case 'All':
						return true
					case 'Lunch':
						/* let sortedlunch = false
						//console.log('en array?', rest.restaurant_info.restaurantSort)
						rest.restaurant_info.restaurantSort.forEach((r) => {
							console.log('r', r, currentFilter)
							if (currentFilter == r) {
								sortedlunch = true 
							}
						})
						console.log('filteredRes', sortedlunch)
						return sortedlunch */
					case 'After work':
					case 'Á la carte':
					case 'Bar':
						return rest.restaurant_info.restaurantSort[0] === currentFilter
	
					case 'Café':
					case 'Restaurang':
					case 'Snabbmat':
					case 'Kiosk/Grill':
					case 'Food truck':
						console.log('restaurant', rest.restaurant_info.restaurantType, currentFilter)
						return rest.restaurant_info.restaurantType === currentFilter
					default:
						return true
				}
			}) : null
	
			console.log('filtered rest', filteredRestaurants)
			setRestaurants(filteredRestaurants)
			setLoading(false)
		} catch {
			console.log('could not')
		}
	}

	const getData = (positionCity) => {
		setRestaurants([])
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

			setRestaurants(docs)
			setLoading(false)
			console.log('all rest', docs)
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
		//setCity('')

		// get city from lat and lng
		if(currentPosition) {
			const res = await GoogleMapsAPI.getCity(positionCords.lat, positionCords.lng)
			if (res) {
				const positionCity = res.results[0].address_components[0].long_name
				//setCity(positionCity)
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

	const svgMarkerYou = {
		path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
		fillColor: "black",
		fillOpacity: 0.9,
		strokeWeight: 0,
		rotation: 0,
		scale: 2,
	};


	useEffect(() => {
		//get position from platstjänster
		navigator.geolocation.getCurrentPosition(onSuccess, error)
	},[])

	//when we search for a city run this useEffect
	useEffect(() => {
		if(searchData !== null) {
			// searchData = {lng, lat}
			setCurrentPosition(searchData)
			
			getData(searchedCity)

		} else {
			//if there is searchdata but it is null then we will place the user on default position (in malmö)
			setCurrentPosition({
				lat: 55.603075505110425, 
				lng: 13.00048440435288,
			})
			
		}
	}, [searchData, searchedCity])

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

				{currentPosition.lat && (
					<MarkerF 
						icon={svgMarkerYou}
						position={currentPosition}
						title={'Här är du'}
					/>
				)}

				{restaurants && restaurants.map((rest) => (
					<MarkerF 
						icon={cutlery}
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

				{restaurants && (
					<SidebarList restaurant={restaurants} />
				)}

			</GoogleMap>
		</>
	)
}
export default showMap

