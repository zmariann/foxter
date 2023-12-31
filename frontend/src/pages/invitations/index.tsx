import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmDialog, showDialog } from "@/components/confirmDialog";
import Link from 'next/link'

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

      <div className="border-x-[3px] border-borderGrey">
        <div className="flex">
          <div className="m-[30px] h-8 w-8">
            <Link href="/">
              <img alt="back" src="/back.png" />
            </Link>
          </div>

          <div className="flex items-center">
            <div className="font-bold text-darkFox text-lg">invitations</div>
          </div>
        </div>
        <ConfirmDialog />
        {invitations.map((invitation) => {
          return (
            <div className="flex justify-between items-center pl-5 pt-3 pb-3 border-b-[3px] border-borderGrey font-medium text-darkFox text-lg">
              <div>
                {invitation.name}
                <span className="text-sm text-lightGray justify-start">
                  {" "}
                  sent by{" "}
                  <Link href={`/profiles/${invitation.host}`} className="text-darkFox underline">
                    {invitation.host}
                  </Link>
                </span>
              </div>

              <div>
                <button
                  onClick={() =>
                    showDialog({
                      type: "invitationAccept",
                      content: invitation.name,
                      onYes: () =>
                        handleAccept(invitation.room_id, invitation.id),
                      onNo: () => {},
                    })
                  }
                  className="text-sm font-medium bg-greenFox hover:bg-[#387354] text-whiteFox py-1 rounded-full text-center px-[10px] mr-3 mb-3"
                >
                  accept invitation
                </button>
                <button
                  onClick={() =>
                    showDialog({
                      type: "invitationDelete",
                      content: invitation.name,
                      onYes: () => handleDelete(invitation.id),
                      onNo: () => {},
                    })
                  }
                  className="text-sm font-medium bg-stone-300 text-whiteFox py-1 rounded-full text-center px-[10px] mr-3"
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

  );
};

export default Invitations;
