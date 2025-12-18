import Question from "../component/Question.jsx";
import useFetchPosts from "../hooks/useFetchPosts.js";

function DiscussionPage() {
    const { data, loading, error } = useFetchPosts();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {data.filter(post => post.post_type === 1).map((post) =>
                <Question post={{post_title: post.title, post_description: post.description}}></Question>
            )}
        </div>
    )
}
export default DiscussionPage;
