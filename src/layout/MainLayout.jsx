import SiteSelect from "../component/SiteSelect.jsx";
import {Outlet} from "react-router-dom";
import AddPost from "../component/AddPost.jsx";


function MainLayout() {
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-auto">
                        <SiteSelect/>
                    </div>
                    <div className="col">
                        <div style={{backgroundColor:'#263d32', margin: "3rem", padding: "1rem", borderRadius:"12px", maxWidth: "65rem" }}>
                        <Outlet/>
                        </div>
                    </div>
                    <div >
                        <AddPost/>
                    </div>

                </div>
            </div>
        </>
    )
}
export default MainLayout;