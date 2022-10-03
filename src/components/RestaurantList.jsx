import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RestaurantListItem from './RestaurantListItem'

const RestaurantList = ({ data }) => {
	
	return (
		<>
			<Row xs={1} sm={2} md={2} lg={3}>
				{data
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((restaurant, i) => (
						<Col className="my-3" key={i}>
							<RestaurantListItem restaurant={restaurant} />
						</Col>
					))
				}
			</Row>
		</>
	)
}

export default RestaurantList
