import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendInvitations: React.FC = () => {
  interface User {
    id: number;
    name: string;
  }

  const router = useRouter();

  // get users
  const [users, setUsers] = useState<User[]>([]);
  // get user id
  const [invitedUserId, setinvitedUserId] = useState(0);

  const optionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setinvitedUserId(0);
    const selectedIndex = event.target.options.selectedIndex;
    const content =
      event.target.options[selectedIndex].getAttribute("data-key");
    if (content !== null) {
      //console.log("OPTION", event.target.options[selectedIndex].getAttribute("data-key"));
      const result: number = parseInt(content);
      setinvitedUserId(result);
    }
  };

  // show the name of the room
  const [roomName, setName] = useState("");
  const roomNameFetch = async () => {
    const response = await fetch(`/api/rooms/name/${router.query.roomId}`);
    const data = await response.json();
    //console.log(data);
    setName(data.name);
  };

  const dataFetch = async () => {
    const response = await fetch(`/api/invitations/users`);
    const data = await response.json();
    setUsers(data);
    //console.log(data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    dataFetch();
    roomNameFetch();
  }, [router.isReady]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (invitedUserId === 0) {
      toast.warn("Choose a user!");
    } else {
      try {
        const response = await fetch(
          `/api/invitations/${router.query.roomId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ invitedUserId }),
          }
        );
        if (response.status === 400) {
          toast.error((await response.json()).error);
        } else if (response.status === 401) {
          toast.error("You have to log in to send an invitation");
        } else if (response.status === 403) {
          toast.error((await response.json()).error);
        } else {
          toast.success("Invitation has been successfully sent");
        }
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  return (
    <div className="container m-auto grid grid-cols-[20%_minmax(50%,_1fr)_30%]">
      <ToastContainer position="top-center" limit={1} autoClose={1000} />
      <div className="border-x-[3px] border-borderGrey">
        <div className="flex">
          <div className="m-[30px] h-8 w-8">
            <a href={"/rooms/" + router.query.roomId}>
              <img alt="back" src="/back.png" />
            </a>
          </div>

          <div className="flex items-center">
            <div className="font-bold text-darkFox text-lg">{roomName}</div>
          </div>
        </div>

        <div className="flex justify-start border-b-[3px] border-borderGrey pb-10 pl-[75px]">
          <select
            className="text-sm shadow border rounded-[8px] w-[118px] py-[2px] px-[3px] text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline ml-[15px]"
            onChange={optionHandler}
          >
            <option>Choose a user</option>
            {users.map((user) => (
              <option data-key={user.id}>{user.name}</option>
            ))}
          </select>

          <button
            className="text-sm font-medium bg-greenFox hover:bg-[#387354] text-whiteFox py-1 rounded-full text-center px-[10px] ml-3"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendInvitations;
