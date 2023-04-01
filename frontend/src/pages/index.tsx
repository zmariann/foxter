import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostAFox from "@/components/PostAFox";
import Fox from "@/components/Fox";
import type { FoxProps } from "../../../shared/types";
import { useRouter } from "next/router";

interface User {
  name: string;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const FoxForm: React.FC = () => {
  // State to store the foxes data
  const [foxes, setFoxes] = useState<FoxProps[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); 

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    router.push("/"); // redirects the user to the home page
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  // Function to fetch the foxes data from the API
  const fetchFoxes = async () => {
    // Fetch the foxes data from the API
    const response = await fetch("/api/foxes");
    // Update the foxes state with the response data
    setFoxes(await response.json());
    // console.log(await response.json());
    // Log the foxes data in the console for debugging purposes
    console.log(foxes);
  };

  // Use effect hook to fetch the foxes data when the component is mounted
  useEffect(() => {
    fetchFoxes();
  }, []);

  const onDeleteFox = (id: number) => {
    setFoxes(foxes.filter((fox) => fox.id !== id));
  };

  // Function to follow someone
  const handleFollowing = async (userId: number) => {
    console.log(userId);
    const response = await fetch("/api/following", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followedId: userId }),
    });
    let body = await response.json();
    console.log(body);
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
    <div className="flex">
      <div
        className={`${
          open ? "w-[10%]" : "w-[5%]"
        } duration-300 h-screen p-5 pt-8 bg-white relative`}
      >
        <img
          src="/Openicon.png"
          className={`absolute cursor-pointer-right-3 top-9 w-4 border-white ${
            open && "rotate-180"
          }`}
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
            className={`text-black origin-left font-medium text-clip duration-300 ${
              !open && "scale-0"
            }`}
          >
            Foxter
          </h1>
        </div>
        <div className="pt-6">
          {Menus.map((menu, index) => (
            <div
              key={index}
              className="text-greenFox text-sm flex items-center
            gap-x-4 cursor-pointer p-2 hover:bg-blue-100 rounded-md w-12 hover:scale-125"
            >
              <img src={`/${menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={`w-[70%] h-screen bg-whiteFox`}>
        <div className="flex h-[15%] items-center justify-center">
          <PostAFox onRefresh={fetchFoxes} isLoggedIn={isLoggedIn} />
        </div>

        {/* || Render Foxes and Delete Button */}
        <div>
          <div className="flex justify-center items-center w-[100%]">
            {/* Display "No foxes to show. Post one!" message when foxes array is empty */}
            {foxes.length === 0 ? (
              <p className=" flex justify-center items-center">
                No foxes to show. Post one!
              </p>
            ) : (
              <div className="items-center">
                {/* Map through foxes array and render fox content and delete button */}
                {foxes.map((fox) => {
                  return <Fox fox={fox} onDeleteFox={onDeleteFox} />;
                })}
                {/* <button onClick={() => handleDelete(fox.id)} className="absolute right-1 top-1 w-5 h-10 p-1 bg-red-500 rounded-tr-2xl"><p>x</p></button>
                    <button onClick={() => handleFollowing(fox.userId)} className="absolute right-1 bottom-1 w-5 p-1 bg-blue-400 rounded-br-2xl h-10"><p>f</p></button> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`w-[20%] h-screen bg-white mt-4 px-2`}>
        <div>
          <input
            className="focus:ring-2 focus:ring-offset-lime-300 outline-none rounded-2xl w-full pl-5 p-8"
            type="text"
            placeholder="Search foxes"
          />
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5">
          Trends
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5">
          Who to follow
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-white p-5 mt-5">
          Footer
        </div>
      </div>
      ;
    </div>
  );
};

export default FoxForm;
