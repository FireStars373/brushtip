import ProfilePost from "../component/ProfilePost.jsx";
import { useOutletContext } from "react-router-dom";
import PostPic from "../assets/TempPostPic.png";

function ProfilePage() {
  const { posts } = useOutletContext();

  return (
    <>
      <ProfilePost posts={posts} />
    </>
  );
}

export default ProfilePage;

