import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./fetchData";

export function useFetch(url) {
  const [State, setState] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchDataFromApi(url).then(([data, err]) => {
      if (err) {
        setError(error);
      } else {
        setState(data);
        setloading(false);
      }
    });
  }, [url]);

  return { State, loading, error };
}
