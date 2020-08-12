import useConstant from "use-constant";
import { useEffect, useLayoutEffect, useState } from "react";
import debounce from "lodash.debounce";

export default function useDebouncedSearch (searchFunction, src) {
  const [ searchInput, setSearchInput ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ isSearching, setIsSearching ] = useState(false);

  const searchFunctionWrapper = (...args) => {
    const res = searchFunction(...args);
    setSearchResults(res);
    setIsSearching(false);
  }

  const debouncedSearchFunction = useConstant(() =>
    debounce(searchFunctionWrapper, 300)
  );

  useLayoutEffect(() => {
    if (!searchInput.length) {
      setSearchResults([]);
    } else {
      setIsSearching(true);
      debouncedSearchFunction(searchInput, src);
    }
  }, [ searchInput, src ]);

  return {
    searchInput,
    setSearchInput,
    searchResults,
    isSearching
  };
}
