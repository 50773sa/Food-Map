import Container from 'react-bootstrap/Container'
import useLatLng from '../hooks/useLatLng'
import useCity from '../hooks/useCity'

const HomePage = () => {
	let lat = "40.714224"
	let lng = "-73.961452"
	const { data: address } = useLatLng(lat, lng)
	const { data: city } = useCity(lat, lng)
	console.log('data', address)
	console.log('city', city)

	const theAddress = address.results[0].formatted_address
	const theCity = city.results[0].address_components[0].long_name


	return (
		<Container className="py-3">
			<h1 className="display-1">😂</h1>

			<p className="display-2">Hallå!</p>
			{address && <p>vi har adressen - adress: {theAddress}</p>}
			{city && <p>vi har staden - stad: {theCity}</p>}

		</Container>
	)
}

export default HomePage
