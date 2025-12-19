import {Button, Form, InputGroup, Offcanvas} from "react-bootstrap";
import React, {useState} from "react";
import "../styles/Login.css";
import {data, useNavigate} from "react-router-dom";


function LoginForm({handleClose}) {

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
	const navigate = useNavigate();
    const BACKEND_URL = "http://localhost:5000/api/authorization";

    //register handler
    const handleRegister = async () => {
        if(password !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        }
        try{
            const response = await fetch(`${BACKEND_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Registration failed");

            setMessage("Registered successfully");
            setIsRegister(false);
        }catch(err){
            setMessage(`${err.message}`);
        }
    };

    //login handler
    const handleLogin = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
			if (data.user.is_admin === 1)
				navigate("/AdminPage")
			handleClose(false);
           // setMessage(localStorage.getItem("token"));
        } catch (err) {
            setMessage(`${err.message}`);
        }
    };

    return (
        <>
            {isRegister ? (
                // REGISTER FORM
                <>
                    <Offcanvas.Title style={{fontSize: "24pt", marginBottom: "2rem", color: "#131a10"}}>Register</Offcanvas.Title>
                    <Form.Label style={{color: "#121111", fontSize: "16pt"}}>Email address</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            className="login-input"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Label style={{color: "#121111", fontSize: "16pt"}}>Username</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{backgroundColor: "#1d2b27", border: "none", color: "#d4e0d6"}}>@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-label="Username"

                            className="login-input"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Label style={{color: "#121111", fontSize: "16pt"}}>Password</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            className="login-input"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Label style={{color: "#121111", fontSize: "16pt"}}>Confirm Password</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            className="login-input"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </InputGroup>
                    <div style={{ borderTop: "2px solid #1d2b27", paddingTop: "1.5rem"}}>
                        <button  className="login-btn" style={{marginRight: "2rem"}} onClick={handleRegister}>Register</button>
                        <button className="login-btn" onClick={() => setIsRegister(false)}>Back to Login</button>
                    </div>
                </>
            ) : (
                // LOGIN FORM
                <>
                    <Offcanvas.Title style={{fontSize: "24pt", marginBottom: "2rem", color: "#131a10"}}>Login</Offcanvas.Title>
                    <Form.Label style={{color: "#121111", fontSize: "16pt"}}>Username</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{backgroundColor: "#1d2b27", border: "none", color: "#d4e0d6"}}>@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-label="Username"
                            className="login-input"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Label style={{color: "#121111", fontSize: "16pt"}}>Password</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            className="login-input"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </InputGroup>

                    <div style={{ borderTop: "2px solid #1d2b27", paddingTop: "1.5rem"}}>
                        <button className="login-btn" style={{marginRight: "2rem"}} onClick={handleLogin}>Login</button>
                        <button className="login-btn" onClick={() => setIsRegister(true)}>Register</button>
                    </div>
                </>
            )}
            {message && <p style={{ marginTop: "1rem", color: "white" }}>{message}</p>}
        </>
    );
}

export default LoginForm;
