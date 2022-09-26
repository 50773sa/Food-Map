import { useQuery } from 'react-query'
import GoogleMapsAPI from '../services/GoogleMapsAPI'

const useAddress = (street, city) => {
	return useQuery(['address', {street, city}], () => GoogleMapsAPI.getLatLng(street, city))
}

export default useAddress