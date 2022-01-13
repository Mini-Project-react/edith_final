import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./fetchData";

export function useFetch(url) {
  const [State, setState] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    fetchDataFromApi(url)
      .then((res) => {
        setloading(true);
        setState(res);
        setloading(false);
      })
      .catch((err) => setError(err));
  }, [url]);

  return { State, loading, error };
}
