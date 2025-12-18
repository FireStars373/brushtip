import React from "react";
import {Navbar, Nav, Container, Form, Button, Offcanvas} from "react-bootstrap";
import "../styles/Navbar.css";
import LoginForm from "./LoginForm.jsx";
import {useState} from "react";
import ChangeProfile from "./ChangeProfile.jsx";
function AppNavbar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar expand="lg" className="responsive-navbar">
                <Container fluid>
                    <Navbar.Brand href="/" style={{fontSize: "20pt", color: "#131a10"}}>BrushTip</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="align-items-center">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll />
                        <Form className="d-flex me-auto">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                className="responsive-search"
                            />
                            <button className="search-btn">Search</button>
                        </Form>
                        <Nav>
                            <Nav.Link href="/ProfilePage">Profile</Nav.Link>
                            <Nav.Link onClick={handleShow}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} backdrop="static" placement="end" style={{ backgroundColor: "#2b5744",width: "30rem" }} >
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <LoginForm />
                </Offcanvas.Body>
            </Offcanvas>
        </>

    );
}

export default AppNavbar;
