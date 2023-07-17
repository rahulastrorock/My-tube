import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { useSelector } from "react-redux";
import { generateRandomMessage, generateRandomName } from "../utils/helper";
import { useState } from "react";
const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const chatMessage = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      //API Polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMessage(20),
        })
      );
    }, 1500);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="w-full h-[438px] ml-2 p-1 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
          {chatMessage.map((c, index) => (
            <ChatMessage key={index} name={c.name} message={c.message} />
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addMessage({ name: "Rahul Singh", message: liveMessage }));
          setLiveMessage("");
        }}
      >
        <input
          type="text"
          className="w-[287px] h-10 px-2 border-l border-t border-b border-black rounded-l ml-2"
          placeholder="Type your message here..."
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="bg-black text-white w-20 h-10 rounded-r ">
          Send
        </button>
      </form>
    </>
  );
};

export default LiveChat;
