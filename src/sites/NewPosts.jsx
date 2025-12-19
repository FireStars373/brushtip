import Post from '../component/Post';
import ProfilePicture from "../assets/TempProfilePic.png";
import PostImage from "../assets/TempPostPic.png";
import BannerPicture from "../assets/TempBannerPic.jpg";
import useFetchUsers from "../hooks/useFetchUsers.js";
import {useEffect} from 'react';

function NewPostsPage() {
    const { data, loading, error } = useFetchUsers();

	useEffect(() => { console.log(data)}, [data])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
const allPosts = data
  .flatMap(user =>
    user.posts
      .filter(post => post.post_type === 2  && post.needsCheck === 0)
      .map(post => ({
        ...post,
        user
      }))
  )
  .sort(
    (a, b) =>
      Date.parse(b.upload_date) - Date.parse(a.upload_date)
  );
    return (
        <div>
           {allPosts.map(post => (
  <Post
    key={post.id}
    User={{
      picture: ProfilePicture,
      name: post.user.username,
      userID: post.user.id,
      post_title: post.title,
      post_image: post.image,
      post_description: post.description,
      like_count: post.like_count,
      comment_count: post.comment_count,
      profile_img: post.user.profile_img,
      post_id: post.id,
      isLikedDb: post.isLiked,
      isFollowedDB: post.user.isFollowing
    }}
  />
))}        </div>
    )
}

export default NewPostsPage
