import {Outlet} from "react-router-dom";
import "../styles/Profile.css"
import Profile from "../component/Profile.jsx";
import ProfilePicture from "../assets/TempProfilePic.png";
import BannerPicture from "../assets/TempBannerPic.jpg";
import useFetchUsers from "../hooks/useFetchUsers.js";
import useFetchProfile from "../hooks/useFetchProfile.js";

function ProfileLayout() {
    //temp data if nothing fucking works
    const {data, loading, error } = useFetchUsers();
    const LoggedInUser = data[0];


    const {user} = useFetchProfile();
    console.log(user);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="profile-banner">
                <img className="profile-banner-img" src={BannerPicture} alt="profile picture"/>
                <div className="profile-info">
                    <Profile User={{picture: ProfilePicture, name: LoggedInUser.username, profile_description: LoggedInUser.description}}/>
                </div>
            </div>

            <div style={{display: "flex", justifyContent: "center",}}>
                <div
                    style={{backgroundColor:'#263d32', margin: "3rem", padding: "1rem", borderRadius:"12px", maxWidth: "75rem",  width: "75rem",}}>
                    <Outlet context={{posts: LoggedInUser.posts}}/>
                </div>
            </div>
        </>
    );
}


export default ProfileLayout;