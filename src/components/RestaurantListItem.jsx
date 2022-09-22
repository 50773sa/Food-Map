import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'

const RestaurantListItem = ({ restaurant }) => {
	return (
		<ListGroup.Item>
			<h1>{restaurant.name}</h1>
			<div className="d-flex flex-column">
				<p>{restaurant.address.street}, {restaurant.address.postcode} {restaurant.address.city}</p>
				<p>{restaurant.restaurant_info.restaurantInfo}</p>
			</div>
			<div>
				{restaurant.social.facebook && (
					<a href={restaurant.social.facebook} target="_blank">
						<FontAwesomeIcon icon={faFacebook} />
					</a>
				)}
				{restaurant.social.instagram && (
					<a href={restaurant.social.instagram} target="_blank">
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
			</div>
		</ListGroup.Item>
	)
}

export default RestaurantListItem
