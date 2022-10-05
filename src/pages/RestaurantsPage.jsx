import RestaurantList from '../components/RestaurantList'
import useGetApprovedRestaurants from '../hooks/useGetApprovedRestaurants'
import Container from 'react-bootstrap/Container'
import SearchFilterBar from '../components/SearchFilterBar'

const RestaurantsPage = () => {
	const {data, isLoading} = useGetApprovedRestaurants()

	return (
		<Container>
			<SearchFilterBar data={data}/>
			{isLoading && (<p>Loading data...</p>)}
			{!isLoading && data && <RestaurantList data={data}/>}
		</Container>
	)
}

export default RestaurantsPage