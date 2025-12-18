import HeartButton from "./HeartButton.jsx";
import CommentButton from "./CommentButton.jsx";
import "../styles/Post.css"
import {Button} from "react-bootstrap";
function Post({User}) {

    return (
        <div className="post-card">
            <div className="post-name">
                <h2 style={{color: "#d4e0d6"}}>@{User.name}</h2>
                <h4 style={{color: "#670909"}}>Pending Request //ideti ir sutapties procenta</h4>
            </div>
            <div className="post-description">
                <h3>{User.post_title}</h3>
            </div>
            <div className="post-image">
                <img style={{opacity: "100%"}} src={User.post_image} alt={User.post_title} sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw" width={500} height={450} />
            </div>
                <button className="approveReq">Approve</button>
                <button className="declineReq">Decline</button>
        </div>
    );
}
export default Post;
