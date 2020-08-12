import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchData(url, timeout) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function init() {
    setData([]);
    setLoading(false);
    setError(false);
  }

  async function load () {
    init();
    setLoading(true);
    try {
      const response = await axios.get(url, {timeout, withCredentials: true});
      setData(response.data);
    }
    catch (e) {
      console.log(e);
      setError(true);
    }
    setLoading(false);
  }

  return [data, loading, error, load];
}


export function useFetchDataEffect(url, reqConfig) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function load() {
    try {
      const response = await axios.get(url, reqConfig);
      setData(response.data);
    }
    catch (e) {
      console.log(e);
      setError(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    load().catch(e => console.log(e));
  }, []);

  return [data, loading, error];
}
