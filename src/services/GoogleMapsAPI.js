/**
 * Google Maps API
 */

import axios from 'axios'

axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/geocode"
const API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY

/* 
*  GET an endpoint function
*  returns a promise
 */
const get = async (endpoint) => {
	const response = await axios.get(endpoint)
	return response.data
}


/* 
*  GET the address for longitude and latitude
	address as a place id
 */
	const getAddress = (lat, lng) => {
		return get(`json?latlng=${lat},${lng}&key=${API_KEY}`)
	}

export default {
	getAddress,
}
