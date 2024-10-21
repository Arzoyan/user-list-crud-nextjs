"use client";
import { useEffect, useState, useCallback } from "react";

const useFetchData = ({url, method = "GET"}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (body, onSuccessCallback) => {
    setLoading(true);
    setError("")
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }
      
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? `Error: ${response.status} ${response.statusText}`);
      }

      setData(result);
      onSuccessCallback?.()
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  // Fetch data when the URL or method changes in case of it is get request
  useEffect(() => {
    if (url && method === "GET") {
      fetchData();
    }
  }, [url, method]);

  return { data, loading, error, fetchData };
};

export default useFetchData;
