import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invitations: React.FC = () => {
  interface Invitations {
    id: number;
    room_id: number;
    name: string;
    host: string;
  }

  const [invitations, setInvitations] = useState<Invitations[]>([]);

  // fetch rooms
  const roomNameFetch = async () => {
    const response = await fetch("/api/invitations");
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    }
    setInvitations(data);
    console.log(data);
  };

  useEffect(() => {
    roomNameFetch();
  }, []);

  // delete buttons
  const handleDelete = async (invitationId: number) => {
    try {
      const response = await fetch(`/api/invitations/${invitationId}`, {
        method: "DELETE",
      });
      if (response.status === 400) {
        toast.error((await response.json()).error);
      } else {
        toast.success("Invitation has successfully deleted");
        roomNameFetch();
      }
    } catch (error: any) {
      toast.error(JSON.stringify(error));
    }
  };

  // accept buttons
  const handleAccept = async (roomId: number, invitationId: number) => {
    try {
      const response = await fetch(`/api/invitations/accept/${invitationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId }),
      });
      if (response.status === 401) {
        toast.error((await response.json()).error);
      } else if (response.status === 400) {
        toast.error((await response.json()).error);
      } else {
        toast.success("Invitation has been successfully sent");
        roomNameFetch();
      }
    } catch (error: any) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <div className="container m-auto grid grid-cols-[20%_minmax(50%,_1fr)_30%]">
      <ToastContainer position="top-center" limit={1} autoClose={1000} />

      <div className="border-x-[3px] border-borderGrey">
        <div className="flex">
          <div className="m-[30px] h-8 w-8">
            <a href="/">
              <img alt="back" src="/back.png" />
            </a>
          </div>

          <div className="flex items-center">
            <div className="font-bold text-darkFox text-lg">invitations</div>
          </div>
        </div>

        {invitations.map((invitation) => {
          return (
            <div className="flex justify-between items-center pl-5 pt-3 pb-3 border-b-[3px] border-borderGrey font-medium text-darkFox text-lg">

<div>
              {invitation.name}
              <span className="text-sm text-lightGray justify-start"> sent by <a href="/" className="text-darkFox underline">{invitation.host}</a></span>
              </div>

              <div>
                <button
                  onClick={() =>
                    handleAccept(invitation.room_id, invitation.id)
                  }
                  className="text-sm font-medium bg-greenFox hover:bg-[#387354] text-whiteFox py-1 rounded-full text-center px-[10px] mr-3"
                >
                  accept invitation
                </button>
                <button
                  onClick={() => handleDelete(invitation.id)}
                  className="text-sm font-medium bg-stone-300 text-whiteFox py-1 rounded-full text-center px-[10px] mr-3"
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Invitations;
