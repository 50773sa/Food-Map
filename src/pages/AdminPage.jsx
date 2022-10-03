import { useMemo } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom'
import AddAdmin from '../components/AddAdmin'
import UpdateAdmin from '../components/UpdateAdmin'
import AdminList from '../components/AdminList'
import AddRestaurantForm from '../components/AddRestaurantForm'
import useGetRestaurants from '../hooks/useGetRestaurants'
import SortableTable from '../components/SortableTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { auth } from '../firebase';

const AdminPage = () => {
    const {data: restaurants, isLoading} = useGetRestaurants()
    const { currentUser } = useAuthContext()
    console.log(restaurants)

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
                Header: 'Accepted',
                accessor: data => (data.approved ? "Yes" : "No"),

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
            
            <Container className='my-5 bengt'>

                <Row>
                    <h4 className='mb-5'>Välkommen {auth.currentUser.email}</h4>
                </Row>

                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Add an Admin</Accordion.Header>
                            <Accordion.Body>
                                <Col md={6} className="m-auto">
                                    <AddAdmin />
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Update an Admin</Accordion.Header>
                            <Accordion.Body>
                                <Col md={6} className="m-auto">
                                    <UpdateAdmin />
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>List of Admins</Accordion.Header>
                            <Accordion.Body>
                                <Col md={6} className="m-auto">
                                    <AdminList />
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Restaurants Table</Accordion.Header>
                            <Accordion.Body>
                                <Col md={12}>
                                    {isLoading && <LoadingSpinner />}

                                    {!isLoading && restaurants && (
                                        <SortableTable columns={columns} data={restaurants} />

                                    )}
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Add a resturant</Accordion.Header>
                            <Accordion.Body>
                                <Col md={12}>
                                    <AddRestaurantForm/>
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Container>

        )
}

export default AdminPage