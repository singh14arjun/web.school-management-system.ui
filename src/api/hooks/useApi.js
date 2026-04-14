import { useState } from "react";
import { handleError } from "../utils/handleError";

const useApi = (apiFunc) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const data = await apiFunc(...args);
            return data;
        } catch (err) {
            const message = handleError(err);
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, error };
};

export default useApi;