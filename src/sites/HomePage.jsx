import Post from '../component/Post';
import ProfilePicture from "../assets/TempProfilePic.png";
import PostImage from "../assets/TempPostPic.png";
import BannerPicture from "../assets/TempBannerPic.jpg";
import useFetchUsers from "../hooks/useFetchUsers.js";

function HomePage() {
    const { data, loading, error } = useFetchUsers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {data.map((user) => user.posts.filter(post => post.post_type === 1).map((post) =>
                <Post key={post.id} User={{
                    picture: ProfilePicture,
                    name: user.username,
                    post_title: post.title,
                    post_image: BannerPicture,
                    post_description: post.description,
                    like_count: post.like_count,
                    comment_count: post.comment_count,
                }}
                />
            ))}
        </div>
    )
}

export default HomePage
