import { useState } from "react"
import GoogleMapsAPI from "../services/GoogleMapsAPI"

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Image from 'react-bootstrap/Image'
import defaultPhoto from '../assets/Images/defaultPhoto.jpg'
import petFriendly from '../assets/Images/pet-friendly.png'
import { useEffect } from "react"


const SidebarList = ({ restaurant, currentPosition }) => {
    const [show, setShow] = useState(false)
    const baseUrl = `https://www.google.com/maps/dir/${currentPosition?.lat},${currentPosition?.lng}/`

	return (
        <>
            <div className="d-flex justify-content-center">
                <Button className="sidebar-btn dark"
                    variant="dark" size='sm' 
                    onClick={() => setShow((s) => !s)}
                > Visa Restauranger 
                </Button>
            </div>
             
            <Offcanvas className='mb-20px' show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header 
                    className='d-flex justify-content-end' 
                    onClick={() => setShow(false)} 
                    closeButton
                > 
                </Offcanvas.Header>

                <>
                    {restaurant?.map((restaurant) => (
                        <Card style={{ width: '100%' }} key={restaurant.id} className='mb-3' >
                           <Card.Img variant="top" src={restaurant.url !== null ? restaurant.url : defaultPhoto} />

                            <Card.Body>
                                <Card.Title>{restaurant.name} </Card.Title>

                                <Card.Subtitle className="mb-3 cuisine">{restaurant.restaurant_info.cuisine}
                                    <Image className='dogIcon' src={petFriendly}/>
                                </Card.Subtitle>

                                <Card.Text>
                                    <a href={baseUrl + 
                                            restaurant.position.latitude + ',' +
                                            restaurant.position.longitude
                                    }>
                                        {
                                            restaurant.address.street + ", " +
                                            restaurant.address.postcode + " " +
                                            restaurant.address.city
                                        }
                                  
                                    </a>
                                </Card.Text>

                                <hr/>

                                <Card.Text className="d-flex justify-content-end" style={{ color: 'black'}}>
                                    {restaurant.social.facebook && (
                                        <a href={restaurant.social.facebook} target="_blank">
                                            <FontAwesomeIcon icon={faFacebook} className='sidebarIcon' />
                                        </a>
                                    )}

                                    {restaurant.social.instagram && (
                                        <a href={restaurant.social.instagram} target="_blank">
                                            <FontAwesomeIcon icon={faInstagram} className='sidebarIcon' />
                                        </a>
                                    )}

                                    {restaurant.social.website && (
                                        <a href={restaurant.social.website} target="_blank">
                                            <FontAwesomeIcon icon={faGlobe} className='sidebarIcon' />
                                        </a>
                                    )}

                                    {restaurant.social.phone && (
                                        <a href={"tel:" + restaurant.social.phone} >
                                            <FontAwesomeIcon icon={faPhone} className='sidebarIcon' />
                                        </a>
                                    )}

                                    {restaurant.social.email && (
                                        <a href={"mailto:" + restaurant.social.email} >
                                            <FontAwesomeIcon icon={faEnvelope} className='sidebarIcon' />
                                        </a>
                                    )}
                                </Card.Text>

                                <hr/>

                                <Card.Text className='mb-1'><strong>Beskrivning</strong></Card.Text>
                                <Card.Text>{restaurant.restaurant_info.restaurantInfo}</Card.Text>

                            </Card.Body>
                        </Card>
                    ))}
                </>	
		    </Offcanvas>
        </>
	)
}

export default SidebarList