import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./fetchData";

export function useFetch(url) {
  const [State, setState] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetchDataFromApi(url).then(([{ response }, err]) => {
      if (err) {
        setError(error);
      } else {
        setState(response);
        console.log(response);
        setloading(false);
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  const rerender = () => {
    fetchData();
  };
  return { State, loading, error, rerender };
}
