import Question from "../component/Question.jsx";
import useFetchPosts from "../hooks/useFetchPosts.js";
import useFetchUsers from "../hooks/useFetchUsers.js";

function TodayDiscussionPage() {
    const { data, loading, error } = useFetchUsers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
 // Get today's date in UTC (or local timezone if you prefer)
  const today = new Date();
  const todayYear = today.getUTCFullYear();
  const todayMonth = today.getUTCMonth();
  const todayDate = today.getUTCDate();

  // Flatten all posts, filter for today's posts, sort by likes
  const todaysPosts = data
    .flatMap(user =>
      user.posts
        .filter(post => post.post_type === 1)
        .map(post => ({ post, user }))
    )
    .filter(({ post }) => {
      const postDate = new Date(post.upload_date);
      return (
        postDate.getUTCFullYear() === todayYear &&
        postDate.getUTCMonth() === todayMonth &&
        postDate.getUTCDate() === todayDate
      );
    })
    .sort((a, b) => b.post.like_count - a.post.like_count);

  return (
    <div>
      {todaysPosts.map(({ post, user }) => (
        <Question post={{post_title: post.title, post_description: post.description}}></Question>
      ))}
    </div>
  );

}
export default TodayDiscussionPage;
