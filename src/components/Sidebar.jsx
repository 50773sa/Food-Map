
// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from "react-bootstrap/Button"
import defaultPhoto from "../assets/Images/defaultPhoto.jpg"





const Sidebar = ({ show, closeInfoBox, selectedRestaurant }) => {
	const linkGoogleMaps = "https://www.google.com/maps/search/?api=1&query="

	return (
		
		<Offcanvas show={show}>
			<Offcanvas.Header className='d-flex justify-content-end' onClick={closeInfoBox} closeButton> </Offcanvas.Header>

			<Card style={{ width: '100%' }}>
				<Card.Img variant="top" src={selectedRestaurant.url !== null ? selectedRestaurant.url : defaultPhoto} />

				<Card.Body>
					<Card.Title>{selectedRestaurant.name} </Card.Title>

					<Card.Subtitle className="mb-3 cuisine">{selectedRestaurant.restaurant_info.cuisine}</Card.Subtitle>

					<Card.Text>
						{
							selectedRestaurant.address.street + ", " +
							selectedRestaurant.address.postcode + " " +
							selectedRestaurant.address.city
						}
					</Card.Text>

					<hr/>

					<Card.Text className="d-flex justify-content-end" style={{ color: 'black'}}>
						{selectedRestaurant.social.facebook && (
							<a href={selectedRestaurant.social.facebook} className="" target="_blank">
								<FontAwesomeIcon icon={faFacebook} />
							</a>
						)}

						{selectedRestaurant.social.instagram && (
							<a href={selectedRestaurant.social.instagram} className="" target="_blank">
								<FontAwesomeIcon icon={faInstagram} />
							</a>
						)}

						{selectedRestaurant.social.website && (
							<a href={selectedRestaurant.social.website} className="" target="_blank">
								<FontAwesomeIcon icon={faGlobe} />
							</a>
						)}

						{selectedRestaurant.social.phone && (
							<a href={"tel:" + selectedRestaurant.social.phone} className="" >
								<FontAwesomeIcon icon={faPhone} />
							</a>
						)}

						{selectedRestaurant.social.email && (
							<a href={"mailto:" + selectedRestaurant.social.email} className="">
								<FontAwesomeIcon icon={faEnvelope} />
							</a>
						)}
					</Card.Text>
					<hr/>

					<Card.Text className='mb-1'><strong>Beskrivning</strong></Card.Text>
					<Card.Text>{selectedRestaurant.restaurant_info.restaurantInfo}</Card.Text>
					<hr/>
				</Card.Body>

				<Button 
					variant="primary"
					href={
						linkGoogleMaps +
							selectedRestaurant.position.latitude + ',' +
							selectedRestaurant.position.longitud
						}
					target="_blank"
				> Vägbeskrivning 
				</Button>	

			</Card>
		</Offcanvas>
	)
}

export default Sidebar