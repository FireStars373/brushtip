import Question from "../component/Question.jsx";
import useFetchPosts from "../hooks/useFetchPosts.js";
import useFetchUsers from "../hooks/useFetchUsers.js";

function TopDiscussionPage() {
    const { data, loading, error } = useFetchUsers()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
const topPosts = data
    .flatMap(user =>
      user.posts
        .filter(post => post.post_type === 1)
        .map(post => ({ post, user }))
    )
    .sort((a, b) => b.post.like_count - a.post.like_count);

  return (
    <div>
      {topPosts.map(({ post, user }) => (
         <Question post={{post_id: post.id,post_title: post.title, post_description: post.description}}></Question>      ))}
    </div>
  );

}
export default TopDiscussionPage;
