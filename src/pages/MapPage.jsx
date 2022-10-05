import { useLoadScript } from "@react-google-maps/api"
import { Alert } from "bootstrap"
import { Container } from "react-bootstrap"
import ShowMap from "../components/ShowMap"
//import useGetRestaurants from "../hooks/useGetRestaurants"
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

return (
    	<Container fluid className="g-0 map">
			{!isLoaded && <div>Loading...</div>}

			{/* {isError && <Alert variant='warning'>Error...</Alert>} */}

			{isLoaded &&
				<SearchBar setSelected={setSelected} setSearchedCity={setSearchedCity} />
			}

			{isLoaded && 
				<ShowMap searchData={selected} searchedCity={searchedCity} />
			}
		</Container>
	)
}

export default MapPage