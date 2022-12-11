import { useRef, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'

const AddAdmin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const displayNameRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(false);
    const { signup, reloadUser } = useAuthContext();
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        if (!e.target.files.length) {
            setPhoto(null);
            return;
        }

        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords does not match");
        }

        setError(null);

        try {
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value, photo);

            setLoading(false);

            await reloadUser()

            navigate('/')
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {

    },[])

    return (
        <div className="signup-wrapper my-4">
            <h5 className="mb-4">Registrera Admin</h5>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" ref={displayNameRef} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
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
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="password-confirm" className="mb-3">
                    <Form.Label>Bekräfta lösenord</Form.Label>
                    <Form.Control
                        type="password"
                        ref={passwordConfirmRef}
                        required
                    />
                </Form.Group>

                <Button
                    className="text-center"
                    variant="dark"
                    disabled={loading}
                    type="submit"
                >
                    Lägg till Admin
                </Button>
            </Form>
        </div>
    );
};

export default AddAdmin;
