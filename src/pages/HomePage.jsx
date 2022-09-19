import Container from 'react-bootstrap/Container'
import useLatLng from '../hooks/useLatLng'

const HomePage = () => {
	let lat = "40.714224"
	let lng = "-73.961452"
	const { data, error, isError, isLoading } = useLatLng(lat, lng)
	console.log('data', data)


	return (
		<Container className="py-3">
			<h1 className="display-1">😂</h1>

			<p className="display-2">Hallå!</p>
			{data && <p>vi har data - adress: {data.results[0].formatted_address}</p>}

		</Container>
	)
}

export default HomePage
