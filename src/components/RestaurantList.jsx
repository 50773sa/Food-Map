import ListGroup from 'react-bootstrap/ListGroup'
import RestaurantListItem from './RestaurantListItem'

const RestaurantList = ({ data }) => {
	return (
		<ListGroup>
			{data.map((restaurant) => (
				<RestaurantListItem restaurant={restaurant} key={restaurant.id} />
			))}
		</ListGroup>
	)
}

export default RestaurantList
