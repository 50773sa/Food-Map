import RestaurantList from '../components/RestaurantList'
import useGetRestaurants from '../hooks/useGetRestaurants'
import Container from 'react-bootstrap/Container'
import SearchFilterBar from '../components/SearchFilterBar'

const RestaurantsPage = () => {
	const {data, isLoading} = useGetRestaurants()

	return (
		<Container>
			<SearchFilterBar data={data}/>
			{isLoading && (<p>Loading data...</p>)}
			{!isLoading && data && <RestaurantList data={data}/>}
		</Container>
	)
}

export default RestaurantsPage