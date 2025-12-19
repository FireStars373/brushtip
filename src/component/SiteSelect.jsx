import "../styles/SiteSelect.css"
import {useNavigate} from "react-router-dom";

function SiteSelect(){

    const Posts = [
        { id: 1, title: "New", value: "new" },
        { id: 2, title: "Top of All Time", value: "top_all" },
        { id: 3, title: "Top of Today", value: "top_today" },
        { id: 4, title: "Following", value: "following" }
    ]
    const Discussion = [
        {id: 1, title: "Art Tips"},
        {id: 2, title: "Digital Art"},
        {id: 3, title: "General Questions"},
        {id: 4, title: "Communities"}
    ]
    const navigate = useNavigate()

    function handleDiscussionClick(){
        navigate("/DiscussionPage")
    }

    return (
        <div className="site-select-card">
            <div style={{marginBottom: "3rem"}}>
                <h2 style={{borderBottom: "black 2px solid"}}>Posts</h2>
                {Posts.map(post => (<li key={post.id} onClick={() => navigate(`/?filter=${post.value}`)}>{post.title}</li>))}
            </div>
            <div style={{marginBottom: "1rem"}}>
                <h2 style={{borderBottom: "black 2px solid"}}>Discussion</h2>
                {Discussion.map((discussion) => (<li onClick={handleDiscussionClick}>{discussion.title}</li>))}
            </div>
        </div>
    )
}
export default SiteSelect;