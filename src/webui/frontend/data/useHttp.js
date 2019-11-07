import { useState, useEffect } from 'react';

const defaultFetchOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
};

const useHttp = (url, options, dependencies = []) => {
    if (!url || typeof url !== 'string') throw new Error(`Invalid url: ${url}`);
    if (!Array.isArray(dependencies)) dependencies = [];

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(url, options || defaultFetchOptions)
            .then(response => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    }, dependencies);

    return [loading, data, error];
};

export default useHttp;
