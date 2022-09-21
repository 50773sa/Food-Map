import { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useForm } from 'react-hook-form'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import useAddress from '../hooks/useAddress'


const AddRestaurantPage = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(null)
	const [address, setAddress] = useState(null)
	const { handleSubmit, formState: { errors }, reset } = useForm()
	const { data: addressData, isLoading, isError } = useAddress(address)
	
	const nameRef = useRef()
	const streetRef = useRef()
	const postcodeRef = useRef()
	const cityRef = useRef()
	const restaurantInfoRef = useRef()
	const restaurantTypeRef = useRef()
	const foodTypeRef = useRef()
	const emailRef = useRef()
	const phoneRef = useRef()
	const websiteRef = useRef()
	const facebookRef = useRef()
	const instagramRef = useRef()

	const createRestaurant = async () => {
		//get longitud and latitude from address
		setAddress(streetRef.current.value)
		
		const lat = addressData.results[0].geometry.location.lat
		const lng = addressData.results[0].geometry.location.lng
		
		const restaurantsRef = collection(db, 'restaurants')

		//make firestore doc
		await addDoc(restaurantsRef, {
			created: serverTimestamp(),
			name: nameRef.current.value,
			street: streetRef.current.value,
			postcode: postcodeRef.current.value,
			city: cityRef.current.value,
			restaurantInfo: restaurantInfoRef.current.value,
			restaurantType: restaurantTypeRef.current.value,
			foodType: foodTypeRef.current.value,
			email: emailRef.current.value,
			phone: phoneRef.current.value,
			website: websiteRef.current.value,
			facebook: facebookRef.current.value,
			instagram: instagramRef.current.value,
			latitude: lat,
			longitude: lng,
		})

		console.log('restaurant created')
		//reset()
	}

	return (
		<Container>
			<Row className="my-4">
				<Col>
					<Card>
						<Card.Header as="h5">Tipsa oss om en restaurang</Card.Header>
						<Card.Body>
							{error && (<Alert variant="danger">{error}</Alert>)}
							{message && (<Alert variant="success">{message}</Alert>)}

							<Form onSubmit={handleSubmit(createRestaurant)}>
								<Form.Group className="mb-3">
									<Form.Label>Namn</Form.Label>
									<Form.Control ref={nameRef} type="text" placeholder="Namn på stället" required />
								</Form.Group>

								<Form.Group className="mb-3">
									<Row>
										<Col>
											<Form.Label>Adress</Form.Label>
											<Form.Control type="text" placeholder="Adress" ref={streetRef} required />
										</Col>
									</Row>
									<Row className="mt-2">
										<Col>
											<Form.Control type="number" placeholder="Postnummer" ref={postcodeRef} required />
											
										</Col>
										<Col>
											<Form.Control type="text" placeholder="Stad" ref={cityRef} required />
											
										</Col>
									</Row>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Info om restaurangen</Form.Label>
									<Form.Control as="textarea" rows={2} type="text" placeholder="Skriv något om restaurangen" ref={restaurantInfoRef} required />
								</Form.Group>
								
								<Form.Group className="mb-3">
									<Form.Label>Vad är det för typ av ställe</Form.Label>
									<Form.Select ref={restaurantTypeRef}>
										<option>Café</option>
										<option>Restaurang</option>
										<option>Snabbmat</option>
										<option>Kiosk/Grill</option>
										<option>Food truck</option>
									</Form.Select>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Utbud</Form.Label>
									<Form.Check
										inline
										label="Lunch"
										type="checkbox"
										id="lunch"
										className="mx-2"
									/>
									<Form.Check
										inline
										label="After work"
										type="checkbox"
										id="after-work"
										className="mx-2"
									/>
									<Form.Check
										inline
										label="A la carte"
										type="checkbox"
										id="a-la-carte"
										className="mx-2"
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Vad för slags mat?</Form.Label>
									<Form.Control type="text" placeholder="Typ av mat" ref={foodTypeRef} required />
								</Form.Group>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email"  ref={emailRef} />
								</Form.Group>

								<Form.Group id="phone" className="mb-3">
									<Form.Label>Telefonnummer</Form.Label>
									<Form.Control type="number"  ref={phoneRef} />
								</Form.Group>

								<Form.Group id="website" className="mb-3">
									<Form.Label>Hemsida</Form.Label>
									<Form.Control type="text" ref={websiteRef} />
								</Form.Group>

								<Form.Group id="facebook" className="mb-3">
									<Form.Label>Facebook</Form.Label>
									<Form.Control type="text" ref={facebookRef} />
								</Form.Group>

								<Form.Group id="instagram" className="mb-3">
									<Form.Label>Instagram</Form.Label>
									<Form.Control type="text" ref={instagramRef} />
								</Form.Group>

								<Button disabled={loading} type="submit">Skicka in förslag till oss!</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default AddRestaurantPage