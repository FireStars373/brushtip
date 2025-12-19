import Comment from './Comment';
import "../styles/Post.css"
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {ArrowBigRight} from "lucide-react";

function Question({post}) {
    const navigate = useNavigate()
    function PostClick(){
        navigate("/DiscussionInfoPage/"+ post.post_id)
    }
    return (
        <div className="post-card" >
            <div className="question-info">
                <h2>{post.post_title}</h2>
                <p>{post.post_description}</p>
                <ArrowBigRight size={30} className="question-info-X" onClick={() => PostClick()} />
            </div>
        </div>
    );
}
export default Question;