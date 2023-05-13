import { useEffect } from "react";
import PostAFox from "./PostAFox";
import Fox from "./Fox";
import { betterFetch } from "@/utils/utils";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function HomePage() {
  const foxes = useStoreState((state) => state.foxes);
  const setFoxes = useStoreActions((actions) => actions.setFoxes);
  const deleteFox = useStoreActions((actions) => actions.deleteFox);

  // Function to fetch the foxes data from the API
  const fetchFoxes = async () => {
    // Fetch the foxes data from the API
    const response = await betterFetch("/api/foxes");
    // Update the foxes state with the response data
    setFoxes(response);
    // console.log(await response.json());
    // Log the foxes data in the console for debugging purposes
    console.log(foxes);
  };

  // Use effect hook to fetch the foxes data when the component is mounted
  useEffect(() => {
    fetchFoxes();
  }, []);

  const onDeleteFox = (id: number) => {
    deleteFox(id);
  };

  return (
    <div className="px-4">
      <div className="flex py-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">Home</h2>
        </div>
      </div>
      <div className="flex">
        <PostAFox onRefresh={fetchFoxes} />
      </div>
      <div>
        <div className="flex w-full">
          {/* Display "No foxes to show. Post one!" message when foxes array is empty */}
          {foxes.length === 0 ? (
            <p>No foxes to show. Post one!</p>
          ) : (
            <div className="flex flex-col w-full">
              {/* Map through foxes array and render fox content and delete button */}
              {foxes.map((fox: any) => {
                return <Fox key={fox.id} fox={fox} onDeleteFox={onDeleteFox} />;
              })}
              {/* <button onClick={() => handleDelete(fox.id)} className="absolute right-1 top-1 w-5 h-10 p-1 bg-red-500 rounded-tr-2xl"><p>x</p></button>
              <button onClick={() => handleFollowing(fox.userId)} className="absolute right-1 bottom-1 w-5 p-1 bg-blue-400 rounded-br-2xl h-10"><p>f</p></button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
