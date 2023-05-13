import {ConfirmDialog, showDialog} from "@/components/confirmDialog";
import React, { useEffect, useState } from "react";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Rooms {
  name: string;
  id: number;
  rooms_group: number;
}

const allRooms: React.FC = () => {
  // fetch room names
  const [rooms, setRooms] = useState<Rooms[]>([]);

  const dataFetch = async () => {
    const response = await fetch("/api/rooms");
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    }
    setRooms(data);
    console.log(data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

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
    console.log("User Selected Value - ", event.target.selectedIndex);
    setOption(event.target.selectedIndex);
  };

  // delete
  const handleDelete = async (roomId: number) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "DELETE",
      });
      if (response.status === 400 || response.status === 403) {
        let error = (await response.json()).error;
        console.log(error);
        toast.error(error, {
          autoClose: 1500,
          position: "top-center",
          transition: Flip,
        });
      } else {
        toast.success("Room has successfully deleted", {
          autoClose: 900,
          position: "top-center",
          transition: Flip,
        });
        dataFetch();
      }
    } catch (error: any) {
      toast.error(JSON.stringify(error), {
        autoClose: 900,
        position: "top-center",
      });
    }
  };

  // send datas to the server
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name === "") {
      toast.warn("Please give a title!", {
        autoClose: 900,
        position: "top-center",
      });
    } else {
      try {
        const response = await fetch("/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, group }),
        });
        if (response.status === 400) {
          toast.error((await response.json()).error, {
            autoClose: 900,
            position: "top-center",
          });
        } else if (response.status === 401) {
          toast.error("You have to log in to create a new room", {
            autoClose: 900,
            position: "top-center",
          });
        } else {
          toast.success("Room " + name + " successfully created", {
            autoClose: 900,
            position: "top-center",
          });
          setRoomName("");
          dataFetch();
        }
      } catch (error: any) {
        toast.error(JSON.stringify(error), {
          autoClose: 900,
          position: "top-center",
        });
      }
    }
  };



  return (
      <div className="border-x-[3px] border-borderGrey">
        <div className="flex">
          <div className="m-[30px] h-8 w-8">
            <a href="/">
              <img alt="back" src="/back.png" />
            </a>
          </div>

          <div className="flex items-center">
            <div className="font-bold text-darkFox text-lg">Rooms</div>
          </div>
        </div>

        <form className="border-b-[3px] border-borderGrey">
          <h1 className="text-sm text-darkFox font-medium pl-[17px]">
            Create a new room
          </h1>

          <div className="flex justify-between">
            <div>
              <input
                value={name}
                onChange={handleName}
                className="mt-2 mb-3 text-sm shadow appearance-none border rounded-[8px] py-1 pl-3 pr-3 text-lightGray bg-whiteFox leading-tight w-[190px] focus:outline-none focus:shadow-outline ml-[15px]"
                type="text"
                placeholder="Give a name to your room"
              />
              <select
                className="text-sm shadow border rounded-[8px] w-[118px] py-[2px] pl-2 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline ml-[15px]"
                onChange={optionHandler}
              >
                {options.map((option) => {
                  return <option>{option}</option>;
                })}
              </select>
            </div>

            <div className="mt-2 mb-3">
              <button
                onClick={handleSubmit}
                className="text-sm font-medium bg-greenFox hover:bg-[#387354] text-whiteFox py-1 rounded-full text-center px-[10px] mr-3"
                type="submit"
              >
                Create a new Room
              </button>
            </div>
          </div>
        </form>
        <ConfirmDialog />
        {rooms.map((room) => {
          return (
            <div className="flex justify-between items-center pl-5 pt-3 pb-3 border-b-[3px] border-borderGrey">
              <div>
                <a
                  className="font-bold text-darkFox text-lg"
                  href={"/rooms/" + room.id}
                >
                  {room.name}
                </a>

                <p className="text-sm text-lightGray">
                  {room.rooms_group === 0 && <p>one-one chat</p>}
                  {room.rooms_group === 1 && <p>group chat</p>}
                </p>
              </div>
              
              <div>
                <button
                  onClick={() => showDialog({type: "deleteRoom", content: room.name, onYes: () => handleDelete(room.id), onNo: () =>{}})}
                  className="text-sm font-medium bg-stone-300 text-whiteFox py-1 rounded-full text-center px-[10px] mr-3"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
  );
};

export default allRooms;
