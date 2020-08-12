import { useState } from "react";

export default function useApi () {
  const [ data, setData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ apiError, setApiError ] = useState(null);
  const [ success, setSuccess ] = useState(false);

  function init () {
    setData([]);
    setIsLoading(false);
    setApiError(null);
    setSuccess(false);
  }

  async function load (apiCall) {
    init();
    setIsLoading(true);
    try {
      const response = await apiCall();
      setData(response.data);
      setSuccess(true);
    } catch (e) {
      console.log(e);
      setApiError({ ...e.response });
    }
    setIsLoading(false);
  }

  return { data, isLoading, apiError, success, load };
}
