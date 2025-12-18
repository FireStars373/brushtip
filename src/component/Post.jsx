import HeartButton from "./HeartButton.jsx";
import CommentButton from "./CommentButton.jsx";
import "../styles/Post.css"
import {Button} from "react-bootstrap";
function Post({User}) {

	const imageUrl = "http://localhost:5000/"
    function FollowUser(){
        alert("Follow clicked")
    }

    return (
        <div className="post-card">
            <div className="post-name">
                <img src={imageUrl+User.profile_img} alt = {User.name} />
                <h2 style={{color: "#d4e0d6"}}>@{User.name}</h2>
                <button className="follow" onClick={FollowUser}>Follow</button>
            </div>
            <div className="post-description">
                <h3>{User.post_title}</h3>
                <p style={{color: "#121111"}}>{User.post_description}</p>
            </div>
            <div className="post-image">
                <img style={{opacity: "100%"}} src={imageUrl+User.post_image} alt={User.post_title} sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw" width={500} height={450} />
            </div>
            <div className="post-interact">
                <HeartButton like_count={User.like_count} />
                <CommentButton comment_count={User.comment_count} />
            </div>
        </div>
    );
}
export default Post;
