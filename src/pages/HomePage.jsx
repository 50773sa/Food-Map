import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import doglogo from '../assets/Images/Dog.svg'

const HomePage = () => {

	return (
		<div className="py-3 home-container">
			<div className="image_holder">
				<Link className="m-4" to="/restaurants">See all restaurants</Link>
				<Image src={doglogo} className="image-home"/>
				<Link className="m-4" to="/map">Go to the map</Link>
			</div>
		</div>
	)
}

export default HomePage
