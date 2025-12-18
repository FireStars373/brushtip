import {useNavigate} from "react-router-dom";
import HeartButton from "../component/HeartButton.jsx";
import CommentButton from "./CommentButton.jsx";
import { Ellipsis, Trash, X } from "lucide-react";
import { Col, Row } from "react-bootstrap";
import {useEffect, useState} from "react";
const url = "http://localhost:5000/";
const BACKEND_URL = "http://localhost:5000/api";
function ProfilePost({ posts = [] }) {
	  const [isOpen, setIsOpen] = useState(false);
  if (posts.length === 0) return <p>No posts yet</p>;
	const navigate = useNavigate();
	const [normPosts, setNormPosts] = useState([]);
	useEffect(() => {
		setNormPosts(posts);
	}, [posts])
	 const [editingPost, setEditingPost] = useState(null); // store post object
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);


const handleOpenEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title || "");
    setDescription(post.description || "");
    setImage(null); // optional new image
    setIsOpen(true);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingPost) return;

    const formData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKEND_URL}/posts/edit/${editingPost.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      // Update UI
      setNormPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? { ...p, title, description, image: image ? data.image : p.image }
            : p
        )
      );

      setIsOpen(false);
      setEditingPost(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
	if (!confirm("Do you really want to delete your post?"))
		return;
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BACKEND_URL}/posts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");
		setNormPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
	  <>
    <Row>
    {normPosts.map((post) => (
        <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
          <div className="profile-post">
            <div className="profile-post-image">
              <img src={url + post.image} alt={post.title} />
              {console.log(post.id)}
            </div>
            <div className="profile-post-overlay">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  columnGap: "8px",
                  alignItems: "start",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {post.title}
                </h4>

                <div style={{ display: "flex", gap: "6px" }}>
                  <Trash onClick={() => handleDelete(post.id)} />
                  <Ellipsis onClick={() => handleOpenEdit(post)} style={{ cursor: "pointer" }} />
                </div>
              </div>

              <div className="post-interact">
                <HeartButton like_count={post.like_count} />
                <CommentButton comment_count={post.comment_count} />
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
	  {isOpen && (
        <div className="overlay">
          <div className="add-post-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 className="modal-title">Edit Post</h2>
              <X size={30} onClick={() => setIsOpen(false)} className="close-btn" />
            </div>
            <form className="post-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea placeholder="Write description..." value={description} onChange={(e) => setDescription(e.target.value)} />
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              <button type="submit" className="add-btn">Save Changes</button>
            </form>
          </div>
        </div>
      )}
	  </>
  );
}

export default ProfilePost;

