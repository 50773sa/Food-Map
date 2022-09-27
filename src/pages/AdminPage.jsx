import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col } from 'react-bootstrap'
import AddAdmin from '../components/AddAdmin'

const AdminPage = () => {
    const { currentUser } = useAuthContext()

    return (
            <>
                <div>
                    <p>You are logged in as {currentUser.email}</p> 
                </div>

                <Container className='d-flex flex-column justify-content-center flex-grow-1'>
                    <Row>
                        <Col md={6} className='m-auto'>
                            <AddAdmin />
                        </Col>
                    </Row>
                </Container>
            </>
        )
}

export default AdminPage