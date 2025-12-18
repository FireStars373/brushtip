import ProfilePicture from "../assets/TempProfilePic.png";
import PostImage from "../assets/TempPostPic.png";
import Post from "../component/Post.jsx";
import Comment from "../component/Comment.jsx";

function PostInfoPage() {
    return (
        <div>
            <Post User={{picture: ProfilePicture,name: "Lilith", post_title: "My art",post_image: PostImage, post_description: "Lilith description"}} />
            <Comment></Comment>
        </div>
    )
}
export default PostInfoPage;