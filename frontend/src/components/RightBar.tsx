import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";

export default function RightBar() {
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const foxes = useStoreState((state) => state.foxes);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const searchResult = foxes.filter((fox) =>
    fox.content.toLowerCase().includes(search.toLowerCase())
  );
  const imageClass = search.length > 0 ? "max-h-10 ease-out druation-500" : "";

  return (
    <>
      <div className={`w-3/12 h-screen bg-white mt-4 px-2`}>
        <div className=" flex-col justify-items-center">
          <img src="/Search.png" className=" max-h-8"></img>
          <input
            className="focus:ring-2 focus:ring-offset-lime-300 outline-none rounded-2xl w-full pl-5 p-5"
            type="text"
            placeholder="Search foxes"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5 flex flex-col items-center">
          <img src="/CoolFox.png" className={`${imageClass}`} alt="Cool Fox" />
          {search.length > 0 && search.length < 3 ? (
            <div>Enter at least 3 characters</div>
          ) : (
            search.length >= 3 &&
            searchResult.map((result) => {
              return <div key={result.id}>{result.content}</div>;
            })
          )}
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-white p-5 mt-5 flex justify-center">
          <div className="flex">
            <Link href="http://www.instagram.com">
              <img
                src="/Instagram.png"
                alt="Instagram"
                className="max-h-8 pr-2"
              />
            </Link>
            <Link href="https://discord.com/">
              <img src="/Discord.png" alt="Discord" className="max-h-8 pr-2" />
            </Link>
            <Link href="https://facebook.com">
              <img
                src="/facebook.png"
                alt="facebook"
                className="max-h-8 pr-2"
              />
            </Link>
            <Link href="https://telegram.org">
              <img
                src="/Telegram.png"
                alt="Telegram"
                className="max-h-8 pr-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
