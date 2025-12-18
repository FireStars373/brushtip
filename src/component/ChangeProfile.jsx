import {Button, Form, InputGroup, Offcanvas} from "react-bootstrap";
import React from "react";


function ChangeProfile() {

    const handleFontChange = (e) => {
        const selectedFont = e.target.value;
        console.log("Selected font:", selectedFont);
        // you could update state or apply the font dynamically here
    };
    return (
            <>
                <Offcanvas.Title style={{fontSize: "24pt", marginBottom: "2rem", }}>Profile
                    Customisation</Offcanvas.Title>

                <Form.Label className="change-profile-label">Change Banner</Form.Label>
                <InputGroup className="mb-3">
                    <button className="change-profile-btn">Import</button>
                </InputGroup>

                <Form.Label className="change-profile-label">Change Profile Picture</Form.Label>
                <InputGroup className="mb-3">
                    <button className="change-profile-btn">Import</button>
                </InputGroup>

                <Form.Label className="change-profile-label">Change description</Form.Label>
                <InputGroup className="mb-3">
                    <textarea className="change-post-textarea" placeholder="Write something about yourself..." />
                </InputGroup>

                <Form.Label className="change-profile-label">Change profile font</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Select className="change-post-select" style={{minHeight:"20px"}} onChange={handleFontChange}>
                        <option value="">Select a font...</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                    </Form.Select>
                </InputGroup>

                <Form.Label className="change-profile-label">Save Changes?</Form.Label>
                <InputGroup className="mb-3">
                    <button className="change-profile-btn">Save</button>
                </InputGroup>
            </>
    );
}

export default ChangeProfile;