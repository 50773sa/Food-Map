import { useQuery } from 'react-query'
import GoogleMapsAPI from '../services/GoogleMapsAPI'

const useCity = (lat, lng) => {
	return useQuery(['city',{ lat, lng }], () => GoogleMapsAPI.getCity(lat, lng))
}

export default useCity