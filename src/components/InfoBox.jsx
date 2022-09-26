import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'


const InfoBox = ({ show, closeWindow, selectedRestaurant }) => {

console.log('***', selectedRestaurant.address)
	return (
		<>
			<Offcanvas show={show}>
				<Offcanvas.Header  onClick={closeWindow} closeButton>
					<Offcanvas.Title>{selectedRestaurant.name}</Offcanvas.Title>
				</Offcanvas.Header>

				<Card style={{ width: '100%' }}>

					<Card.Img variant="top" src="https://via.placeholder.com/350x200?text=Kittlar+dödsskönt+i+kistan" />

					<Card.Body>
						<Card.Text>
							{
							selectedRestaurant.address.street + ", " +
							 selectedRestaurant.address.postcode + ", " +
							 selectedRestaurant.address.city
							}
						</Card.Text>

					</Card.Body>

					<ListGroup className="list-group-flush">
						<ListGroup.Item>{selectedRestaurant.restaurant_info.restaurantInfo}</ListGroup.Item>
					
					</ListGroup>

					<Card.Body>
						<Card.Link href="#">Card Link</Card.Link>
						<Card.Link href="#">Another Link</Card.Link>
					</Card.Body>
				</Card>

			
			</Offcanvas>
		</>
	
		
  

		

	)
}

export default InfoBox