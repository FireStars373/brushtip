import {Outlet} from "react-router-dom";
import "../styles/Profile.css"
import Profile from "../component/Profile.jsx";
import useFetchProfile from "../hooks/useFetchProfile.js";
function ProfileLayout() {
    //temp data if nothing fucking works
    const {user, loading, error } = useFetchProfile();	
	const imgURL = "http://localhost:5000/";

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="profile-banner">
                <img className="profile-banner-img" src={imgURL+user.banner_img} alt="profile picture"/>
                <div className="profile-info">
                    <Profile User={{picture: user.profile_img, name: user.username, profile_description: user.description}}/>
                </div>
            </div>

            <div style={{display: "flex", justifyContent: "center",}}>
                <div
                    style={{backgroundColor:'#263d32', margin: "3rem", padding: "1rem", borderRadius:"12px", maxWidth: "75rem",  width: "75rem",}}>
                    <Outlet context={{posts: user.posts}}/>
                </div>
            </div>
        </>
    );
}


export default ProfileLayout;
