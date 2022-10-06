import { useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleMapsAPI from '../services/GoogleMapsAPI'
import { toast } from 'react-toastify'


const SearchBar = ({ setSelected, setSearchedCity }) => {
	const searchRef = useRef()


	const handleSearch = async (e) => {
		e.preventDefault()

		//set the value to be what was searched for
		const data = await GoogleMapsAPI.getCoordinates(searchRef.current.value)

		//remove country from the search
		const city = searchRef.current.value.split(',')
		setSearchedCity(city[0])

		if(data.status == "ZERO_RESULTS" || !data){
			setSelected(null)
			toast.warning('Oops, där gick något fel - sökte du på en stad?')

		} else if (data.status == "OK") {
			setSelected(data.results[0].geometry.location)
		}
	}

	return (
		<>
			<Form onSubmit={handleSearch} className="d-flex justify-content-center search-holder">
				<Autocomplete restrictions={{ 'country': ['SE'] }} types={["locality"]} className="autocomplete">
					<Form.Group className="d-flex justify-content-center align-items-center search-container w-80">

						<Form.Control
							className="searchbar"
							type="text"
							ref={searchRef}
							placeholder="Sök på en stad"
							required
						/>

						<Button type="submit" variant="link" className="search-btn">
							<FontAwesomeIcon icon={faSearch} />
						</Button>

					</Form.Group>
				</Autocomplete>
			</Form>
		</>
	)
}

export default SearchBar