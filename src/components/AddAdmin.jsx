import { useRef, useState} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const AddAdmin = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { signup } = useAuthContext()

    const handleSubmit = async (e) => {
		e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords does not match")
        }

        setError(null);

        try {
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)

            setLoading(false)

        } catch (err) {
			setError(err.message)
			setLoading(false)
		}
    }

    return (
        <div className="signup-wrapper my-4">
            <h5 className='mb-4'>Registrera Admin</h5>
            
            {error && (<Alert variant='danger'>{error}</Alert>)}

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="password-confirm" className="mb-3">
                    <Form.Label>Bekräfta lösenord</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>

                <Button className="text-center" disabled={loading} type="submit">Lägg till Admin</Button>
            </Form>      
        </div>
    )
}

export default AddAdmin