import React, { useContext } from 'react';
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { AuthContext } from '../Auth/AuthProvider'; 
import { useNavigate } from 'react-router-dom'; 
import logo from '../Assets/logo.png'
function MainNavbar() {
  const { isLoggedIn, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const handleSearchRedirect = () => {
    navigate('/list');  
  };

  return (
    <>
      {['sm'].map((expand, index) => (
        <Navbar key={index} bg="primary" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" style={{ width: '100px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} alt="logo" style={{ width: '100px' }} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {isLoggedIn ? (
                    <>
                      <Nav.Link href="add">User Onboarding</Nav.Link>
                      <Nav.Link href="list">Users List</Nav.Link>
                      <Form className="d-flex" style={{ color: 'white' }}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          style={{ backgroundColor: 'white', color: 'black' }}
                          onClick={handleSearchRedirect} 
                        />
                      </Form>
                      <Button variant="outline-light" onClick={logout}>Logout</Button> {/* Add logout button */}
                    </>
                  ) : (
                    <Nav.Link href="login">Login</Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MainNavbar;
