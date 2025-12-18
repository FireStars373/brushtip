import Post from '../component/Post';
import ProfilePicture from "../assets/TempProfilePic.png";
import PostImage from "../assets/TempPostPic.png";
import BannerPicture from "../assets/TempBannerPic.jpg";
import useFetchUsers from "../hooks/useFetchUsers.js";
import PostCheck from "../component/PostCheck.jsx";

function AdminPage() {
    const { data, loading, error } = useFetchUsers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {data.map((user) => user.posts.filter(post => post.needsCheck === 1).map((post) =>
                <PostCheck key={post.id} User={{
                    name: user.username,
                    post_image: BannerPicture,
                }}
                />
            ))}
        </div>
    )
}

export default AdminPage;
