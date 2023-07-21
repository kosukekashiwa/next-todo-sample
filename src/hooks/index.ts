import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState({});

  const refetch = () => {
    setReady({});
  };

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("fetch!");
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resJson = await res.json();
        setData(resJson);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url, ready]);

  return { loading, data, error, refetch };
};
