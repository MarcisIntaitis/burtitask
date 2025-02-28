import { useState, useEffect } from "react";

function useFetchData(url) {
  const [items, setItems] = useState(null);
  const [varieties, setVarieties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return; 

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        setItems(json.items);
        setVarieties(json.varieties);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // runs when `url` changes

  return { items, varieties, loading, error };
}

export default useFetchData;
