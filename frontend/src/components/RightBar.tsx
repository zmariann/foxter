import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

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

  return (
    <>
      <div className={`w-3/12 h-screen bg-white mt-4 px-2`}>
        <div className="flex items-center">
          <img src="Search"></img>
          <input
            className="focus:ring-2 focus:ring-offset-lime-300 outline-none rounded-2xl w-full pl-5 p-5"
            type="text"
            placeholder="Search foxes"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5 flex-col place-items-center">
          <img src="logo"></img> Foxter
          {search.length > 0 && search.length < 3 ? (
            <div>Enter at least 3 characters</div>
          ) : (
            search.length >= 3 &&
            searchResult.map((result) => {
              return <div key={result.id}>{result.content}</div>;
            })
          )}
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5">
          Who to follow
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-white p-5 mt-5">
          Footer
        </div>
      </div>
    </>
  );
}
