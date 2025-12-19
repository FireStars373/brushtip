import Post from '../component/Post';
import ProfilePicture from "../assets/TempProfilePic.png";
import PostImage from "../assets/TempPostPic.png";
import BannerPicture from "../assets/TempBannerPic.jpg";
import useFetchUsers from "../hooks/useFetchUsers.js";
import {useEffect} from 'react';

function TopPostsPage() {
  const { data, loading, error } = useFetchUsers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const topPosts = data
    .flatMap(user =>
      user.posts
        .filter(post => post.post_type === 2 && post.needsCheck === 0)
        .map(post => ({ post, user }))
    )
    .sort((a, b) => b.post.like_count - a.post.like_count);

  return (
    <div>
      {topPosts.map(({ post, user }) => (
        <Post
          key={post.id}
          User={{
            picture: ProfilePicture,
            name: user.username,
            userID: user.id,
            post_title: post.title,
            post_image: post.image,
            post_description: post.description,
            like_count: post.like_count,
            comment_count: post.comment_count,
            profile_img: user.profile_img,
            post_id: post.id,
            isLikedDb: post.isLiked,
            isFollowedDB: user.isFollowing
          }}
        />
      ))}
    </div>
  );
}

export default TopPostsPage
