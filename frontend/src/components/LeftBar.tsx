import { useEffect, useState } from "react";
import UserButton from "./UserButton";
import { authStatus } from "@/utils/authStatus";
import Link from "next/link";

export default function LeftBar() {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const getCookieValue = (name: string): string =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const getUserData = async () => {
    setUserName(getCookieValue("userName"));
  };
  useEffect(() => {
    getUserData();
  }, []);

  const Menus = [
    { title: "Home", src: "Home", url: "" },
    { title: "Explore", src: "Explore", url: "htsearch" },
    { title: "Messages", src: "Messages", url: "rooms" },
    { title: "Invitations", src: "Invitations", url: "invitations" },
    { title: "Profile", src: "Profile", url: `profiles/${userName}` },
  ];

  return (
    <>
      <div
        className={`w-3/12 duration-300 h-screen p-5 pt-8 bg-white relative`}
      >
        <img
          src="/Openicon.png"
          className={`absolute top-0 right-16 cursor-pointer-right-3 top-9 w-4 border-white ${
            open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 mt-8 items-center">
          <img
            src="/logo.png"
            className={`w-12 cursor-pointer duration-500 ${
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
            <Link key={index} href={`/${menu.url}`} className="">
              <div
                className="text-greenFox text-sm flex items-center
                gap-x-4 cursor-pointer p-2 rounded-md w-12 hover:scale-110 duration-100"
              >
                <img src={`/${menu.src}.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <UserButton />
      </div>
    </>
  );
}
