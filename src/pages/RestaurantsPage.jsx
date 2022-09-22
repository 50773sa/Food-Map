import RestaurantList from '../components/RestaurantList'
import useGetRestaurants from '../hooks/useGetRestaurants'


const RestaurantsPage = () => {

	const {data, isLoading} = useGetRestaurants()

	return (
		<>
			{isLoading && (<p>Loading data...</p>)}
			{!isLoading && data && <RestaurantList data={data}/>}

		</>
	)
}

export default RestaurantsPage