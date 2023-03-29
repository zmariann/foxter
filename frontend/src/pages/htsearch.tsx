import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { FoxProps } from "../../../shared/types";

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

  const [searchResult, setSearchResult] = useState<null | FoxProps[]>(null);

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
      console.log(setSearchResult(result));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Submitting search query: ${query}`);
    handleSearch();
  };

  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Home", src: "Home" },
    { title: "Explore", src: "Explore" },
    { title: "Notifications", src: "Notifications" },
    { title: "Messages", src: "Messages" },
    { title: "Bookmarks", src: "Bookmarks" },
    { title: "Profile", src: "Profile" },
    { title: "More", src: "More" },
    { title: "New Foxter", src: "Foxter" },
  ];

  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-52" : "w-36"
          } duration-300 h-screen p-5 pt-8 bg-white relative`}
        >
          <img
            src="/Openicon.png"
            className={`absolute cursor-pointer
        -right-3 top-9 w-4 border-white ${open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="/logo.png"
              className={`w-20 cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />

            <h1
              className={`text-black origin-left font-medium text-xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Foxter
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <li
                key={index}
                className="text-greenFox text-sm flex items-center
            gap-x-4 cursor-pointer p-2 hover:bg-lightGray rounded-md w-12"
              >
                <img src={`/${menu.src}.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`w-96 h-screen bg-whiteFox`}>
          <div
            style={{
              display: "flex",
              height: "20vh",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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
            <div className="mt-4 flex justify-center">
              {searchResult && searchResult.length > 0 ? (
                <ul>
                  {searchResult.map((item) => (
                    <li key={item.id}>{item.content}</li>
                  ))}
                </ul>
              ) : (
                <p>No search results found</p>
              )}
            </div>
            {/* Render search result ends */}
          </div>
        </div>
        <div className={`w-72 h-screen bg-white p-8`}>
          <div>
            <input type="text" placeholder="Search foxes" />
          </div>
          <div>Trends</div>
          <div>Who to follow</div>
          <div>Footer</div>
        </div>
      </div>
      ;
    </>
  );
};

const Navigation: React.FC<User> = ({
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
}) => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/Messages">
            <a>Messages</a>
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={onLogoutClick}>Logout</button>
          </li>
        ) : (
          <li>
            <button onClick={onLoginClick}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SearchHashTag;
