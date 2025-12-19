import HeartButton from "./HeartButton.jsx";
import CommentButton from "./CommentButton.jsx";
import "../styles/Post.css";
import { Button } from "react-bootstrap";
import {useEffect, useState} from "react";
function Post({ User }) {
	let me = {username: "asdjasjkd"};
	if (localStorage.getItem("user"))
		me = JSON.parse(localStorage.getItem("user"));
  const imageUrl = "http://localhost:5000/";
  const [isFollowed, setIsFollowed] = useState();
  const BACKEND_URL = "http://localhost:5000/api";
  useEffect(() => {
	  console.log(User.isFollowedDB)
    setIsFollowed(User.isFollowedDB);
  }, [User]);

  const FollowUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (isFollowed) {
        const response = await fetch(
          `${BACKEND_URL}/users/follow/${User.userID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setIsFollowed(false);
      } else {
        const response = await fetch(
          `${BACKEND_URL}/users/follow/${User.userID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setIsFollowed(true);
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "comment failed");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="post-card">
      <div className="post-name">
        <img src={imageUrl + User.profile_img} alt={User.name} />
        <h2 style={{ color: "#d4e0d6" }}>@{User.name}</h2>
        {me.username !== User.name && (
          <button className="follow" onClick={() => FollowUser()}>
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className="post-description">
        <h3>{User.post_title}</h3>
        <p style={{ color: "#121111" }}>{User.post_description}</p>
      </div>
      <div className="post-image">
        <img
          style={{ opacity: "100%" }}
          src={imageUrl + User.post_image}
          alt={User.post_title}
          sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
          width={500}
          height={450}
        />
      </div>
      <div className="post-interact">
        <HeartButton
          like_count={User.like_count}
          isLikedDb={User.isLikedDb}
          post_id={User.post_id}
        />
        <CommentButton
          comment_count={User.comment_count}
          postId={User.post_id}
        />
      </div>
    </div>
  );
}
export default Post;
