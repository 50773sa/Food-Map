import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'


const HomePage = () => {

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-center">
				<Link className="m-4" to="/restaurants">See all restaurants</Link>
				<Link className="m-4" to="/map">Go to the map</Link>
			</div>
		</Container>
	)
}

export default HomePage
