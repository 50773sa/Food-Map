/**
 * Google Maps API
 */

import axios from 'axios'

axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/geocode"
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const language = "se"

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
*  GET the longitude and latitude from street and city
 */
const getLatLng = async (street, city) => {
	return get(`json?address=${street},${city}&language=${language}&key=${API_KEY}`)
}

/* 
*  GET the longitude and latitude from the city (with or without country)
 */
const getCoordinates = async (city) => {
	return get(`json?address=${city}&language=${language}&key=${API_KEY}`)
}


export default {
	getAddress,
	getLatLng,
	getCoordinates,
}
