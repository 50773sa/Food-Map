import { useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SearchBar = () => {
	const searchRef = useRef()

	const handleForm = (e) => {
		e.preventDefault()

		console.log(searchRef.current.value)
		//onSubmit(searchRef.current.value)
	}

	return (
		<div>
			<Form onSubmit={handleForm}>
				<Form.Group className="d-flex justify-content-center">
					<Autocomplete>
						<Form.Control
							type="text"
							ref={searchRef}
							placeholder="Enter an adress"
							required
						/>
					</Autocomplete>
					<Button type="submit" variant="outline-primary">Search</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default SearchBar