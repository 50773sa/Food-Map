import { useQuery } from 'react-query'
import GoogleMapsAPI from '../services/GoogleMapsAPI'

const useLatLng = (lat, lng) => {
	return useQuery(['lat-lng',{ lat, lng }], () => GoogleMapsAPI.getAddress(lat, lng))
}

export default useLatLng