import { useEffect, useState } from "react";
import searchService from "../services/searchService";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 350;

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setTotalResults(0);
      setHasMore(false);
      setLoading(false);
      setError(null);
      return undefined;
    }

    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await searchService.search(
          normalizedQuery
        );

        if (cancelled) {
          return;
        }

        const data = response?.data;

        setResults(data?.results || []);
        setTotalResults(data?.totalResults || 0);
        setHasMore(Boolean(data?.hasMore));
      } catch (err) {
        if (cancelled) {
          return;
        }

        setResults([]);
        setTotalResults(0);
        setHasMore(false);
        setError(
          err?.response?.data?.message ||
          "Unable to search right now."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  return {
    query,
    setQuery,
    results,
    totalResults,
    hasMore,
    loading,
    error,
    minQueryLength: MIN_QUERY_LENGTH,
  };
};

export default useSearch;
