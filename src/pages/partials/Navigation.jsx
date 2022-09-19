import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
// import { useAuthContext } from '../../contexts/AuthContext'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	// const {} = useAuthContext()

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img
						src=""
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt="Google Maps"
					/>{' '}
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
							
						<Nav.Link as={NavLink} end to="/">Home</Nav.Link>

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
