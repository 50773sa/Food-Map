/**
 * Google Maps API
 */

import axios from 'axios'

axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/geocode"
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

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
 */
const getAddress = async (lat, lng) => {
	return get(`json?latlng=${lat},${lng}&key=${API_KEY}`)
}

/* 
*  GET the city for longitude and latitude
 */
const getCity = async (lat, lng) => {
	return get(`json?latlng=${lat},${lng}&result_type=locality&key=${API_KEY}`)
}


export default {
	getAddress,
	getCity,
}
