import { useState, useEffect } from "react"

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
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"




const SidebarList = ({ restaurant, userPosition, setUserPosition, onGeoLocation, loading, setLoading}) => {
    const [show, setShow] = useState(false)
    const [url, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const handleFindUser = async () => {
        setLoading(true)

        onGeoLocation()
        console.log('****', onGeoLocation)
   
    }

    useEffect(() => {

        if(!userPosition.lat) {
            console.log('no user pos', userPosition)
            return

        } else {
            setUrl(`https://www.google.com/maps/dir/${userPosition?.lat},${userPosition?.lng}/`)

        }

        console.log('url', url)

        console.log('3')
        console.log('loading', isLoading)
        
    },[userPosition, url])

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
                    closeButton> 
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
                                    <Card.Text >
                                     
                                                    {/* <a href={url + restaurant?.position?.lat + ',' + restaurant?.position?.lng} target="_blank"> */}
                                                    {
                                                        restaurant.address.street + ", " +
                                                        restaurant.address.postcode + " " +
                                                        restaurant.address.city
                                                    }
                                                 {/* </a> */}
                                                 <br/>
                               
                                                    {!userPosition.lat && (
                                                        <Button onClick={onGeoLocation}>
                                                            Vägbeskrivning          
                                                        </Button>
                                                    )}
                                          
                                                    {userPosition.lat && (
                                                        <Button 
                                                            variant="success"
                                                            onClick={handleFindUser}
                                                            target="_blank"
                                                            href={url 
                                                                + restaurant?.position?.latitude 
                                                                + ',' 
                                                                + restaurant?.position?.longitude
                                                            }
                                                            > Ta mig dit nu!
                                                        </Button>
                                                    )}
                                            

                                                
                                                    
                                

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