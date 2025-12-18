import React, {useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";
import ChangeProfile from "./ChangeProfile.jsx";
import "../styles/Profile.css";
import {Settings} from "lucide-react";

function Profile({User}){
    function GearClick() {
        alert("Gear clicked");
    }
    const [show, setShow] = useState(false);

	const imgURL = "http://localhost:5000/";
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div className="profile-card">
            <div className="profile-name">
                <img src={imgURL+ User.picture} alt="user image" />
                <h2 style={{ color: "#d4e0d6"}}>@{User.name}</h2>
                <Settings style={{marginRight: "0.5rem", marginBottom: "6rem", color: "#131a17"}} size={38} onClick={handleShow}/>
            </div>
                <p style={{margin: "2rem", fontSize: "12pt", color: "#d4e0d6"}}>{User.profile_description}</p>
            <Offcanvas show={show} onHide={handleClose}  placement="end" style={{ backgroundColor: "#2b5744",width: "30rem" }} >
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ChangeProfile />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
export default Profile;
