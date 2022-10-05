import RestaurantList from '../components/RestaurantList'
import useGetApprovedRestaurants from '../hooks/useGetApprovedRestaurants'
import Container from 'react-bootstrap/Container'

const RestaurantsPage = () => {
	const {data, isLoading} = useGetApprovedRestaurants()

	return (
		<Container>
			{isLoading && (<p>Loading data...</p>)}
			{!isLoading && data && <RestaurantList data={data}/>}
		</Container>
	)
}

export default RestaurantsPage