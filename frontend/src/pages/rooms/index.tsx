import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Rooms {
  name: string;
  id: number;
}

const allRooms: React.FC = () => {
  // fetch room names
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const dataFetch = async () => {
    const data = await (await fetch("/api/rooms")).json();
    setRooms(data);
    console.log(data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  // delete
  const handleDelete = async (roomId: number) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "DELETE",
      });
      if (response.status === 400 || response.status === 403) {
        toast.error((await response.json()).error);
      } else {
        toast.success("Room has successfully deleted");
        dataFetch();
      }
    } catch (error: any) {
      toast.error(JSON.stringify(error));
    }
  };

  // ---- Form SUBMIT
  // select tag:
  const options = ["one-one chat", "group chat"];
  // name for add a name to the room - input field
  const [name, setRoomName] = useState("");
  // group to choose the type of the group - select tag
  const [group, setOption] = useState(0);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const optionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log("User Selected Value - ", event.target.selectedIndex);
    setOption(event.target.selectedIndex);
  };

  // send the choosen and given datas to the server
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name === "") {
      toast.warn("Please give a title!");
    } else {
      try {
        const response = await fetch("/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, group }),
        });
        console.log(name);
        console.log(group);
        if (response.status === 400) {
          toast.error((await response.json()).error);
        } else {
          toast.success("Room " + name + " successfully created");
          setRoomName("");
          dataFetch();
        }
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" limit={1} autoClose={900} />
      <form>
        <h1>create a new room</h1>
        <input
          value={name}
          onChange={handleName}
          className="shadow appearance-none border rounded-[8px] w-full py-2 pl-3 pr-8 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
          type="text"
          placeholder="Name of your new room"
        />
        <label>Choose the type of the group </label> <br />
        <select className="bg-greenFox" onChange={optionHandler}>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <button
          onClick={handleSubmit}
          className="bg-greenFox hover:bg-[#387354] text-whiteFox py-1  rounded-full w-full text-center"
          type="submit"
        >
          Create a new Room
        </button>
      </form>
      <ul>
        {rooms.map((room) => {
          return (
            <li>
              <a href={"/rooms/" + room.id}>{room.name}</a>
              <button
                onClick={() => handleDelete(room.id)}
                className="bg-greenFox hover:bg-[#387354] text-whiteFox py-2  rounded-full text-center"
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/*
  return (
    <div>
      <ul>
        {rooms.map((room) => {
          return <a href={"/rooms/" + room.id}>{room.name}</a>;
        })}
      </ul>
    </div>
  );
  */

export default allRooms;
