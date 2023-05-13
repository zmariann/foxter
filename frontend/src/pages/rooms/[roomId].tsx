import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/fluent-light/theme.css";
import { ConfirmDialog, showDialog } from "@/components/confirmDialog";

const singleRoom: React.FC = () => {
  interface Messages {
    id: number;
    content: string;
    name: string;
  }

  const router = useRouter();

  // messages in the room
  const [messages, setMessages] = useState<Messages[]>([]);

  const dataFetch = async () => {
    const response = await fetch(`/api/rooms/${router.query.roomId}`);
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    }
    setMessages(data);
  };

  // show the name of the room
  const [roomName, setName] = useState("");
  const roomNameFetch = async () => {
    const response = await fetch(`/api/rooms/name/${router.query.roomId}`);
    const data = await response.json();
    setName(data.name);
  };

  // show participants in this room
  interface Participants {
    name: string;
  }
  const [participants, setparticipants] = useState<Participants[]>([]);
  const participantsFetch = async () => {
    //console.log(`/api/rooms/${router.query.roomId}`);
    const data = await (
      await fetch(`/api/participants/${router.query.roomId}`)
    ).json();
    setparticipants(data);
    console.log(data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    dataFetch();
    roomNameFetch();
    participantsFetch();
  }, [router.isReady]);

  // post a new message
  const [content, setContent] = useState("");
  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (content === "") {
      toast.warn("Please enter all the fields");
    } else {
      try {
        //console.log(`/api/rooms/${router.query.roomId}`);
        const response = await fetch(`/api/messages/${router.query.roomId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });
        if (response.status === 400) {
          toast.error((await response.json()).error);
        } else {
          toast.success("Message successfully sent");
          setContent("");
          dataFetch();
        }
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  // delete buttons
  const handleDelete = async (messageId: number) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      if (response.status === 400) {
        toast.error((await response.json()).error);
      } else {
        toast.success("Message successfully deleted");
        dataFetch();
      }
    } catch (error: any) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
      <div>
        {/*header*/}
        <div className="flex">
          <div className="m-[30px] h-8 w-8">
            <a href="/rooms">
              <img alt="back" src="/back.png" />
            </a>
          </div>

          <div className="flex items-center">
            <div>
              <div className="font-bold text-darkFox text-lg">{roomName}</div>
              {/*invitation*/}
              <div className="text-sm text-lightGray">
                <div className="text-sm text-darkFox">
                  <a href={"/invitations/" + router.query.roomId}>
                    Send invitation to {roomName}
                  </a>
                </div>
                Participants:{" "}
                {participants.map((participant, index) => {
                  return participants.length === index + 1 ? (
                    <span>{participant.name}</span>
                  ) : (
                    <span>{participant.name}, </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/*content*/}

        <div className="overflow-auto bg-borderGrey rounded-3xl flex flex-col-reverse h-[400px]">
        <ConfirmDialog/>
          {messages.map((message) => {
            return (
              <div className=" text-darkFox mx-5 my-4 border-b-2 border-stone-300 scroll-smooth">
                <div className="flex items-center">
                  <div className="mr-[10px]">
                    <img alt="back" src="/profile.png" />
                  </div>

                  <div className="font-bold text-darkFox text-lg">
                    {message.name}
                  </div>
                </div>
                <div className="mt-2">{message.content}</div>
                <div className="flex justify-end">
                  <button
                    onClick={() => showDialog({type: "thisMessage", content: "", onYes: () => handleDelete(message.id), onNo: () =>{}})}
                    className="text-sm font-medium bg-stone-300 text-whiteFox py-1 rounded-full text-center px-[10px] mt-3 mb-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/*post a message*/}
        <div className="mt-3">
          <form>
            <textarea
              value={content}
              onChange={handleContent}
              placeholder="Your message"
              rows={5}
              cols={30}
              className="focus:outline-0 block p-2.5 w-full h-[100px] text-sm text-darkFox bg-borderGrey rounded-lg placeholder-lightGray"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="tracking-wide text-xl font-medium bg-greenFox hover:bg-[#387354] text-whiteFox py-1 rounded-full text-center px-[10px] mr-5 mt-3 mb-5"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default singleRoom;
