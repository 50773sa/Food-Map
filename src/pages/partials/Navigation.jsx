import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser} = useAuthContext()
    
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Food-Map
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
							
						<Nav.Link as={NavLink} end to="/map">Map</Nav.Link>
						<Nav.Link as={NavLink} end to="/restaurants">See all restaurants</Nav.Link>
						<Nav.Link as={NavLink} end to="/add-restaurant">Add restaurant</Nav.Link>

                        {
                            currentUser ? ( 
                                <NavDropdown id="navbar-dropdown"title={currentUser.email.charAt(0).toUpperCase()} align="end">
                                    <NavLink to="/admin">Admin page</NavLink>
                                    <NavDropdown.Divider />
                                    <NavLink to="/logout">Log Out</NavLink>
                                </NavDropdown>
                            ) : ( 
                                <Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
                            )
                        }

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
