import { useEffect, useState } from "react";
import HeartButton from "./HeartButton.jsx";
import { Button, Form } from "react-bootstrap";
import { CornerDownRight } from "lucide-react";
import {useParams} from "react-router-dom";

function Comment({ comment }) {
  const [showReply, setShowReply] = useState(false);
  const me = JSON.parse(localStorage.getItem("user"));
	const [replies, setReplies] = useState([]);
	useEffect(() => {
			setReplies(comment.replies);
	}, [comment])
  const [replyText, setReplyText] = useState("");
	const BACKEND_URL = "http://localhost:5000/api"
  const handleReplyToggle = () => {
    setShowReply((prev) => !prev);
  };

	const { id } = useParams();
  const handleReplySubmit = async (replyId) => {
	  if (replyText === "") return;
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BACKEND_URL}/comments/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
			comment_text: replyText,
          reply_to_comment_id: replyId,
          post_id: id,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "comment failed");
	setReplies((prev) => [...(prev || []), {id: data.id, text: replyText, user: {username: me.username} }]
        )

    } catch (err) {
      console.log(err.message);
    }

    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="post-card">
      <div className="comment-info">
        <h4>{comment.user.username}</h4>
        <p>{comment.text}</p>

	   <div className="post-interact">
          <HeartButton />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
	  
          >
            <CornerDownRight size={30} onClick={handleReplyToggle} />
            <p>{comment.replies?.length || 0}</p>
          </div>
        </div>

        {showReply && (
          <div className="reply-box mt-2">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="mb-2"
            />
            <Button variant="primary" onClick={() => handleReplySubmit(comment.id)}>
              Reply
            </Button>
          </div>
        )}

        {/* 🔁 Recursive replies */}
        {replies?.length > 0  && (
          <div style={{ marginLeft: "30px" }}>
            {replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
