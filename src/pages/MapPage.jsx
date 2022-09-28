import { useRef } from "react"
import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import { Alert } from "bootstrap";
import { Container } from "react-bootstrap";
import ShowMap from "../components/ShowMap";
import useGetRestaurants from "../hooks/useGetRestaurants";
import { Autocomplete } from '@react-google-maps/api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const libraries = ['places']

const MapPage = () => {
  	const { isLoaded } = useLoadScript({
   		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries
  	})

	const searchRef = useRef()

	// Data from firebase
	const {data, isError, isSuccess} = useGetRestaurants()

	const handleForm = (e) => {
		e.preventDefault()

		console.log(searchRef.current.value)
		//onSubmit(searchRef.current.value)
	}

 	return (

    	<Container>
			{!isLoaded && <div>Loading...</div>}

			{isError && <Alert variant='warning'>Error...</Alert>}
			{isLoaded &&
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
			}
			{isSuccess && 
				<ShowMap data={data} />
    		}
    	</Container>
  	)
}

export default MapPage