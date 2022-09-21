import { useQuery } from 'react-query'
import GoogleMapsAPI from '../services/GoogleMapsAPI'

const useAddress = (address) => {
	return useQuery(['address', address], () => GoogleMapsAPI.getLatLng(address))
}

export default useAddress