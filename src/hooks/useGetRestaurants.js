import { db } from '../firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetRestaurants = () => {

    // Create referens to restaurants collection
    const collectionRef = collection(db, 'restaurants')

    // Sort by city
    const queryRef = query(collectionRef, orderBy('city'))
    console.log('query ref', queryRef)

    // Run query
    const restQuery = useFirestoreQueryData(['restaurants'], queryRef,{
        id : 'id'
    }, {
        // refetch if query is stale
        refetchOnMount: 'always'
    })

  return restQuery
}

export default useGetRestaurants