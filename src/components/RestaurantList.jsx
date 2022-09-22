import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RestaurantListItem from './RestaurantListItem'

const RestaurantList = ({ data }) => {
	return (
		<Container>
			<Row xs={1} sm={2} md={2} lg={3}>
				
					{data.map((restaurant) => (
						<Col className="my-3">
							<RestaurantListItem restaurant={restaurant} key={restaurant.id} />
						</Col>
					))}
			</Row>
		</Container>
	)
}

export default RestaurantList
