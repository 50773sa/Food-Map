import { useMemo } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col } from 'react-bootstrap'
// import AddAdmin from '../components/AddAdmin'
import useGetRestaurants from '../hooks/useGetRestaurants'
import BasicTable from '../components/BasicTable'
import LoadingSpinner from '../components/LoadingSpinner'


const AdminPage = () => {
    const {data, isLoading} = useGetRestaurants()
    const { currentUser } = useAuthContext()

    console.log(data)

    const columns = useMemo(() => {
        return [
            {
                Header: 'Namn',
                accessor: 'name',
            },
            {
                Header: 'Stad',
                accessor: 'address.city',
            },
            {
                Header: 'Address',
                accessor: 'address.street',
            },
            {
                Header: 'Cuisine',
                accessor: 'restaurant_info.cuisine',
            },
            {
                Header: 'Sort',
                accessor: 'restaurant_info.restaurantSort',
            },
            {
                Header: 'Typ',
                accessor: 'restaurant_info.restaurantType',
            },
        ]
    },[])

    return (
            <>
                <div>
                    <p>You are logged in as {currentUser.email}</p> 
                </div>
                
                <Container className='d-flex flex-column justify-content-center align-items-center flex-grow-1'>
                    <Row>
                        {/* <Col md={12}>
                            <AddAdmin />
                        </Col> */}
                        <Col md={12}>
                            {isLoading && (
                                <LoadingSpinner />
                            )}
                            {!isLoading && data && 
                                <BasicTable columns={columns} data={data} />
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        )
}

export default AdminPage