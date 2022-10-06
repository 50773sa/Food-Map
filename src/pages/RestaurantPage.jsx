import { useParams } from 'react-router-dom'
import useStreamDokument from '../hooks/useStreamDokument'
import LoadingSpinner from '../components/LoadingSpinner'
import EditRestaurantForm from '../components/EditRestaurantForm'
import Container from 'react-bootstrap/Container'


const RestaurantsPage = () => {
    const { id } = useParams()
	const {data: restaurant , isLoading} = useStreamDokument('restaurants', id)

	return (
		<Container>

            {isLoading && <LoadingSpinner />}
    
            {!isLoading && restaurant && (
                <EditRestaurantForm restaurant={restaurant} />
            )}

		</Container>
	)
}

export default RestaurantsPage