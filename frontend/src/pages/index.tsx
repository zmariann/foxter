import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the shape of the fox data
interface Fox {
  id: number;
  content: string;
  created_at: Date;
}

interface User {
  name: string;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const FoxForm: React.FC = () => {
  // State to store the text input value
  const [text, setText] = useState("");

  // State to store the foxes data
  const [foxes, setFoxes] = useState<Fox[]>([]);

  // Function to fetch the foxes data from the API
  const fetchFoxes = async () => {
    // Fetch the foxes data from the API
    const response = await fetch("/api/foxes");
    // Update the foxes state with the response data
    setFoxes(await response.json());
    // Log the foxes data in the console for debugging purposes
    console.log(foxes);
  };

  // Use effect hook to fetch the foxes data when the component is mounted
  useEffect(() => {
    fetchFoxes();
  }, []);

  // Function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submit behavior
    event.preventDefault();
    try {
      // Send a POST request to the API to create a new fox
      const response = await fetch("/api/foxes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(await response.text());
      }
      // Clear the text input
      setText("");
      // Fetch the updated foxes data
      fetchFoxes();
    } catch (error) {
      // Log the error in the console for debugging purposes
      console.error(error);
    }
  };

  // Function to handle the deletion of a fox
  const handleDelete = async (id: number) => {
    try {
      // Send a DELETE request to the API to delete a fox
      const response = await fetch(`/api/foxes/${id}`, {
        method: "DELETE",
      });
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(await response.text());
      }
      // Fetch the updated foxes data
      fetchFoxes();
    } catch (error) {
      // Log the error in the console for debugging purposes
      console.error(error);
    }
  };



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
    <>
      <div className="flex" >
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
      <div className={`60vw h-screen bg-whiteFox`}>
        <div
          style={{
            display: "flex",
            height: "20vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Form for submitting a fox post */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              style={{ padding: "10px", fontSize: "18px" }}
            />
            {/* Submit button for posting the fox */}
            <button
              type="submit"
              style={{ marginLeft: "10px", padding: "10px", fontSize: "18px" }}
            >
              Post a fox
            </button>
          </form>
        </div>

        {/* || Render Foxes and Delete Button */}
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* Display "No foxes to show. Post one!" message when foxes array is empty */}
            {foxes.length === 0 ? (
              <p style={{ textAlign: "center" }}>No foxes to show. Post one!</p>
            ) : (
              <ul style={{ listStyle: "none", textAlign: "center" }}>
                {/* Map through foxes array and render fox content and delete button */}
                {foxes.map((fox) => {
                  return (
                    <li key={fox.id} style={{ margin: "20px 0" }}>
                      {fox.content}
                      <span style={{ marginLeft: "10px" }}></span>
                      {/* Delete Button */}
                      <button onClick={() => handleDelete(fox.id)}>Delete</button>
                      <button onClick={() => handleFollowing(.id)}>Delete</button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={`vw20 h-screen bg-white p-8`}> 
        <div>
          <input className="focus:ring-2 focus:ring-greenFox-300" type="text" placeholder="Search foxes" p-8/>
        </div>
        <div  className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5">
          Trends
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-whiteFox shadow-md p-5 mt-5">
          Who to follow
        </div>
        <div className="w-full max-w-md m-auto rounded-2xl bg-white p-5 mt-5">
          Footer
        </div>
      </div>
      </div>;
    </>
  );
};

const Navigation: React.FC<User> = ({
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
}) => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/Messages">
            <a>Messages</a>
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={onLogoutClick}>Logout</button>
          </li>
        ) : (
          <li>
            <button onClick={onLoginClick}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default FoxForm;
