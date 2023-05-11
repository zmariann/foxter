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
        <div className="flex-1">
          <a
            href=""
            className=" text-2xl font-medium rounded-full text-white hover:bg-blue-800 hover:text-blue-300 float-right"
            target="_blank"
          >
            <svg
              className="m-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
              </g>
            </svg>
          </a>
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
              {foxes.map((fox) => {
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
