import { useEffect, useState } from "react";
const BACKEND_URL = "http://localhost:5000/api/users/profile";

export default function useFetchProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Not logged in");

                const res = await fetch("http://localhost:5000/api/users/test", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                console.log("aaaaa", data);
                if (!res.ok) throw new Error(data.message || "Failed to fetch user");
                setUser(data);


            } catch (err) {
                setError(`Error fetching users data: ${err.message}`);
                console.error("Error details:", err);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user};
}
