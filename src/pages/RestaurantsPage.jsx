import Container from 'react-bootstrap/Container'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import RestaurantList from '../components/RestaurantList'
import { db } from '../firebase'


const RestaurantsPage = () => {
	const queryRef = query(
		collection(db, 'restaurants')
	)

	const { data, isLoading } = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: 'true' //för att firebase ska uppdatera listan när något har ändrats
	})

	return (
		<Container>
			{isLoading && (<p>Loading data...</p>)}
			{!isLoading && data && <RestaurantList data={data}/>}

		</Container>
	)
}

export default RestaurantsPage