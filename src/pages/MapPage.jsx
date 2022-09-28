import { useRef } from "react"
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api"
import { Alert } from "bootstrap";
import { Container } from "react-bootstrap"
import ShowMap from "../components/ShowMap"
import useGetRestaurants from "../hooks/useGetRestaurants"
import SearchBar from "../components/SearchBar"
const libraries = ['places']

const MapPage = () => {
  	const { isLoaded } = useLoadScript({
   		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries
  	})

	// Data from firebase
	const {data, isError, isSuccess} = useGetRestaurants()

 	return (

    	<Container>
			{!isLoaded && <div>Loading...</div>}

			{isError && <Alert variant='warning'>Error...</Alert>}
			{isLoaded &&
				<SearchBar />
			}
			{isSuccess && 
				<ShowMap data={data} />
    		}
    	</Container>
  	)
}

export default MapPage