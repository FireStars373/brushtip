import React from "react";
import {
    Navbar,
    Nav,
    Container,
    Form,
    Button,
    Offcanvas,
} from "react-bootstrap";
import "../styles/NavBar.css";
import LoginForm from "./LoginForm.jsx";
import {useState} from "react";
import ChangeProfile from "./ChangeProfile.jsx";
import {useNavigate} from "react-router-dom";

function AppNavbar() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
    }
    return (
        <>
            <Navbar expand="lg" className="responsive-navbar">
                <Container fluid>
                    {user && user.is_admin === 1 ?
                        (<Navbar.Brand style={{fontSize: "20pt", color: "#131a10"}}>BrushTip</Navbar.Brand>) :
                        (<Navbar.Brand href="/" style={{fontSize: "20pt", color: "#131a10"}}>BrushTip</Navbar.Brand>)
                    }
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll" className="align-items-center">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll/>
                        <Form className="d-flex me-auto">
                        </Form>
                        <Nav>
                            {!user ?
                                (<Nav.Link onClick={handleShow}>Login</Nav.Link>) :
                                (<>
                                    {user.is_admin === 1 ? (<Nav.Link onClick={handleLogout}>Log out</Nav.Link>) : (
                                        <>
                                            <Nav.Link href="/ProfilePage">Profile</Nav.Link>
                                            <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
                                        </>)}
                                </>)
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop="static"
                placement="end"
                style={{backgroundColor: "#2b5744", width: "30rem"}}
            >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                    <LoginForm handleClose={handleClose}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default AppNavbar;
