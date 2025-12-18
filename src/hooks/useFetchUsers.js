import { useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:5000";

export default function useFetchUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BACKEND_URL}/api/users`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (err) {
                setError(`Error fetching users data: ${err.message}`);
                console.error("Error details:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}
