import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import useStreamDokument from '../hooks/useStreamDokument'
import LoadingSpinner from '../components/LoadingSpinner'
import EditRestaurantForm from '../components/EditRestaurantForm'

const RestaurantsPage = () => {
    const { id } = useParams()
	const {data: restaurant , isLoading} = useStreamDokument('restaurants', id)

    console.log(restaurant)

	return (
		<Container>

            <Row>
                <Col md={6} className="m-auto">

			        {isLoading && <LoadingSpinner />}
			
                    {!isLoading && restaurant && (
                        <EditRestaurantForm restaurant={restaurant} />
                    )}

                </Col>
            </Row>

		</Container>
	)
}

export default RestaurantsPage