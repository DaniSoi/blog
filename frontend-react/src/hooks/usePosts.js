import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../redux/selectors";
import { useEffect } from "react";
import { fetchPostsAction } from "../redux/actions";

export default function usePosts () {
  const storeDispatch = useDispatch();
  const { posts, isLoading, error } = useSelector(selectPosts);

  useEffect(() => {
    storeDispatch(fetchPostsAction())
  }, [storeDispatch]);

  return [ posts, isLoading, error ];
}
