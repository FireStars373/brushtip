import {Routes, Route} from 'react-router-dom'
import Home from './sites/HomePage.jsx'
import ProfilePage from "./sites/ProfilePage.jsx";
import PostInfoPage from "./sites/PostInfoPage.jsx";
import DiscussionPage from "./sites/DiscussionPage.jsx";
import DiscussionInfoPage from "./sites/DiscussionInfoPage.jsx";
import NaviBar from "./component/NaviBar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import SiteSelect from "./component/SiteSelect.jsx";
import HomePage from "./sites/HomePage.jsx";
import AdminPage from "./sites/AdminPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ProfileLayout from "./layout/ProfileLayout.jsx";
import AddPost from "./component/AddPost.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";

function App() {
    return (
        <main className="main-content">
            <NaviBar />
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route path="/" element={<HomePage />} />
                    <Route path="/PostInfoPage/:id" element={<PostInfoPage />} />
                    <Route path="/DiscussionPage" element={<DiscussionPage />} />
                    <Route path="/DiscussionInfoPage/:id" element={<DiscussionInfoPage />} />
                </Route>
                <Route path="/" element={<ProfileLayout />} >
                    <Route path="/ProfilePage" element={<ProfilePage />} />
                </Route>
                <Route path="/" element={<AdminLayout />} >
                    <Route path="/AdminPage" element={<AdminPage />} />
                </Route>
            </Routes>
        </main>
    )
}
export default App
