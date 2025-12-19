import ProfilePicture from "../assets/TempProfilePic.png";
import PostImage from "../assets/TempPostPic.png";
import Post from "../component/Post.jsx";
import Comment from "../component/Comment.jsx";
import mockComments from "../assets/staticComments.jsx";
import { useParams } from "react-router-dom";
import useFetchPostById from "../hooks/useFetchPostById.js";
import { useEffect, useState } from "react";

function PostInfoPage() {
  const BACKEND_URL = "http://localhost:5000/api";
  const { id } = useParams();
  const { post, comments, loading, error } = useFetchPostById(id);
  const [normCom, setNormCom] = useState([]);
  useEffect(() => {
    setNormCom(comments);
  }, [comments]);
  const [comment_text, setComment_text] = useState("");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BACKEND_URL}/comments/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment_text,
          reply_to_comment_id: null,
          post_id: id,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "comment failed");
      setNormCom((prev) => [
        ...prev,
        { id: data.id, text: comment_text, user: { username: post.username } },
      ]);
      setComment_text("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Post
        User={{
          profile_img: post.profile_img,
          name: post.username,
          post_title: post.title,
          post_image: post.image,
          post_description: post.description,
				  like_count: post.like_count,
					post_id: post.id,
						isLikedDb: post.isLiked,

        }}
      />
      <form className="post-form" onSubmit={handleComment}>
        <textarea
          placeholder="Write comment..."
          value={comment_text}
          onChange={(e) => setComment_text(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Submit
        </button>
      </form>
      {normCom.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}{" "}
    </div>
  );
}
export default PostInfoPage;

