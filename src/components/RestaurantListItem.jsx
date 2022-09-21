import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const RestaurantListItem = ({ restaurant }) => {
	return (
		<ListGroup.Item
			action
			as={Link}
			to={`/restaurant/${restaurant.id}`}
		>
			<p>{restaurant.name}</p>
		</ListGroup.Item>
	)
}

export default RestaurantListItem
