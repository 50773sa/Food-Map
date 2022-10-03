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
	const [searchedCity, setSearchedCity] = useState(null)
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries
	})
	
	// Data from firebase
	const {data, isError, isSuccess} = useGetRestaurants()

return (
    	<Container fluid className="g-0">
			{!isLoaded && <div>Loading...</div>}

			{isError && <Alert variant='warning'>Error...</Alert>}

			{isLoaded &&
				<SearchBar setSelected={setSelected} setSearchedCity={setSearchedCity} />
			}

			{isSuccess && isLoaded && 
				<ShowMap restaurants={data} searchData={selected} searchedCity={searchedCity} />
    		}
    	</Container>
  	)
}

export default MapPage