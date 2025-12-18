import Post from '../component/Post';
import ProfilePicture from "../assets/TempProfilePic.png";
import PostImage from "../assets/TempPostPic.png";
import BannerPicture from "../assets/TempBannerPic.jpg";
import useFetchUsers from "../hooks/useFetchUsers.js";
import {useEffect} from 'react';

function HomePage() {
    const { data, loading, error } = useFetchUsers();

	useEffect(() => { console.log(data)}, [data])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {data.map((user) => user.posts.filter(post => post.post_type === 2).map((post) =>
                <Post key={post.id} User={{
                    picture: ProfilePicture,
                    name: user.username,
                    post_title: post.title,
                    post_image: post.image,
                    post_description: post.description,
                    like_count: post.like_count,
                    comment_count: post.comment_count,
					profile_img: user.profile_img,
                }}
                />
            ))}
        </div>
    )
}

export default HomePage
