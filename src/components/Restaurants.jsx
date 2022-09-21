import { Alert } from 'bootstrap'
import { MarkerF } from "@react-google-maps/api"

const Restaurants = ({ query }) => {

    if (query.isError) {
        return (
            <Alert variant='warning'>
                {query.error.message}
            </Alert>
        )
    }

    if (query.isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {query?.data && query.data.map((rest, i) => {
                <MarkerF key={i} restaurant={rest} />
            })}
        </div>
    )
}

export default Restaurants