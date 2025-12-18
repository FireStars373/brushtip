import HeartButton from "../component/HeartButton.jsx"
import CommentButton from "./CommentButton.jsx";
import {Ellipsis} from "lucide-react";
import {Col, Row} from "react-bootstrap";
const url = "http://localhost:5000/";
function ProfilePost({posts = []}) {
    if(posts.length === 0) return <p>No posts yet</p>;
    return (
        <Row>
            {posts.map((post) => (
                <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
                    <div className="profile-post">
                        <div className="profile-post-image">
                            <img src={url+post.image} alt={post.title}/>
                            {console.log(post.id)}
                        </div>
                        <div className="profile-post-overlay">
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h4>{post.title}</h4>
                                <Ellipsis/>
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
    )
}

export default ProfilePost;