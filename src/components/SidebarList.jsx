import { useState } from "react"
import defaultPhoto from '../assets/Images/defaultPhoto.jpg'

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'


const SidebarList = ({restaurant }) => {
    const [show, setShow] = useState(false)
	const linkGoogleMaps = "https://www.google.com/maps/search/?api=1&query="


	return (
        <>
            <Button className="sidebar-btn dark"
                variant="dark" size='sm' 
                onClick={() => setShow((s) => !s)}
            > Visa Restauranger 
            </Button>
             
            <Offcanvas className='mb-20px' show={show} scroll={true} >
                <Offcanvas.Header 
                    className='d-flex justify-content-end' 
                    onClick={() => setShow(false)} 
                    closeButton> 
                </Offcanvas.Header>

                <Offcanvas.Body>
                    {restaurant?.map((restaurant) => (
                        <Card style={{ width: '100%' }} key={restaurant.id} className='mb-3' >
                            <Card.Img variant="top" src={restaurant.url !== null ? restaurant.url : defaultPhoto} />

                            <Card.Body>
                                <Card.Title>{restaurant.name} </Card.Title>
                                <Card.Subtitle className="mb-3">{restaurant.restaurant_info.cuisine}</Card.Subtitle>
                                <Card.Text>
                                    {
                                        restaurant.address.street + ", " +
                                        restaurant.address.postcode + " " +
                                        restaurant.address.city
                                    }
                                </Card.Text>

                                <hr/>
                                
                                <Card.Text className="d-flex justify-content-between" style={{ color: 'black'}}>
                                    {restaurant.social.facebook && (
                                        <a href={`https://www.facebook.com/${restaurant.social.facebook}`} target="_blank">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </a>
                                    )}
                                    {restaurant.social.instagram && (
                                        <a href={`https://www.instagram.com/${restaurant.social.instagram}`} target="_blank">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </a>
                                    )}

                                    {restaurant.social.website && (
                                        <a href={restaurant.social.website} target="_blank">
                                            <FontAwesomeIcon icon={faGlobe} />
                                        </a>
                                    )}

                                    {restaurant.social.phone && (
                                        <a href={"tel:" + restaurant.social.phone}>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </a>
                                    )}

                                    {restaurant.social.email && (
                                        <a href={"mailto:" + restaurant.social.email}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </a>
                                    )}
                                </Card.Text>

                                <hr/>

                                <Card.Text>{restaurant.restaurant_info.restaurantInfo}</Card.Text>

                                <hr/>
                            </Card.Body>

                            <Button 
                                variant="primary"
                                href={
                                    linkGoogleMaps +
                                        restaurant.position.latitude + ',' +
                                        restaurant.position.longitud
                                    }
                                target="_blank"
                            > Vägbeskrivning 
                            </Button>	

                        </Card>
                    ))}
                </Offcanvas.Body>	
		    </Offcanvas>
        </>
	)
}

export default SidebarList