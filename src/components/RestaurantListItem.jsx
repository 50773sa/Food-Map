import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'
import defaultImage from '../assets/Images/defaultPhoto.jpg'

const RestaurantListItem = ({ restaurant }) => {
	const linkGoogleMaps = "https://www.google.com/maps/search/?api=1&query="

	return (
        <div className='card-w'>
            <Row className="card-row">
                <Col md={8} sm={6} className="column-1">
                    <div className='text-box'>
                        <div className='info-header'>
                            <h4 className='info-title'>{restaurant.name}</h4>
                            <p className='info-street'>{restaurant.address.street}</p>
                        </div>
                        <div className="info-box">
                            <p className='info-text'>-{restaurant.restaurant_info.cuisine}</p>
                            <p className='info-text'>{restaurant.restaurant_info.restaurantSort}</p>
                            <p className='info-text'>{restaurant.restaurant_info.restaurantType}-</p>
                        </div>
                            <p className='info-info'>{restaurant.restaurant_info.restaurantInfo}</p>
                        <div className='social'>
                            {restaurant.social.email && (
                                <span className="fa-icon">
                                    <a href={"mailto:" + restaurant.social.email}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </a>
                                </span>
                            )}
                            {restaurant.social.facebook && (
                                <span className="fa-icon">
                                    <a href={`https://www.facebook.com/$restaurant.social.facebook`} target="_blank">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                </span>
                            )}
                            {restaurant.social.instagram && (
                                <span className="fa-icon">
                                    <a href={`https://www.instagram.com/${restaurant.social.instagram}`} target="_blank">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </span>
                            )}
                            {restaurant.social.website && (
                                <span className="fa-icon">
                                    <a href={restaurant.social.website} target="_blank">
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </a>
                                </span>
                            )}
                            {restaurant.social.phone && (
                                <span>
                                    <a href={"tel:" + restaurant.social.phone}>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </a>
                                </span>
                            )}
                        </div>
                    </div>
                </Col>
                <Col md={4}sm={6} className="column-2">
                    <div className='image-box'>
                        <img src={restaurant.url ? restaurant.url : defaultImage} className="img-fluid box-image" alt="" />
                    </div>
                </Col>
            </Row>
        </div>
	)
}

export default RestaurantListItem
