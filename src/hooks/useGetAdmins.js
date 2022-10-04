import { db } from '../firebase'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetAdmins = () => {
    // Get reference of collection 'restaurants'
    const queryRef = query(
		collection(db, 'admins')
	)

	const restaurantsQuery = useFirestoreQueryData(['admins'], queryRef, {
		idField: 'id',
		subscribe: 'true' //för att firebase ska uppdatera listan när något har ändrats
	})

    return restaurantsQuery
}

export default useGetAdmins