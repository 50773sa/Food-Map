import RestaurantList from '../components/RestaurantList'
import useGetRestaurants from '../hooks/useGetRestaurants'
import Container from 'react-bootstrap/Container'

const RestaurantsPage = () => {
	const {data, isLoading} = useGetRestaurants()

	return (
		<Container>
			{isLoading && (<p>Loading data...</p>)}
			{!isLoading && data && <RestaurantList data={data}/>}
		</Container>
	)
}

export default RestaurantsPage