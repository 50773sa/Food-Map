import { useEffect, useState } from 'react'
import { useSearchParams} from 'react-router-dom'

import GoogleMapsAPI from '../services/GoogleMapsAPI'


const useGeoLocation = () => {
    const [userLocation, setUserLocation] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams({ userCity: '', position: {lat: null, lng: null }})
    console.log('geolocation', userLocation)

    const handleGeoLocation = () => {
        if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async(posi) => {
				const pos = {
				  lat: posi.coords.latitude,
				  lng: posi.coords.longitude,
				};
				setUserLocation(pos)

				const address = await GoogleMapsAPI.getLatLng(pos.lat, pos.lng)
				const position = address.results[0].geometry.location
				const userCity = address.results[0].address_components[2].long_name
                

				console.log('1')

				// if (searchData === null) {
					setSearchParams({userCity: userCity, position: (position.lat ,  position.lng)})
					setUserLocation({lat: position.lat, lng: position.lng})
					console.log('2')
					return

				// }
			})
		} else {
			toast.warning('Sorry, browser doesn\'t support geolocation, please try searching for a specific userCity')
		}

    }

    return (
        userLocation,
        setUserLocation,
        searchParams,
        setSearchParams,
        userCity, 
        setUserCity,
        handleGeoLocation
    )
}

export default useGeoLocation