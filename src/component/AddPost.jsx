import React, { useState } from "react";
import "../styles/AddPost.css";
import { X, CirclePlus } from "lucide-react";
import BannerPicture from "../assets/TempBannerPic.jpg";
import {useNavigate} from "react-router-dom";

function AddPost() {
  const BACKEND_URL = "http://localhost:5000/api";

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await fetch(`${BACKEND_URL}/posts/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Post failed");

      navigate("/");
      setIsOpen(false);
      window.location.reload()
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <CirclePlus onClick={() => setIsOpen(true)} className="add-post-btn" />

      {isOpen && (
        <div className="overlay">
          <div className="add-post-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 className="modal-title">Add New Post</h2>
              <X size={30} onClick={() => setIsOpen(false)} className="close-btn" />
            </div>
            <form className="post-form" onSubmit={handlePost}>
              <input type="text" placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea placeholder="Write description..." value={description} onChange={(e) => setDescription(e.target.value)} />
              <input className="change-profile-btn" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              <button type="submit" className="add-btn" >Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default AddPost;
