import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invitations: React.FC = () => {
  interface Invitations {
    id: number;
    room_id: number;
    name: string;
  }

  const [invitations, setInvitations] = useState<Invitations[]>([]);

  // fetch rooms
  const roomNameFetch = async () => {
    //console.log(`/api/rooms/${router.query.roomId}`);
    const data = await (await fetch("/api/invitations")).json();
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
      if (response.status === 400) {
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
    <div>
      <ToastContainer position="top-center" limit={1} autoClose={1000} />
      <h1>invitations</h1>

      <ul>
        {invitations.map((invitation) => {
          return (
            <li>
              {invitation.name}
              <button
                onClick={() => handleAccept(invitation.room_id, invitation.id)}
                className="bg-greenFox hover:bg-[#387354] text-whiteFox py-2  rounded-full text-center"
              >
                accept invitation
              </button>
              <button
                onClick={() => handleDelete(invitation.id)}
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

export default Invitations;
