import "../styles/SiteSelect.css"
import {useNavigate} from "react-router-dom";

function SiteSelect(){

    const Posts = [
        {id: 1, title: "New"},
        {id: 2, title: "Top of All Time"},
        {id: 3, title: "Top of Today"},
        {id: 4, title: "Following"}
    ]
    const Discussion = [
        {id: 1, title: "Art Tips"},
        {id: 2, title: "Digital Art"},
        {id: 3, title: "General Questions"},
        {id: 4, title: "Communities"}
    ]
    const navigate = useNavigate()

    function handlePostClick(){
        navigate("/")
    }
    function handleDiscussionClick(){
        navigate("/DiscussionPage")
    }

    return (
        <div className="site-select-card">
            <div style={{marginBottom: "3rem"}}>
                <h2 style={{borderBottom: "black 2px solid"}}>Posts</h2>
                {Posts.map(post => <li onClick={handlePostClick}>{post.title}</li>)}
            </div>
            <div style={{marginBottom: "1rem"}}>
                <h2 style={{borderBottom: "black 2px solid"}}>Discussion</h2>
                {Discussion.map((discussion) => (<li onClick={handleDiscussionClick}>{discussion.title}</li>))}
            </div>
        </div>
    )
}
export default SiteSelect;