import { useMemo } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import AddAdmin from '../components/AddAdmin'
import useGetRestaurants from '../hooks/useGetRestaurants'
import useGetApprovedRestaurants from '../hooks/useGetApprovedRestaurants'
import SortableTable from '../components/SortableTable'
import LoadingSpinner from '../components/LoadingSpinner'


const AdminPage = () => {
    const {data: approvedRestaurants, loading} = useGetApprovedRestaurants()
    const {data: restaurants, isLoading} = useGetRestaurants()
    const { currentUser } = useAuthContext()

    console.log(restaurants)
    console.log(approvedRestaurants)
    
    const columns = useMemo(() => {
        return [
            {
                Header: 'Restaurant Info',
                columns: [{
                    Header: 'Namn',
                    accessor: 'name',
                }, {
                    Header: 'Cuisine',
                    accessor: 'restaurant_info.cuisine',
                }, {
                    Header: 'Sort',
                    accessor: 'restaurant_info.restaurantSort',
                }, {
                    Header: 'Typ',
                    accessor: 'restaurant_info.restaurantType',
                }]  
            },
            {
                Header: 'Address',
                columns: [{
                    Header: 'Stad',
                    accessor: 'address.city',
                }, {
                    Header: 'Address',
                    accessor: 'address.street',
                }],
            },
            {
                Header: 'Social',
                columns: [{
                    Header: 'Email',
                    accessor: 'social.email',
                }, {
                    Header: 'Facebook',
                    accessor: 'social.facebook',
                }, {
                    Header: 'Instagram',
                    accessor: 'social.instagram',
                }, {
                    Header: 'Phone',
                    accessor: 'social.phone',
                }, {
                    Header: 'Website',
                    accessor: 'social.website',
                }],
            },
            {
                Header: 'Action',
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

                            {loading && isLoading && <LoadingSpinner />}
                            
                            {!loading && approvedRestaurants && 
                                <>
                                    <SortableTable columns={columns} data={approvedRestaurants} />
                                    <h2>hej</h2>
                                </>
                            }

                            <hr />

                            {!isLoading && restaurants && 
                                <>
                                    <SortableTable columns={columns} data={restaurants} />
                                    <h2>fan</h2>
                                </>
                            }

                        </Col>
                    </Row>
                </Container>
            </>
        )
}

export default AdminPage