import React, { useEffect, useState } from "react";

export default function RightBar() {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const fetchData = (value) => {
    fetch("/api/foxes")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((fox) => {
          return (
            fox && fox.content && fox.content.toLowerCase().includes(value)
          );
        });
        console.log(results);
        setSearchResult(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.length < 3) {
      setSearchResult([]);
    } else {
      fetchData(value);
    }
  };

  return (
    <>
      <div className={`w-3/12 h-screen bg-white mt-4 px-2`}>
        <div className="flex items-center">
          <img src="Search"></img>
          <input
            className="focus:ring-2 focus:ring-offset-lime-300 outline-none rounded-2xl w-full pl-5 p-5"
            type="text"
            placeholder="Search foxes"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5 flex-col place-items-center">
          <img src="logo"></img> Foxter
          {input.length > 0 && input.length < 3 ? (
            <div>Enter at least 3 characters</div>
          ) : (
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
