import { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = (data) => {
	const [filteredData, setFilteredData] = useState([])
	const [wordEntered, setWordEntered] = useState('')

	const handleFilter = (event) => {
		const searchWord = event.target.value
		const newFilter = data.data.filter((value) => {
			return value.address.city.toLowerCase().includes(searchWord.toLowerCase())
		})
		if (searchWord === "") {
			setFilteredData([])
			setWordEntered('')

		} else {
			console.log('newFilter', newFilter)
			setFilteredData(newFilter)
		}
	}

	const clearInput = () => {
		setFilteredData([])
		setWordEntered('')
	}

	return (
		<div>
			<InputGroup className="mb-3"  >
				<input onChange={handleFilter} placeholder="Search for a place" type="text" defaultValue={wordEntered} />
				<Button variant="outline-secondary">
					{filteredData.length === 0
						? <FontAwesomeIcon icon={faSearch} />
						: <FontAwesomeIcon icon={faClose} onClick={clearInput}/>
					} {/* nu visar den förstoringsglaset när man söker på random bokstäver = length=0 FIXA */}
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