import API_URL from "../config/api-url";
import { useFetchDataEffect } from "./useFetchData";
import { useEffect } from "react";
// import { setPosts } from "../Redux/async-actions";

const POSTS_URL = `${API_URL}/posts`;

export default function useFetchPosts (storeDispatch) {
  const [data, loading, error] = useFetchDataEffect(POSTS_URL, 5000);

  useEffect(() => {
    // storeDispatch(setPosts(data))
  }, [data]);

  return [loading, error];
}
