import { useLoadScript } from "@react-google-maps/api"
import { Alert } from "bootstrap"
import { Container } from "react-bootstrap"
import ShowMap from "../components/ShowMap"
import useGetRestaurants from "../hooks/useGetRestaurants"
import SearchBar from "../components/SearchBar"
import { useState } from "react"

const libraries = ['places']

const MapPage = () => {
	const [selected, setSelected] = useState(null)
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
				<SearchBar setSelected={setSelected}/>
			}

			{isSuccess && isLoaded && 
				<ShowMap data={data} searchData={selected} />
    		}
    	</Container>
  	)
}

export default MapPage