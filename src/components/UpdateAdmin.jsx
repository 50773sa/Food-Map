import { useRef, useState} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const UpdateAdmin = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { 
        currentUser,
        reloadUser,
        setEmail,
        setPassword 
    } = useAuthContext()

    const handleSubmit = async (e) => {
		e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords does not match")
        }

        setError(null);

        try {
			setLoading(true)

			if (emailRef.current.value !== currentUser.email) {
				await setEmail(emailRef.current.value)
			}

			if (passwordRef.current.value) {
				await setPassword(passwordRef.current.value)
			}

            await reloadUser()

            setLoading(false)

        } catch (err) {
			setError(err.message)
			setLoading(false)
		}
    }

    return (
        <div className="signup-wrapper">
            <h5 className='mb-4'>Updatera Admin</h5>
            
            {error && (<Alert variant='danger'>{error}</Alert>)}

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} />
                </Form.Group>

                <Form.Group id="password-confirm" className="mb-3">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} />
                </Form.Group>

                <Button className="text-center" disabled={loading} type="submit">Updatera</Button>
            </Form>      
        </div>
    )
}

export default UpdateAdmin