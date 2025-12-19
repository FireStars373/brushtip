import "../styles/SiteSelect.css";
import { useNavigate } from "react-router-dom";

function SiteSelect() {
  const Posts = [
    { id: 1, title: "New", link: "/posts/new" },
    { id: 2, title: "Top of All Time", link: "/posts/top" },
    { id: 3, title: "Top of Today", link: "/posts/today" },
    { id: 4, title: "Following", link: "/posts/follwing" },
  ];
  const Discussion = [
    { id: 1, title: "New", link: "/discussions/new" },
    { id: 2, title: "Top of All Time", link: "/discussions/top" },
    { id: 3, title: "Top of Today", link: "/discussions/today" },
    { id: 4, title: "Following", link: "/discussions/following" },
  ];
  const navigate = useNavigate();

  function handlePostClick(link) {
    navigate(link);
  }
  function handleDiscussionClick(link) {
    navigate(link);
  }

  return (
    <div className="site-select-card">
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ borderBottom: "black 2px solid" }}>Posts</h2>
        {Posts.map((post) => (
          <li onClick={() => handlePostClick(post.link)}>{post.title}</li>
        ))}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ borderBottom: "black 2px solid" }}>Discussion</h2>
        {Discussion.map((discussion) => (
          <li onClick={() => handleDiscussionClick(discussion.link)}>
            {discussion.title}
          </li>
        ))}
      </div>
    </div>
  );
}
export default SiteSelect;

