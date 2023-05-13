import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Link from "next/link";
import { getAuthStatus, getCurrentUserName } from "@/utils/authStatus";

interface User {
  name: string | null;
  handle: string | null;
  image: string;
}

export default function UserButton() {
  const [user, setUser] = useState<User>({
    name: null,
    handle: null,
    image: "",
  });

  const getUserData = async () => {
    setUser({
      name: getCurrentUserName(),
      handle: getCurrentUserName(),
      image: "/NoProfilePicture.png",
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return getAuthStatus() ? (
    <>
      <div className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-12 mr-2 fixed left-2 bottom-0 cursor-pointer">
        <Link href={`/profiles/${user.name}`} className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={user.image}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-base leading-6 font-medium text-white">
                <Link href={`/profiles/${user.name}`}>{user.name}</Link>
              </p>
              <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                {user.handle}
              </p>
            </div>
            <div>
              <Menu
                menuButton={
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-6 float-right ml-10"
                  >
                    <g>
                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </g>
                  </svg>
                }
                transition
              >
                <MenuItem>
                  <Link href="/logout">Logout</Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/profiles/${user.name}`}>Profile</Link>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className="flex">
        <a
          href="/login"
          className="bg-green-400 mt-5 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
        >
          Login
        </a>
      </div>
    </>
  );
}
