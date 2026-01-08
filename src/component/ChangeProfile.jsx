import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Offcanvas } from "react-bootstrap";
import useFetchProfile from "../hooks/useFetchProfile";
import {useNavigate} from "react-router-dom";

const BACKEND_URL = "http://localhost:5000/api/users"; // adjust as needed

function ChangeProfile() {
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [description, setDescription] = useState("");
  const [font, setFont] = useState(0);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {user, loading, error} = useFetchProfile();

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setDescription(user.description || "");
      setFont(user.profile_font || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    if (bannerFile) formData.append("banner_img", bannerFile);
    if (profileFile) formData.append("profile_img", profileFile);
    if (description) formData.append("description", description);
    if (font) formData.append("profile_font", font);
    if (username) formData.append("username", username);

    try {
		const token = localStorage.getItem("token")
      const res = await fetch(`${BACKEND_URL}/profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully!");
        window.location.reload()
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error while updating profile.");
    }

  };

	const handleDelete = async () => {
	if (!confirm("Do you really want to delete your post?"))
		return;
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BACKEND_URL}/profile`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
	  <>
    <Form onSubmit={handleSubmit}>
      <Offcanvas.Title style={{ fontSize: "24pt", marginBottom: "2rem" }}>
        Profile Customisation
      </Offcanvas.Title>

      <Form.Label className="change-profile-label">Change Banner</Form.Label>
      <InputGroup className="mb-3">
        <input
            className="change-profile-btn"
          type="file"
          accept="image/*"
          onChange={(e) => setBannerFile(e.target.files[0])}
        />
      </InputGroup>

      <Form.Label className="change-profile-label">Change Profile Picture</Form.Label>
      <InputGroup className="mb-3">
        <input
            className="change-profile-btn"
          type="file"
          accept="image/*"
          onChange={(e) => setProfileFile(e.target.files[0])}
        />
      </InputGroup>

      <Form.Label className="change-profile-label">Change Description</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          as="textarea"
          className="change-post-textarea"
          rows={3}
          value={description}
          placeholder="Write something about yourself..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputGroup>

      <Form.Label className="change-profile-label">Change Profile Font</Form.Label>
      <InputGroup className="mb-3">
        <Form.Select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="change-post-select"
          style={{ minHeight: "20px" }}
        >
          <option value="">Select a font...</option>
          <option value="1">Arial</option>
          <option value="2">Times New Roman</option>
          <option value="3">Courier New</option>
          <option value="4">Georgia</option>
          <option value="5">Verdana</option>
        </Form.Select>
      </InputGroup>

      <Form.Label className="change-profile-label">Save Changes?</Form.Label>
      <InputGroup className="mb-3">
        <button className="change-profile-btn" type="submit" disabled={loading} >
          {loading ? "Saving..." : "Save"}
        </button>
          <button className="delete-profile-btn"  onClick={() => handleDelete()}>
          DELETE PROFILE
          </button>
      </InputGroup>
      {message && <p>{message}</p>}
    </Form>
	  </>
  );
}

export default ChangeProfile;

