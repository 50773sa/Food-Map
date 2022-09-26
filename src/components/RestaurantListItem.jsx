import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'

const RestaurantListItem = ({ restaurant }) => {
	const linkGoogleMaps = "https://www.google.com/maps/search/?api=1&query="

	return (
			<Card>
				<Card.Header as="h2">
					{restaurant.name}
				</Card.Header>
				<Card.Body>
					<Card.Text>
						<a 
							href={linkGoogleMaps + restaurant.position.latitude + ',' + restaurant.position.longitude} 
							target="_blank"
						>{restaurant.address.street}, {restaurant.address.postcode} {restaurant.address.city}</a>
					</Card.Text>
					
					<Card.Text>
						{restaurant.restaurant_info.restaurantInfo}
					</Card.Text>
					<Card.Text>
						Typ av ställe: {restaurant.restaurant_info.restaurantType}
					</Card.Text>
				</Card.Body>
				<Card.Footer className="d-flex justify-content-center">
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
				</Card.Footer>
			</Card>
		
	)
}

export default RestaurantListItem
