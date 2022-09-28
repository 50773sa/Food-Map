import { useMemo } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import AddAdmin from '../components/AddAdmin'
import useGetRestaurants from '../hooks/useGetRestaurants'
import SortableTable from '../components/SortableTable'
import LoadingSpinner from '../components/LoadingSpinner'


const AdminPage = () => {
    const {data: restaurants, isLoading} = useGetRestaurants()
    const { currentUser } = useAuthContext()

    console.log(restaurants)

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
            {
                Header: 'Action',
                accessor: 'Action',
                Cell: ({ row: { original } }) => (
                    <Button
						variant="primary"
						size="sm"
						as={Link}
						to={`/restaurants/${original.id}`}
					>
						Edit
					</Button>
                )
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

                            {isLoading &&  <LoadingSpinner />}

                            {restaurants && <SortableTable columns={columns} data={restaurants} />}
                        </Col>
                    </Row>
                </Container>
            </>
        )
}

export default AdminPage