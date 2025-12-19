import { useState, useEffect } from "react";

export default function useFetchPostById(id) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    console.log("called fetch");
    const fetchData = async () => {
      try {
        setLoading(true);

        console.log("inside fetch");
        
        const token = localStorage.getItem("token");
        let response = null;
        if (!token) {
          response = await fetch(`http://localhost:5000/api/posts/${id}`);
        } else {
         response = await fetch(`http://localhost:5000/api/posts/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setPost(data.post);
        setComments(data.comments);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching post data: ${err.message}`);
        console.error("Error details:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { post, comments, loading, error };
}
