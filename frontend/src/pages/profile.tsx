import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const profilePage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const Menus = [
    {title: "Home", src:"Home"}, 
    {title: "Explore", src:"Explore"},
    {title: "Notifications", src:"Notifications"},
    {title: "Messages", src:"Messages"},
    {title: "Bookmarks", src:"Bookmarks"},
    {title: "Profile", src:"Profile"},
    {title: "More", src:"More"},
    {title: "New Foxter", src:"Foxter"},]
    
    return (
        <div>
            <div className={`${open ? "30vw": "20vw"} duration-300 h-screen p-5 pt-8 bg-white relative`}>
        <img src="/Openicon.png" className={`absolute cursor-pointer
        -right-3 top-9 w-4 border-white ${open && "rotate-180"}`}
        onClick={()=> setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src="/logo.png" className={`w-20 cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
        
          <h1 className={`text-black origin-left font-medium text-xl duration-300 ${!open && "scale-0" }`}
          >
            Foxter
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu,index)=>(
            <li key={index} className="text-greenFox text-sm flex items-center
            gap-x-4 cursor-pointer p-2 hover:bg-lightGray rounded-md w-12" >
              <img src={`/${menu.src}.png`} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
            ))}
        </ul>
      </div>
        {/* <h1>{users.name}</h1>
        <img src={profileImage} alt={users.name} /> */}
      </div>
);
};
export default profilePage;