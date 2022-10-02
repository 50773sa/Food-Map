// import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import GoogleMapsAPI from '../services/GoogleMapsAPI'

const EditRestaurantForm = ({ restaurant }) => {
    const { id } = useParams()
    const { register, handleSubmit, formState: {errors}} = useForm()
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
    
    const onUpdateRestaurant = async (data) => {
        
		if (data.street && data.city) {
			//get longitud and latitude from address
			const res = await GoogleMapsAPI.getLatLng(data.street, data.city)

			if (res) {
				const lng = res.results[0].geometry.location.lng
				const lat = res.results[0].geometry.location.lat

                console.log(res)
                //update firestore doc to store in the DB
                await updateDoc(doc(db, 'restaurants', id), {
                    name: data.name ? data.name : restaurant.name,
                    address: {
                        street: data.street,
                        postcode: data.postcode,
                        city: data.city,
                    },
                    restaurant_info: {
                        restaurantInfo: data?.restaurantInfo,
                        restaurantType: data?.restaurantType ,
                        restaurantSort: data?.restaurantSort,
                        cuisine: data?.cuisine,
                    },
                    social: {
                        email: data?.email,
                        phone: data.phone,
                        website: data.website,
                        facebook: data.facebook,
                        instagram: data.instagram,
                    },
                    position: {
                        latitude: lat,
                        longitude: lng,
                    },
                })
            }
        } else {
            console.log('could not fetch the coordinates')
        }

    }
                
    return (
        <Form onSubmit={handleSubmit(onUpdateRestaurant)} noValidate className='my-5'>

            <Form.Group className="mb-3">
                <Form.Label>Namn*</Form.Label>
                <Form.Control 
                    {...register("name", {
                        // required: "skriv för fan",
                        // minLength: {
                        //     value: 2,
                        //     message: "That's too short be a name!"
                        // }
                    })}
                    defaultValue={restaurant.name}
                    type="text" placeholder="Namn på stället" />
                    {errors.name && <div className="invalid">{errors.name.message}</div>}
            </Form.Group>

            <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email")} defaultValue={restaurant.social?.email} type="email" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Adress*</Form.Label>
                <Form.Control 
                    {...register("street", {
                        // required: "You must enter an address",
                        // minLength: {
                        //     value: 4,
                        //     message: "That's too short be an address!"
                        // }
                    })}
                    defaultValue={restaurant.address?.street}
                    type="text" placeholder="Adress" />
                    {errors.street && <div className="invalid">{errors.street.message}</div>}

                <Form.Control 
                    {...register("postcode", {
                        // required: "You must enter a postcode",
                        // minLength: {
                        //     value: 5,
                        //     message: "That's too short be an address!"
                        // }
                    })}
                    defaultValue={restaurant.address?.postcode}
                    type="number" placeholder="Postnummer" />
                    {errors.postcode && <div className="invalid">{errors.postcode.message}</div>}


                <Form.Control 
                    {...register("city", {
                        // required: "You must enter a city",
                        // minLength: {
                        //     value: 2,
                        //     message: "That's not a city!"
                        // }
                    })}
                    defaultValue={restaurant.address?.city}
                    type="text" placeholder="Stad" />
                    {errors.city && <div className="invalid">{errors.city.message}</div>}

            </Form.Group>   

            <Form.Group className="mb-3">
                <Form.Label>Info om restaurangen*</Form.Label>
                <Form.Control 
                    {...register("restaurantInfo", {
                        // required: "Please write something about the place",
                        // minLength: {
                        //     value: 2,
                        //     message: "We'd like some more information please..."
                        // }
                    })}
                    as="textarea" rows={2} defaultValue={restaurant.restaurant_info?.restaurantInfo} 
                    type="text" placeholder="Skriv något om restaurangen" />
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
                <Form.Check
                    {...register("restaurantSort")}
                    inline
                    label="Lunch"
                    value="Lunch"
                    type="checkbox"
                    id="lunch"
                    className="mx-2"
                />
                <Form.Check
                    {...register("restaurantSort")}
                    inline
                    label="After work"
                    value="After work"
                    type="checkbox"
                    id="after-work"
                    className="mx-2"
                />
                <Form.Check
                    {...register("restaurantSort")}
                    inline
                    label="A la carte"
                    value="A la carte"
                    type="checkbox"
                    id="a-la-carte"
                    className="mx-2"
                />
                <Form.Check
                    {...register("restaurantSort")}
                    inline
                    label="Bar"
                    value="Bar"
                    type="checkbox"
                    id="bar"
                    className="mx-2"
                />
                {errors.restaurantSort && <div className="invalid">{errors.restaurantSort.message}</div>}

            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Vad för slags kök?*</Form.Label>
                <Form.Control 
                    {...register("cuisine", {
                        // required: "Please write what kind of cuisine that is served here",
                        // minLength: {
                        //     value: 2,
                        //     message: "We'd like some information about the cuisine please..."
                        // }
                    })}
                    defaultValue={restaurant.restaurant_info?.cuisine}
                    type="text" placeholder="T ex franskt, thailändskt ..." />
                {errors.cuisine && <div className="invalid">{errors.cuisine.message}</div>}
            </Form.Group>

            <Form.Group id="phone" className="mb-3">
                <Form.Label>Telefonnummer</Form.Label>
                <Form.Control {...register("phone")} type="number" />
            </Form.Group>

            <Form.Group id="website" className="mb-3">
                <Form.Label>Hemsida</Form.Label>
                <Form.Control {...register("website")} type="text" />
            </Form.Group>

            <Form.Group id="facebook" className="mb-3">
                <Form.Label>Facebook</Form.Label>
                <Form.Control {...register("facebook")} type="text" />
            </Form.Group>

            <Form.Group id="instagram" className="mb-3">
                <Form.Label>Instagram</Form.Label>
                <Form.Control {...register("instagram")} type="text" />
            </Form.Group>

            {/* <Form.Group className="mb-3">
                <Form.Label>Godkänd</Form.Label>
                <Form.Select {...register("approved")}>
                    <option>Nä</option>
                    <option>Ja</option>
                </Form.Select>
                {errors.restaurantType && <div className="invalid">{errors.restaurantType.message}</div>}

            </Form.Group> */}
            <h4>Status: {restaurant.approved ? 'Approved' : 'Not approved'}</h4>

            <Button variant="success" type="submit">Save</Button>          
            <Button variant="primary" onClick={toggleStatus}>Toggle Status</Button>          
            <Button variant="danger" onClick={deleteRestaurant}>Delete</Button>             
        </Form>
    )
}

export default EditRestaurantForm