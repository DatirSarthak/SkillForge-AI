import { SearchX } from "lucide-react";
import SearchResultItem from "./SearchResultItem";

const SearchResults = ({
  results,
  totalResults,
  loading,
  error,
  onSelect,
}) => {
  if (loading) {
    return (
      <div className="space-y-3" aria-live="polite">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              h-24 animate-pulse rounded-2xl border
              border-slate-200 bg-white
              dark:border-slate-700 dark:bg-slate-900
            "
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl border border-red-200 bg-red-50
          px-6 py-10 text-center
          dark:border-red-500/20 dark:bg-red-500/10
        "
      >
        <p className="font-semibold text-red-700 dark:text-red-300">
          Search failed
        </p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div
        className="
          rounded-2xl border border-slate-200 bg-white
          px-6 py-12 text-center
          dark:border-slate-700 dark:bg-slate-900
        "
      >
        <SearchX
          className="mx-auto text-slate-300 dark:text-slate-600"
          size={36}
        />

        <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">
          No matching resources
        </p>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Try a different title, topic, role, or keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {totalResults} result{totalResults === 1 ? "" : "s"} found
      </p>

      {results.map((result) => (
        <SearchResultItem
          key={`${result.type}-${result.id}`}
          result={result}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default SearchResults;
