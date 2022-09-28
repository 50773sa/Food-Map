import { useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleMapsAPI from '../services/GoogleMapsAPI'

const SearchBar = ({ setSelected }) => {
	const searchRef = useRef()

	const handleSearch = async (e) => {
		e.preventDefault()

		//set the value to be what was searched for
		const data = await GoogleMapsAPI.getCoordinates(searchRef.current.value)

		if (data) {
			setSelected(data.results[0].geometry.location)
		} else {
			return
		}
	}

	return (
		<div>
			<Form onSubmit={handleSearch}>
				<Autocomplete restrictions={{ 'country': ['SE'] }} types={["locality"]}>
					<Form.Group className="d-flex justify-content-center">
						<Form.Control
							type="text"
							ref={searchRef}
							placeholder="Sök på en stad"
							required
						/>

						<Button type="submit" variant="outline-secondary">
							<FontAwesomeIcon icon={faSearch} />
						</Button>
					</Form.Group>
				</Autocomplete>
			</Form>
		</div>
	)
}

export default SearchBar