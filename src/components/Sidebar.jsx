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


const Sidebar = ({ show, closeInfoBox, selectedRestaurant }) => {
	const linkGoogleMaps = "https://www.google.com/maps/search/?api=1&query="

	return (
		
		<Offcanvas show={show} onHide={closeInfoBox}>
			<Offcanvas.Header className='d-flex justify-content-end' onClick={closeInfoBox} closeButton> </Offcanvas.Header>

			<Card style={{ width: '100%' }}>
				<Card.Img variant="top" src={selectedRestaurant.url !== null ? selectedRestaurant.url : defaultPhoto} />

				<Card.Body>
					<Card.Title>{selectedRestaurant.name} </Card.Title>

					<Card.Subtitle className="mb-3 cuisine">{selectedRestaurant.restaurant_info.cuisine}
						<Image className='dogIcon' src={petFriendly}/>
					</Card.Subtitle>

					<Card.Text>
						<a href={linkGoogleMaps + 
							selectedRestaurant.position.latitude + ',' +
							selectedRestaurant.position.longitude
						}>
							{
								selectedRestaurant.address.street + ", " +
								selectedRestaurant.address.postcode + " " +
								selectedRestaurant.address.city
							}
						</a>
					</Card.Text>

					<hr/>

					<Card.Text className="d-flex justify-content-end" style={{ color: 'black'}}>
						{selectedRestaurant.social.facebook && (
							<a href={selectedRestaurant.social.facebook} target="_blank">
								<FontAwesomeIcon icon={faFacebook} className='sidebarIcon' />
							</a>
						)}

						{selectedRestaurant.social.instagram && (
							<a href={selectedRestaurant.social.instagram} target="_blank">
								<FontAwesomeIcon icon={faInstagram} className='sidebarIcon' />
							</a>
						)}

						{selectedRestaurant.social.website && (
							<a href={selectedRestaurant.social.website} target="_blank">
								<FontAwesomeIcon icon={faGlobe} className='sidebarIcon' />
							</a>
						)}

						{selectedRestaurant.social.phone && (
							<a href={"tel:" + selectedRestaurant.social.phone} >
								<FontAwesomeIcon icon={faPhone} className='sidebarIcon' />
							</a>
						)}

						{selectedRestaurant.social.email && (
							<a href={"mailto:" + selectedRestaurant.social.email} >
								<FontAwesomeIcon icon={faEnvelope} className='sidebarIcon' />
							</a>
						)}
					</Card.Text>

					<hr/>

					<Card.Text className='mb-1'><strong>Beskrivning</strong></Card.Text>
					<Card.Text className= 'mb-5'>
						{selectedRestaurant.restaurant_info.restaurantInfo}
					</Card.Text>

				</Card.Body>
			</Card>
		</Offcanvas>
	)
}

export default Sidebar