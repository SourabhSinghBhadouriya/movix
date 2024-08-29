import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize as true since we are starting to load
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return; // Prevent running the effect if the URL is empty or undefined

        setLoading(true); // Set loading to true when the effect runs
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message || "Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
