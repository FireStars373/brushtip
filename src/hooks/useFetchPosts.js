import {useState, useEffect} from "react";

export default function useFetchPosts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/posts`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (err) {
                setError(`Error fetching posts data: ${err.message}`);
                console.error("Error details:", err);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return {data, loading, error};
}

