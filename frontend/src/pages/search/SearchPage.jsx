import {
  ArrowLeft,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import useSearch from "../../hooks/useSearch";

const SearchPage = () => {
  const navigate = useNavigate();

  const {
    query,
    setQuery,
    results,
    totalResults,
    loading,
    error,
    minQueryLength,
  } = useSearch();

  const handleSelect = (result) => {
    if (!result?.actionUrl) {
      return;
    }

    navigate(result.actionUrl);
  };

  const showHint =
    query.trim().length > 0 &&
    query.trim().length < minQueryLength;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              rounded-xl border border-slate-200 bg-white p-2.5
              text-slate-600 transition hover:bg-slate-100
              dark:border-slate-700 dark:bg-slate-900
              dark:text-slate-300 dark:hover:bg-slate-800
            "
            aria-label="Go back"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Search
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Find your notes, quizzes, roadmaps and resume reviews.
            </p>
          </div>
        </div>

        <div
          className="
            rounded-3xl border border-slate-200 bg-white p-4 shadow-sm
            dark:border-slate-700 dark:bg-slate-900
          "
        >
          <div className="flex items-center gap-3">
            <Search
              size={21}
              className="shrink-0 text-slate-400"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources..."
              autoFocus
              className="
                min-w-0 flex-1 bg-transparent text-base
                text-slate-900 outline-none
                placeholder:text-slate-400
                dark:text-white
              "
              aria-label="Search resources"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="
                  rounded-lg p-1.5 text-slate-400 transition
                  hover:bg-slate-100 hover:text-slate-700
                  dark:hover:bg-slate-800 dark:hover:text-slate-200
                "
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {showHint && (
            <p className="mt-2 pl-9 text-xs text-amber-600 dark:text-amber-400">
              Enter at least {minQueryLength} characters.
            </p>
          )}
        </div>

        <div className="mt-6">
          {query.trim().length < minQueryLength && !loading ? (
            <div
              className="
                rounded-3xl border border-dashed border-slate-300
                px-6 py-16 text-center
                dark:border-slate-700
              "
            >
              <Search className="mx-auto text-slate-300 dark:text-slate-600" size={40} />
              <p className="mt-4 font-semibold text-slate-700 dark:text-slate-300">
                Start searching
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Search by resource title, topic, goal, role or resume filename.
              </p>
            </div>
          ) : (
            <SearchResults
              results={results}
              totalResults={totalResults}
              loading={loading}
              error={error}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
