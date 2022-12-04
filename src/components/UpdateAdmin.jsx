import { useRef, useState} from 'react'
import { Form, Button, Alert, Image } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const UpdateAdmin = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const displayNameRef = useRef();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(false);
    const { 
        currentUser,
        reloadUser,
        setEmail,
        setPassword,
        setDisplayNameAndPhoto, 
    } = useAuthContext()

    const handleFileChange = (e) => {
        if (!e.target.files.length) {
            setPhoto(null);
            return;
        }

        setPhoto(e.target.files[0]);
        console.log("File changed!", e.target.files[0]);
    };

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
        <div className="signup-wrapper my-4">
            <h5 className='mb-4'>Updatera Admin</h5>
            
            {error && (<Alert variant='danger'>{error}</Alert>)}

            <Form onSubmit={handleSubmit}>

                <div>
                    <Image
                        className="profile-image"
                        src={currentUser.photoURL || 'https://via.placeholder.com/200'}
                        fluid
                        roundedCircle
                    />
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                </Form.Group>
                
                <Form.Group id="photo" className="mb-3">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                    <Form.Text>
                        {photo
                            ? `${photo.name} (${Math.round(photo.size / 1024)} kB)`
                            : "No photo selected"}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control type="password" ref={passwordRef} />
                </Form.Group>

                <Form.Group id="password-confirm" className="mb-3">
                    <Form.Label>Bekräfta lösenord</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} />
                </Form.Group>

                <Button className="text-center" variant="dark" disabled={loading} type="submit">Updatera</Button>
            </Form>      
        </div>
    )
}

export default UpdateAdmin