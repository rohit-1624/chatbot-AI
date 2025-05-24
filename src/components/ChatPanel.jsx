import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ChatPanel = () => {
  const [messages, setMessages] = useState([
    {
      from: "customer",
      text:
        "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.",
      time: "1min",
    },
    {
      from: "agent",
      text: "Let me just look into this for you, Luis.",
      time: "1min",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    const m = now.getMinutes();
    return `${m < 10 ? "0" : ""}${m}min`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "agent", text: input.trim(), time: getCurrentTime() },
    ]);
    setInput("");
  };

  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="text-sm font-medium text-gray-900">Luis Easton</div>
        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-200 rounded">
            <i className="ri-more-line text-black cursor-pointer"></i>
          </div>
          <div className="p-1 bg-slate-200 rounded">
            <i className="ri-moon-clear-fill text-black cursor-pointer"></i>
          </div>
          <button className="px-2 py-1 bg-black rounded text-white text-sm flex items-center">
            <i className="ri-close-circle-fill mr-1 text-lg"></i> Close
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-white min-h-0">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`max-w-full sm:max-w-lg px-4 py-3 rounded-xl text-sm shadow-sm flex flex-col ${
              msg.from === "agent"
                ? "bg-indigo-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            <p className="mb-1 text-gray-800">{msg.text}</p>
            <div className="flex justify-end text-xs text-gray-400">
              {msg.from === "agent" && <span className="mr-1">Seen</span>}
              <span>{msg.time}</span>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <div className="bg-white px-4 py-3 shadow-inner md:shadow-lg md:w-[80%] md:mb-2 md:mx-auto w-full">
        <div className="flex items-center justify-between mt-2 mb-2">
          <span className="text-sm font-medium text-gray-900">
            <i className="ri-message-2-fill mr-1"></i>
            Chat
            <i className="ri-arrow-down-s-line pl-1"></i>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Use ⌘K for shortcuts"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            aria-label="Send message"
            className="bg-indigo-600 p-2 rounded-md hover:bg-indigo-700 transition"
          >
            <i className="ri-send-plane-fill text-white text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
