import Question from "../component/Question.jsx";
import useFetchPosts from "../hooks/useFetchPosts.js";
import useFetchUsers from "../hooks/useFetchUsers.js";

function FollowingDiscussionsPage() {
    const { data, loading, error } = useFetchUsers();
	console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>

{data.filter(user => user.isFollowing === true).map((user) => user.posts.filter(post => post.post_type === 1).map((post) =>
                <Question post={{post_title: post.title, post_description: post.description}}></Question>
            ))}
        </div>
    )
}
export default FollowingDiscussionsPage;
