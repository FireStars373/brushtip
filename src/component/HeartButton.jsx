import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

function HeartButton({ like_count, isLikedDb, post_id }) {
  const [count, setCount] = useState(0); // initialize the number
  const [isLiked, setIsLiked] = useState();
	const BACKEND_URL = "http://localhost:5000/api"
	const user = localStorage.getItem("user");
  useEffect(() => {
    if (!like_count) return setCount(0);
    setCount(like_count);
    setIsLiked(isLikedDb);
  }, [like_count]);
  const HeartClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (isLiked) {
        const response = await fetch(`${BACKEND_URL}/posts/like/${post_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLiked(false);

        setCount(count - 1);
      } else {
        const response = await fetch(`${BACKEND_URL}/posts/like/${post_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLiked(true);

        setCount(count + 1); // increase by 1
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "comment failed");
    } catch (err) {
      console.log(err.message);
    }

  };

if (!user) return (<></>)

  return (
    <div
      className="heart-btn"
      style={{
        display: "flex",
        alignItems: "flex-start",
        marginRight: "2rem",
        gap: "0.5rem",
      }}
    >
      <Heart
        size={30}
        fill={isLiked ? "black" : "transparent"}
        onClick={() => HeartClick()}
      ></Heart>
      <p>{count}</p>
    </div>
  );
}

export default HeartButton;
