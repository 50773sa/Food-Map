import Container from 'react-bootstrap/Container'
import useLatLng from '../hooks/useLatLng'
import useCity from '../hooks/useCity'

const HomePage = () => {
	let lat = "40.714224"
	let lng = "-73.961452"
	const { data: address, isLoading: isLoadingAddress, isError: isErrorAddress } = useLatLng(lat, lng)
	const { data: city, isLoading: isLoadingCity, isError: isErrorCity } = useCity(lat, lng)

	return (
		<Container className="py-3">
			<h1 className="display-1">😂</h1>

			<p className="display-2">Hallå!</p>
			{isLoadingAddress && <p>Loading...</p>}
			{isErrorAddress && <p>Error</p>}
			{address && <p>vi har adressen - adress: {address.results[0].formatted_address}</p>}

			{isLoadingCity && <p>Loading city</p>}
			{isErrorCity && <p>Error</p>}
			{city && <p>vi har staden - stad: {city.results[0].address_components[0].long_name}</p>}

		</Container>
	)
}

export default HomePage
