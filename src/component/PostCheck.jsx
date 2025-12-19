import HeartButton from "./HeartButton.jsx";
import CommentButton from "./CommentButton.jsx";
import "../styles/Post.css"
import {Button} from "react-bootstrap";
function Post({User}) {
	const imgURL = "http://localhost:5000/"
const BACKEND_URL = "http://localhost:5000/api"
const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKEND_URL}/posts/updateActive/${User.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
		window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
	if (!confirm("Do you really want to delete post?"))
		return;
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BACKEND_URL}/posts/updateActive/${User.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");

		window.location.reload()
    } catch (err) {
      console.log(err.message);
    }
  };
    return (
        <div className="post-card">
            <div className="post-name">
                <h2 style={{color: "#d4e0d6"}}>@{User.name}</h2>
                <h4 style={{color: "#670909"}}>AI Percentage: {Math.round(User.ai*100)}%</h4>
            </div>
            <div className="post-description">
                <h3>{User.post_title}</h3>
            </div>
            <div className="post-image">
                <img style={{opacity: "100%"}} src={imgURL + User.post_image} alt={User.post_title} sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw" width={500} height={450} />
            </div>
                <button className="approveReq" onClick={()=> handleSubmit()}>Approve</button>
                <button className="declineReq" onClick={()=> handleDelete()}>Decline</button>
        </div>
    );
}
export default Post;
