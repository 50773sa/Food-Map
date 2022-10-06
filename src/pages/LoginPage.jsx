import { useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'


const LoginPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);
  
    try {
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/admin')
    } catch (err) {
        setError(err.message)
        setLoading(false)
    }
}

    return (
        <Container className='d-flex flex-column justify-content-center flex-grow-1'>
            <Row>
                <Col md={6} className='m-auto'>
                    <div className="login-wrapper">
                        <h5 className='mb-4'>Login</h5>
                        
                        {error && (<Alert variant='danger'>{error}</Alert>)}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>

                            <Form.Group className='my-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>

                            <Button className="text-center" disabled={loading} type="submit">Logga in</Button>
                        </Form>
                        
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage