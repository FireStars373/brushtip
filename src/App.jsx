import { Routes, Route } from "react-router-dom";
import Home from "./sites/HomePage.jsx";
import ProfilePage from "./sites/ProfilePage.jsx";
import PostInfoPage from "./sites/PostInfoPage.jsx";
import DiscussionPage from "./sites/DiscussionPage.jsx";
import DiscussionInfoPage from "./sites/DiscussionInfoPage.jsx";
import NaviBar from "./component/NaviBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import SiteSelect from "./component/SiteSelect.jsx";
import HomePage from "./sites/HomePage.jsx";
import AdminPage from "./sites/AdminPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ProfileLayout from "./layout/ProfileLayout.jsx";
import AddPost from "./component/AddPost.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import NewDiscussionPage from "./sites/NewDiscussions.jsx";
import TodayDiscussionPage from "./sites/TodayDiscussions.jsx";
import FollowingDiscussionsPage from "./sites/FollowingDiscussions.jsx";
import TopDiscussionPage from "./sites/TopDiscussions.jsx";
import NewPostsPage from "./sites/NewPosts.jsx";
import TodayPostsPage from "./sites/TodayPosts.jsx";
import FollowingPostsPage from "./sites/FollowingPosts.jsx";
import TopPostsPage from "./sites/TopPosts.jsx";

function App() {
  return (
    <main className="main-content">
      <NaviBar />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/PostInfoPage/:id" element={<PostInfoPage />} />
          <Route path="/discussions/new" element={<NewDiscussionPage />} />
          <Route path="/discussions/today" element={<TodayDiscussionPage />} />
          <Route path="/discussions/following" element={<FollowingDiscussionsPage />} />
          <Route path="/discussions/top" element={<TopDiscussionPage />} />

          <Route path="/posts/new" element={<NewPostsPage />} />
          <Route path="/posts/today" element={<TodayPostsPage />} />
          <Route path="/posts/follwing" element={<FollowingPostsPage />} />
          <Route path="/posts/top" element={<TopPostsPage />} />

          <Route path="/DiscussionInfoPage/:id" element={<DiscussionInfoPage />} />
        </Route>
        <Route path="/" element={<ProfileLayout />}>
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/AdminPage" element={<AdminPage />} />
        </Route>
      </Routes>
    </main>
  );
}
export default App;
