import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetApprovedRestaurants = () => {
    // Get reference of collection 'restaurants'
    const queryRef = query(
		collection(db, 'restaurants'),
        where('approved', '==', true)
	)

	const restaurantsQuery = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: 'true' //för att firebase ska uppdatera listan när något har ändrats
	})

    return restaurantsQuery
}

export default useGetApprovedRestaurants