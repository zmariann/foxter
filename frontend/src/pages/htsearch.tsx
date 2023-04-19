import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import type { FoxProps } from "../../../shared/types";
import Fox from "@/components/Fox";
import Layout from "@/components/layout";

interface User {
  name: string;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const SearchHashTag: React.FC = () => {
  const [query, setQuery] = useState("");
  // State to store the search result data
  //const [searchResult, setSearchResult] = useState(null);
  // const [searchResult, setSearchResult] = useState<null | FoxProps[]>(null);
  const [foxes, setFoxes] = useState<FoxProps[]>([]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/htsearch?hashtag=${query.replace("#", "")}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setFoxes(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Submitting search query: ${query}`);
    handleSearch();
  };

  return (
    <Layout>
      <div className={`h-screen mt-10 bg-whiteFox`}>
        {/* Form to render hashtag search bar starts */}
        <form className="flex items-center" onSubmit={handleSubmit}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-zinc-200 dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Search hashtags"
              required
              value={query}
              onChange={handleQueryChange}
            />
          </div>

          {/* Search Button code starts */}
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-greenFox rounded-lg border border-neutral-50 hover:bg-[#387354] focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-greenFox dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <svg
              className="w-5 h-5 text-black dark:text-zinc-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>

            <span className="sr-only">Search</span>
          </button>
          {/* Search Button code starts */}
        </form>
        {/* Form to render hashtag search bar ends */}

        {/* Render search result starts */}
        <div className="mt-8 flex justify-center">
          {(foxes && foxes.length) > 0 ? (
            foxes.map((fox) => {
              return <Fox key={fox.id} fox={fox} onDeleteFox={() => {}} />;
            })
          ) : (
            <p>No search results found</p>
          )}
        </div>
        {/* Render search result ends */}
      </div>
    </Layout>
  );
};
export default SearchHashTag;
