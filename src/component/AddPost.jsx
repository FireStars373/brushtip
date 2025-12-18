import React, { useState } from "react";
import "../styles/AddPost.css";
import {X, CirclePlus} from "lucide-react";
import BannerPicture from "../assets/TempBannerPic.jpg";

function AddPost() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button in Bottom-Right */}
            <CirclePlus onClick={() => setIsOpen(true)} className="add-post-btn"/>

            {/* Overlay / Modal */}
            {isOpen && (
                <div className="overlay">
                    <div className="add-post-container">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 className="modal-title">Add New Post</h2>
                            <X size={30} onClick={() => setIsOpen(false)} className="close-btn"/>
                        </div>
                        <form className="post-form">
                            <input type="text" placeholder="Post title" />
                            <textarea placeholder="Write description..." />
                            <button className="add-btn">Import</button>

                            <button className="add-btn">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
//<div className="post-image">
   // <img style={{opacity: "100%"}} src={BannerPicture}  alt={"No image"}  width={200} height={200}></img>
//</div>
export default AddPost;
