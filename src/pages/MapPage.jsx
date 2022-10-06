import { useLoadScript } from "@react-google-maps/api"
import { Alert } from "bootstrap"
import { Container } from "react-bootstrap"
import { useState } from "react"
import ShowMap from "../components/ShowMap"
import SearchBar from "../components/SearchBar"
import LoadingSpinner from "../components/LoadingSpinner"

const libraries = ['places']

const MapPage = () => {
	const [selected, setSelected] = useState(null)
	const [searchedCity, setSearchedCity] = useState(null)
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries
	})

	return (
    	<Container fluid className="g-0 map">
			{!isLoaded && <LoadingSpinner />}
    
			{isLoaded &&
				<SearchBar setSelected={setSelected} setSearchedCity={setSearchedCity} searchedCity={searchedCity} />
			}

			{isLoaded && 
				<ShowMap searchData={selected} searchedCity={searchedCity} />
			}
		</Container>
	)
}

export default MapPage