import {useNavigate} from "react-router-dom";
import {MessageSquareMore} from "lucide-react";

function CommentButton({comment_count}) {
    const navigate = useNavigate()
    function CommentClick(){
        navigate("/PostInfoPage")
    }
    return (
        <div style={{display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <MessageSquareMore size={30} className="comment_btn" onClick={CommentClick}>Comment</MessageSquareMore>
            <p>{comment_count}</p>
        </div>
    )
}
export default CommentButton;