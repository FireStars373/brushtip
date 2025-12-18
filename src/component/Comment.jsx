import { useState } from "react";
import HeartButton from "./HeartButton.jsx";
import { Button, Form } from "react-bootstrap";
import { CornerDownRight } from "lucide-react";
import CommentButton from "./CommentButton.jsx";

function Comment() {
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReplyToggle = () => {
        setShowReply((prev) => !prev);
    };

    const handleReplySubmit = () => {
        console.log("Reply submitted:", replyText);
        setReplyText("");
        setShowReply(false);
    };

    return (
        <div className="post-card">
            <div className="comment-info">
                <h4>User Name</h4>
                <p>Comment text</p>
                <div className="post-interact">
                    <HeartButton />
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CornerDownRight  size={30} onClick={handleReplyToggle}/>
                    <p>0</p>
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
                        <Button variant="primary" onClick={handleReplySubmit}>Reply</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;
