import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Messages {
  id: number;
  content: string;
  name: string;
}

const singleRoom: React.FC = () => {
  const router = useRouter();

  // messages in the room
  const [messages, setMessages] = useState<Messages[]>([]);
  const [roomName, setName] = useState("");

  const dataFetch = async () => {
    //console.log(`/api/rooms/${router.query.roomId}`);
    const data = await (
      await fetch(`/api/rooms/${router.query.roomId}`)
    ).json();
    setMessages(data);
    //console.log(data[0].name);
  };

  const roomNameFetch = async () => {
    //console.log(`/api/rooms/${router.query.roomId}`);
    const data = await (
      await fetch(`/api/rooms/name/${router.query.roomId}`)
    ).json();
    setName(data.name)
    // console.log(data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    dataFetch();
    roomNameFetch();
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
      <ToastContainer position="top-center" limit={1} autoClose={1000} />
      <h1>details about {roomName}</h1>

      <form>
        <h1>post new message</h1>

        <textarea
          value={content}
          onChange={handleContent}
          placeholder="Your message"
          rows={5}
          cols={30}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="bg-greenFox hover:bg-[#387354] text-whiteFox py-1  rounded-full w-full text-center"
          type="submit"
        >
          POST
        </button>
      </form>

      <ul>
        {messages.map((message) => {
          return (
            <li>
              {message.content}
              <button
                onClick={() => handleDelete(message.id)}
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
        <input
          value={content}
          onChange={handleContent}
          className="shadow appearance-none border rounded-[8px] w-full py-2 pl-3 pr-8 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
          type="textarea"
          placeholder="Content"
        />
        */

export default singleRoom;
