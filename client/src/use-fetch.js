import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./fetchData";

export function useFetch(url) {
  const [State, setState] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchDataFromApi(url).then(([{ response }, err]) => {
      if (err) {
        setError(error);
      } else {
        setState(response);
        setloading(false);
      }
    });
  }, [url]);

  return { State, loading, error };
}
