import { betterFetch } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function UserButton() {
  const [user, setUser] = useState({
    name: null,
    handle: null,
    image: "",
  });

  const getCookieValue = (name: string): string =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const getUserData = async () => {
    setUser({
      name: getCookieValue("userName"),
      handle: getCookieValue("userName"),
      image: "https://placehold.co/100",
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return user.name ? (
    <>
      <div className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-12 mr-2 fixed left-2 bottom-0">
        <a className="flex-shrink-0 group block" target="_blank">
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
                {user.name}
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
                  <a href="/logout">Logout</a>
                </MenuItem>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Add Another Account</MenuItem>
              </Menu>
            </div>
          </div>
        </a>
      </div>
    </>
  ) : (
    <></>
  );
}