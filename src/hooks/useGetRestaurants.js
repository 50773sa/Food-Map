import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetRestaurants = () => {
    // Get reference of collection 'restaurants'
    const queryRef = query(
		collection(db, 'restaurants'),
        where('approved', '==', false)
	)

	const restaurantsQuery = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: 'true' //för att firebase ska uppdatera listan när något har ändrats
	})

    return restaurantsQuery
}

export default useGetRestaurants