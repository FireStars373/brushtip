import SiteSelect from "../component/SiteSelect.jsx";
import {Outlet} from "react-router-dom";
import "../styles/Admin.css"


function AdminLayout() {
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="detectedAdd" >
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminLayout;