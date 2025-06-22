import { useEffect, useState } from 'react';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TDMB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
};

const FetchMovies = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
                const res = await fetch(endPoint, API_OPTIONS);
                const result = await res.json();
                setData(result.results || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    return children({ data, loading, error });
};

export default FetchMovies; 