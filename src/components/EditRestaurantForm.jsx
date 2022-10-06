import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import GoogleMapsAPI from '../services/GoogleMapsAPI'
import InputGroup from 'react-bootstrap/InputGroup'
import useUploadPhoto from '../hooks/useUploadPhoto'

const EditRestaurantForm = ({ restaurant }) => {
    const { id } = useParams()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: {errors}} = useForm()
    const [photo, setPhoto] = useState(null)
	const uploadPhoto = useUploadPhoto()
    const navigate = useNavigate()

    const deleteRestaurant = async () => {
        await deleteDoc(doc(db,'restaurants', id))
		navigate('/admin', { replace: true })
	}
    
    const toggleStatus = async () => {
		const ref = doc(db, 'restaurants', id)
		await updateDoc(ref, {
			approved: !restaurant.approved,
		})
	}

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

    const onUpdateRestaurant = async (data) => {
        console.log(restaurant.address.street)
        
        const street = data.street ? data.street : restaurant.address.street
        const city = data.city ? data.city : restaurant.address.city 

        console.log(street)
        console.log(city)
        
			//get longitud and latitude from address
			const res = await GoogleMapsAPI.getLatLng(street, city)

            const lng = res.results[0].geometry.location.lng
            const lat = res.results[0].geometry.location.lat

            console.log(res)
            //update firestore doc to store in the DB
            await updateDoc(doc(db, 'restaurants', id), {
                name: data.name=="" ? restaurant.name : data.name,
                address: {
                    street: street,
                    postcode: data.postcode=="" ? restaurant.address.postcode : data.postcode,
                    city: city.toLowerCase(),
                },
                restaurant_info: {
                    restaurantInfo: data.restaurantInfo =="" ? restaurant.restaurant_info.restaurantInfo : data.restaurantInfo,
                    restaurantType: data.restaurantType =="" ? restaurant.restaurant_info.restaurantType : data.restaurantType,
                    restaurantSort: data.restaurantSort=="" ? restaurant.restaurant_info.restaurantSort : data.restaurantSort,
                    cuisine: data.cuisine=="" ? restaurant.restaurant_info.cuisine : data.cuisine,
                },
                social: {
                    email: data.email=="" ? restaurant.social.email : data.email,
                    phone: data.phone=="" ? restaurant.social.phone : data.phone,
                    website: data.website=="" ? restaurant.social.website : data.website,
                    facebook: data.facebook=="" ? restaurant.social.facebook : data.facebook,
                    instagram: data.instagram=="" ? restaurant.social.instagram : data.instagram,
                },
                position: {
                    latitude: lat,
                    longitude: lng,
                },
                url: uploadPhoto.URL,
            })
            console.log(restaurant)
            navigate('/admin')
    }
                
    return (
        <Row className="my-4">
            <Col md={8} className="m-auto">
                <Card className='form-card'>
                    <Card.Header className="form-header" as="h5">Redigera Restaurang
                    </ Card.Header>
					<Card.Body>
        
                        <Form onSubmit={handleSubmit(onUpdateRestaurant)} noValidate>
                            <Form.Group className="mb-3">
                                <Form.Label>Namn*</Form.Label>
                                <Form.Control 
                                    {...register("name")}
                                    defaultValue={restaurant.name}
                                    type="text" placeholder="Namn på stället" />
                                    {errors.name && <div className="invalid">{errors.name.message}</div>}
                            </Form.Group>

                            {/* <div>
                                <img src={restaurant.url} alt="" />
                            </div> */}

                            <Form.Group className="mb-3">
                                <Row>
                                    <Col>
                                        <Form.Label>Adress*</Form.Label>
                                        <Form.Control 
                                            {...register("street")}
                                            defaultValue={restaurant.address?.street}
                                            type="text" placeholder="Adress" 
                                        />
                                        {errors.street && <div className="invalid">{errors.street.message}</div>}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <Form.Control 
                                            {...register("postcode")}
                                            defaultValue={restaurant.address?.postcode}
                                            type="number" placeholder="Postnummer" 
                                        />
                                        {errors.postcode && <div className="invalid">{errors.postcode.message}</div>}
                                    </Col>
                                    <Col>
                                        <Form.Control 
                                            {...register("city")}
                                            defaultValue={restaurant.address?.city}
                                            type="text" placeholder="Stad" 
                                        />
                                        {errors.city && <div className="invalid">{errors.city.message}</div>}
                                    </Col>
                                </Row>
                            </Form.Group>   

                            <Form.Group className="mb-3">
                                <Form.Label>Info om restaurangen*</Form.Label>
                                <Form.Control 
                                    {...register("restaurantInfo")}
                                    as="textarea" rows={2} defaultValue={restaurant.restaurant_info?.restaurantInfo} 
                                    type="text" placeholder="Skriv något om restaurangen" />
                                {errors.restaurantInfo && <div className="invalid">{errors.restaurantInfo.message}</div>}

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Vad är det för typ av ställe*</Form.Label>
                                <Form.Select {...register("restaurantType")} value={restaurant.restaurant_info?.restaurantType}>
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
                                <Form.Select {...register("restaurantSort")} value={restaurant.restaurant_info?.restaurantSort}>
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
                                    {...register("cuisine")}
                                    defaultValue={restaurant.restaurant_info?.cuisine}
                                    type="text" placeholder="T ex franskt, thailändskt ..." />
                                {errors.cuisine && <div className="invalid">{errors.cuisine.message}</div>}
                            </Form.Group>

                            <Form.Group id="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control {...register("email")} defaultValue={restaurant.social?.email} type="email" />
                            </Form.Group>

                            <Form.Group id="phone" className="mb-3">
                                <Form.Label>Telefonnummer</Form.Label>
                                <Form.Control {...register("phone")} type="number" defaultValue={restaurant.social?.phone} />
                            </Form.Group>

                            <Form.Group id="website" className="mb-3">
                                <Form.Label>Hemsida</Form.Label>
                                <Form.Control {...register("website")} type="text" defaultValue={restaurant.social?.website} />
                            </Form.Group>

                            <Form.Group id="facebook" className="mb-3">
                                <Form.Label>Facebook</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon3">
                                        https://facebook.com/
                                    </InputGroup.Text>
                                    <Form.Control {...register("facebook")} type="text" defaultValue={restaurant.social?.facebook} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group id="instagram" className="mb-3">
                                <Form.Label>Instagram</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon3">
                                        https://instagram.com/
                                    </InputGroup.Text>
                                    <Form.Control {...register("instagram")} type="text" defaultValue={restaurant.social?.instagram} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3" >
                                <Form.Label >Välj bild</Form.Label>
                                <Form.Control type="file" accept='image/jpeg, image/jpg' onChange={handleSelectedPhoto}  />

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
                            </div>

                            <h4>Status: {restaurant.approved ? 'Approved' : 'Not approved'}</h4>

                            <div className='d-flex justify-content-between'>
                                <div>
                                    <Button className="me-3" variant="success" type="submit">Save</Button>          
                                    <Button className="me-3" variant="primary" onClick={toggleStatus}>Toggle Status</Button>          
                                    <Button variant="danger" onClick={deleteRestaurant}>Delete</Button> 
                                </div>     
                            </div>        
                                
                        </Form>
                    </Card.Body>
				</Card>
			</Col>
		</Row>
    )
}

export default EditRestaurantForm