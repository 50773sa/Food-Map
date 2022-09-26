import { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = (data) => {
	const [filteredData, setFilteredData] = useState([])

	const handleFilter = (event) => {
		const searchWord = event.target.value
		const newFilter = data.data.filter((value) => {
			return value.address.city.toLowerCase().includes(searchWord.toLowerCase())
		})
		if (searchWord === "") {
			setFilteredData([])
		} else {
			console.log('newFilter', newFilter)
			setFilteredData(newFilter)
		}
	}

	return (
		<div>
			<InputGroup className="mb-3" onChange={handleFilter}>
				<Form.Control placeholder="Search for a place" />
				<Button variant="outline-secondary">
					<FontAwesomeIcon icon={faSearch} />
				</Button>
			</InputGroup>
			{filteredData.length != 0 && (
				<div className="data_result">
					{filteredData.map((value) => {
						return (
							<a key={value.id} className="data_result_item" href="">
								<p>{value.name}, {value.address.city}</p>
							</a>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default SearchBar