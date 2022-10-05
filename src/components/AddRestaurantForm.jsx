import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
//import useAddress from '../hooks/useAddress'
import useUploadPhoto from '../hooks/useUploadPhoto'
import { auth } from '../firebase'

// styles
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'
import { toast } from 'react-toastify'
import GoogleMapsAPI from '../services/GoogleMapsAPI'


const AddRestaurantForm = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [photo, setPhoto] = useState(null)
	const uploadPhoto = useUploadPhoto()
	const { handleSubmit, formState: { errors }, reset, register } = useForm()

	// console.log('city and street', city, street)

	/**
	 *  Handle photos 
	 */

	const handleSelectedPhoto = (e) => {
		setError(null)

		if (e.target.files[0].size > 2 * 1024 * 1024) {
			setError('Bilden får inte vara större än 2 MB')
			return 

		} else {
			setPhoto(e.target.files[0])
		}
	}

	const submit = async () => {
		await uploadPhoto.upload(photo)
	}

	const handleResetPhoto = () => {
		setPhoto(null)
	}

	/**
	 *  Create restaurant 
	 */
	
	const createRestaurant = async (data) => {
		console.log('data', data)
		
		if (data.street && data.city) {
			//get longitud and latitude from address
			const res = await GoogleMapsAPI.getLatLng(data.street, data.city)

			
			if (res) {
				const lng = res.results[0].geometry.location.lng
				const lat = res.results[0].geometry.location.lat
				
				//make firestore doc to store in the DB
				await addDoc(collection(db, 'restaurants'), {
					created: serverTimestamp(),
					name: data.name,
					address: {
						street: data.street,
						postcode: data.postcode,
						city: data.city.toLowerCase(),
					},
					restaurant_info: {
						restaurantInfo: data.restaurantInfo,
						restaurantType: data.restaurantType,
						restaurantSort: data.restaurantSort,
						cuisine: data.cuisine,
					},
					social: {
						email: data.email,
						phone: data.phone,
						website: data.website,
						facebook: data.facebook,
						instagram: data.instagram,
					},
					position: {
						latitude: lat,
						longitude: lng,
					},
					url: uploadPhoto.URL,
					approved: auth.currentUser ? true : false,
				})
			}
		} else {
			console.log('could not fetch the coordinates')
		}
		toast.success('Tack för tipset!')
		setLoading(false)
		reset()
	}
		
	
	return (
		<Row className="my-4">
			<Col>
				<Card>
					<Card.Header as="h5">{auth.currentUser ? "Lägg till Restaurang" : "Tipsa oss!" }</Card.Header>
					<Card.Body>
						{error && (<Alert variant="danger">{error}</Alert>)}

						<Form onSubmit={handleSubmit(createRestaurant)} noValidate>
							<Form.Group className="mb-3">
								<Form.Label>Namn*</Form.Label>
								<Form.Control 
									{...register("name", {
										required: "You must enter a name of the place",
										minLength: {
											value: 2,
											message: "That's too short be a name!"
										}
									})}
									type="text" placeholder="Namn på stället" />
									{errors.name && <div className="invalid">{errors.name.message}</div>}
							</Form.Group>

							<Form.Group className="mb-3">
								<Row>
									<Col>
										<Form.Label>Adress*</Form.Label>
										<Form.Control 
											{...register("street", {
												required: "You must enter a address so we can find the place",
												minLength: {
													value: 4,
													message: "That's too short be a street!"
												}
											})}
											type="text" placeholder="Adress" />
										{errors.street && <div className="invalid">{errors.street.message}</div>}
									</Col>
								</Row>
								<Row className="mt-2">
									<Col>
										<Form.Control 
											{...register("postcode", {
												required: "You must enter a postcode",
												minLength: {
													value: 5,
													message: "Please write a valid postcode!"
												}
											})}
											type="text" placeholder="Postnummer" />
											{errors.postcode && <div className="invalid">{errors.postcode.message}</div>}
									</Col>
									<Col>
										<Form.Control 
											{...register("city", {
												required: "You must enter a city",
												minLength: {
													value: 2,
													message: "That's not a city!"
												}
											})}
											type="text" placeholder="Stad" />
											{errors.city && <div className="invalid">{errors.city.message}</div>}
									</Col>
								</Row>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Info om restaurangen*</Form.Label>
								<Form.Control 
									{...register("restaurantInfo", {
										required: "Please write something about the place",
										minLength: {
											value: 2,
											message: "We'd like some more information please..."
										}
									})}
									as="textarea" rows={2} type="text" placeholder="Skriv något om restaurangen" />
								{errors.restaurantInfo && <div className="invalid">{errors.restaurantInfo.message}</div>}

							</Form.Group>
							
							<Form.Group className="mb-3">
								<Form.Label>Vad är det för typ av ställe*</Form.Label>
								<Form.Select {...register("restaurantType")}>
									<option>Café</option>
									<option>Restaurang</option>
									<option>Snabbmat</option>
									<option>Kiosk/Grill</option>
									<option>Food truck</option>
								</Form.Select>
								{errors.restaurantType && <div className="invalid">{errors.restaurantType.message}</div>}

							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Utbud*</Form.Label>
								<Form.Select {...register("restaurantSort")}>
									<option>Lunch</option>
									<option>After work</option>
									<option>Á la carte</option>
									<option>Bar</option>
								</Form.Select>
								{errors.restaurantSort && <div className="invalid">{errors.restaurantSort.message}</div>}
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vad för slags kök?*</Form.Label>
								<Form.Control 
									{...register("cuisine", {
										required: "Please write what kind of cuisine that is served here",
										minLength: {
											value: 2,
											message: "We'd like some information about the cuisine please..."
										}
									})}
									type="text" placeholder="T ex franskt, thailändskt ..." />
								{errors.cuisine && <div className="invalid">{errors.cuisine.message}</div>}
							</Form.Group>

							<Form.Group id="email" className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control {...register("email")} type="email" />
							</Form.Group>

							<Form.Group id="phone" className="mb-3">
								<Form.Label>Telefonnummer</Form.Label>
								<Form.Control {...register("phone")} type="tel" />
							</Form.Group>

							<Form.Group id="website" className="mb-3">
								<Form.Label>Hemsida</Form.Label>
								<Form.Control {...register("website")} type="text" />
							</Form.Group>

							<Form.Group id="facebook" className="mb-3">
								<Form.Label>Facebook</Form.Label>
								<InputGroup>
									<InputGroup.Text id="basic-addon3">
										https://facebook.com/
									</InputGroup.Text>
									<Form.Control {...register("facebook")} type="text" />
								</InputGroup>
							</Form.Group>

							<Form.Group id="instagram" className="mb-3">
								<Form.Label>Instagram</Form.Label>
								<InputGroup>
									<InputGroup.Text id="basic-addon3">
										https://instagram.com/
									</InputGroup.Text>
									<Form.Control {...register("instagram")} type="text" />
								</InputGroup>
							</Form.Group>


							{/**
							 *	Upload photo
							 */}

							<Form.Group controlId="formFile" className="mb-3" >
								<Form.Label>Välj bild</Form.Label>
								<Form.Control type="file" accept='image/jpeg, image/jpg' onChange={handleSelectedPhoto} />

								<Form.Text>
									{
										photo 
											? `${photo.name} (${Math.round(photo.size/1024)} kB), ${uploadPhoto.progress} %`
											: ''
									}
								</Form.Text>
							</Form.Group>

							{error && <Alert variant='danger'>{error}</Alert>}

							<div className='d-flex justify-content-between'>
								<div>
									<Button 
										className="me-3" 
										variant="success" 
										onClick={submit} 
										disabled={uploadPhoto.isUploading}
									> Ladda upp
									</Button>

									<Button 
										onClick={handleResetPhoto} 
										variant="warning"
									> Radera bild
									</Button>
								</div>

								<Button disabled={loading} type="submit">{auth.currentUser ? "Lägg till" : "Skicka in förslaget till oss!" }</Button>
							</div>	

						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default AddRestaurantForm