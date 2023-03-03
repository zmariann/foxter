import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the shape of the fox data
interface Fox {
  id: number;
  content: string;
  created_at: Date;
}

interface User {
  name: string;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

interface Props {}

const SearchHashTag: React.FC<Props> = () => {
  const [query, setQuery] = useState("");
  // State to store the search result data
  //const [searchResult, setSearchResult] = useState(null);

  const [searchResult, setSearchResult] = useState<null | Fox[]>(null);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/htsearch?hashtag=${query.replace("#", "")}`, {
        method: "GET",
      });
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
            <form className="flex items-center" onSubmit={handleSubmit}>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search hashtags"
                  required
                  value={query}
                  onChange={handleQueryChange}
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-greenFox rounded-lg border border-blue-700 hover:bg-[#387354] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5"
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
            </form>

            <div className="mt-4">
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
