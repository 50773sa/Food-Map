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
                Header: 'Action',
                Cell: ({ row: { original } }) => (
                    <Button
						variant="primary"
						size="sm"
						as={Link}
						to={`/restaurants/${original.id}`}
					>
						Redigera
					</Button>
                )
            },
            {
                Header: 'Restaurang Info',
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
                    Header: 'Tel',
                    accessor: 'social.phone',
                }, {
                    Header: 'Webbsida',
                    accessor: 'social.website',
                }],
            },
            { 
                Header: 'Godkänd',
                accessor: data => (data.approved ? "Yes" : "No"),

            },
        ]
    },[])

    return (
            
            <Container className='my-4 '>

                <Row>
                    <h4 className='my-5'>Välkommen {auth.currentUser.email}</h4>
                </Row>

                <Row className="accordion-row">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Lägg till Admin</Accordion.Header>
                            <Accordion.Body>
                                <Col md={6} className="m-auto">
                                    <AddAdmin />
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Uppdatera Admin</Accordion.Header>
                            <Accordion.Body>
                                <Col md={6} className="m-auto">
                                    <UpdateAdmin />
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Lista på Admins</Accordion.Header>
                            <Accordion.Body>
                                <Col md={6} className="m-auto">
                                    <AdminList />
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className="table" eventKey="3">
                            <Accordion.Header>Tabell på restauranger</Accordion.Header>
                            <Accordion.Body className="table-body">
                                <Col md={12}>
                                    {isLoading && <LoadingSpinner />}

                                    {!isLoading && restaurants && (
                                        <SortableTable columns={columns} data={restaurants} />

                                    )}
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Lägg till restaurang</Accordion.Header>
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