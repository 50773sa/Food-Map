import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const AddRestaurantPage = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(null)

	const handleSubmit = () => {
		console.log('submit the form')
	}

	return (
		<Container>
			<Row className="my-4">
				<Col>
					<Card>
						<Card.Header as="h5">Tipsa oss om en restaurang</Card.Header>
						<Card.Body>
							{error && (<Alert variant="danger">{error}</Alert>)}
							{message && (<Alert variant="success">{message}</Alert>)}

							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3">
									<Form.Label>Namn</Form.Label>
									<Form.Control type="text" placeholder="Namn på stället" required />
								</Form.Group>

								<Form.Group className="mb-3">
									<Row>
										<Col>
											<Form.Label>Adress</Form.Label>
											<Form.Control type="text" placeholder="Adress" required />
										</Col>
									</Row>
									<Row className="mt-2">
										<Col>
											<Form.Control type="number" placeholder="Postnummer" required />
											
										</Col>
										<Col>
											<Form.Control type="text" placeholder="Stad" required />
											
										</Col>
									</Row>
								</Form.Group>

								<Form.Group className="mb-3">
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Info om restaurangen</Form.Label>
									<Form.Control as="textarea" rows={2} type="text" placeholder="Skriv något om restaurangen" required />
								</Form.Group>
								
								<Form.Group className="mb-3">
									<Form.Label>Vad är det för typ av ställe</Form.Label>
									<Form.Select>
										<option>Café</option>
										<option>Restaurang</option>
										<option>Snabbmat</option>
										<option>Kiosk/Grill</option>
										<option>Food truck</option>
									</Form.Select>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Utbud</Form.Label>
									<Form.Check
										inline
										label="Lunch"
										type="checkbox"
										id="lunch"
										className="mx-2"
									/>
									<Form.Check
										inline
										label="After work"
										type="checkbox"
										id="after-work"
										className="mx-2"
									/>
									<Form.Check
										inline
										label="A la carte"
										type="checkbox"
										id="a-la-carte"
										className="mx-2"
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Vad för slags mat?</Form.Label>
									<Form.Control type="text" placeholder="Typ av mat" required />
								</Form.Group>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" />
								</Form.Group>

								<Form.Group id="phone" className="mb-3">
									<Form.Label>Telefonnummer</Form.Label>
									<Form.Control type="number" />
								</Form.Group>

								<Form.Group id="website" className="mb-3">
									<Form.Label>Hemsida</Form.Label>
									<Form.Control type="text" />
								</Form.Group>

								<Form.Group id="facebook" className="mb-3">
									<Form.Label>Facebook</Form.Label>
									<Form.Control type="text" />
								</Form.Group>

								<Form.Group id="instagram" className="mb-3">
									<Form.Label>Instagram</Form.Label>
									<Form.Control type="text" />
								</Form.Group>

								<Button disabled={loading} type="submit">Skicka in förslag till oss!</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default AddRestaurantPage