import Question from "../component/Question.jsx";
import useFetchPosts from "../hooks/useFetchPosts.js";
import useFetchUsers from "../hooks/useFetchUsers.js";

function NewDiscussionPage() {
    const { data, loading, error } = useFetchUsers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
const allPosts = data
  .flatMap(user =>
    user.posts
      .filter(post => post.post_type === 1)
      .map(post => ({
        ...post,
        user
      }))
  )
  .sort(
    (a, b) =>
      Date.parse(b.upload_date) - Date.parse(a.upload_date)
  );
    return (
        <div>
           {allPosts.map(post => (
  <Question post={{post_title: post.title, post_description: post.description}}></Question>
))}        </div>
    )
}
export default NewDiscussionPage;
