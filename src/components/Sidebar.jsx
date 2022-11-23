import { useEffect, useState } from 'react'
import { useSearchParams} from 'react-router-dom'

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Image from 'react-bootstrap/Image'
import defaultPhoto from "../assets/Images/defaultPhoto.jpg"
import petFriendly from '../assets/Images/pet-friendly.png'
import GoogleMapsAPI from '../services/GoogleMapsAPI'


const Sidebar = ({ show, closeInfoBox, selectedRestaurant, currentPosition }) => {

    const baseUrl = `https://www.google.com/maps/dir/${currentPosition?.lat},${currentPosition?.lng}/`
    
    useEffect(() => {

    }, [baseUrl])

	return (
		
		<Offcanvas show={show} onHide={closeInfoBox}>
			<Offcanvas.Header className='d-flex justify-content-end' onClick={closeInfoBox} closeButton> </Offcanvas.Header>

            <div className='single-wrapper'>
                <img src={petFriendly} className="pet-img" alt="" />
                <div className='single-img-wrapper'>
                    <img src={selectedRestaurant.url !== null ? selectedRestaurant.url : defaultPhoto} className="img-fluid single-img" alt="" />
                </div>
                <div className='single-content'>
                    <div className='single-header'>
                        <h3 className='single-title'>{selectedRestaurant.name}
                        </h3>
                        <p className='single-street'> 
                            <a href={baseUrl + 
                                selectedRestaurant.position.latitude + ',' +
                                selectedRestaurant.position.longitude 

                            }>
                                {
                                    selectedRestaurant.address.street + ", " +
                                    selectedRestaurant.address.postcode + " " +
                                    selectedRestaurant.address.city
                                }
                            </a>
                        </p>
                    </div>
                        <hr className='line'/>
                    <div className="single-box">
                        <p className='single-text'>-{selectedRestaurant.restaurant_info.cuisine}</p>
                        <p className='single-text'>-{selectedRestaurant.restaurant_info.restaurantSort}</p>
                        <p className='single-text'>-{selectedRestaurant.restaurant_info.restaurantType}</p>
                    </div>
                        <p className='single-info'>{selectedRestaurant.restaurant_info.restaurantInfo}</p>
                    <div className='single-social'>
                        {selectedRestaurant.social.email && (
                            <span className="fa-icon">
                                <a href={"mailto:" + selectedRestaurant.social.email}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </a>
                            </span>
                        )}
                        {selectedRestaurant.social.facebook && (
                            <span className="fa-icon">
                                <a href={`https://www.facebook.com/${selectedRestaurant.social.facebook}`} target="_blank">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </span>
                        )}
                        {selectedRestaurant.social.instagram && (
                            <span className="fa-icon">
                                <a href={`https://www.instagram.com/${selectedRestaurant.social.instagram}`} target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </span>
                        )}
                        {selectedRestaurant.social.website && (
                            <span className="fa-icon">
                                <a href={selectedRestaurant.social.website} target="_blank">
                                    <FontAwesomeIcon icon={faGlobe} />
                                </a>
                            </span>
                        )}
                        {selectedRestaurant.social.phone && (
                            <span>
                                <a href={"tel:" + selectedRestaurant.social.phone}>
                                    <FontAwesomeIcon icon={faPhone} />
                                </a>
                            </span>
                        )}
                    </div>
                </div>
            </div>            




		</Offcanvas>


        
	)
}

export default Sidebar