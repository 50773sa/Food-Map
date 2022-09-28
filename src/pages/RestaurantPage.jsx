import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import useStreamDokument from '../hooks/useStreamDokument'
import LoadingSpinner from '../components/LoadingSpinner'
import EditRestaurantForm from '../components/EditRestaurantForm'

const RestaurantsPage = () => {
    const { id } = useParams()
	const {data, isLoading} = useStreamDokument('restaurants', id)

    console.log(data)

	return (
		<Container>

			{isLoading && <LoadingSpinner />}
			
            {!isLoading && data && (
                <EditRestaurantForm data={data} />
            )}

		</Container>
	)
}

export default RestaurantsPage