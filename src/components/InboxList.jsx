import { useState } from "react";
import "remixicon/fonts/remixicon.css";

function getRandomColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 70%)`;
}

const InboxList = () => {
  const [selected, setSelected] = useState(0);

  const chats = [
    {
      name: "Luis Easton",
      message: "Hey! I have a question...",
      time: "45m",
      unread: false
    },
    {
      name: "Ivan Nike",
      message:
        "Hi there, I have a qu...",
      time: "30m",
      unread: true
    },
    {
      name: "Lead from New York",
      message: "Good morning, let me...",
      time: "40m", unread: true
    },
    {
      name: "Booking API problems",
      message: "Bug report",
      time: "45m",
      unread: false
    },
    {
      name: "Sneha Desai",
      message: "Hey there, I’m here to...",
      time: "45m",
      unread: false
    },
  ];

  return (
    <div className="w-full md:w-89 h-full border-r bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between text-gray-800 font-semibold text-base">
        <h2>Your Inbox</h2>
        <i className="ri-more-line text-gray-400 cursor-pointer"></i>
      </div>

      {/* Filter Row */}
      <div className="px-4 py-2 flex justify-between text-sm text-gray-900">
        <span className="cursor-pointer">5 Open <i className="ri-arrow-down-s-line pl-1"></i></span>
        <span className="cursor-pointer">Waiting longest <i className="ri-arrow-down-s-line pl-1"></i></span>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`relative cursor-pointer px-4 py-3 flex flex-col gap-1 border-b hover:bg-gray-100 ${selected === index ? "bg-indigo-100" : "bg-white"
              }`}
            onClick={() => setSelected(index)}
          >
            {/* Circle with initial letter */}
            <div
              className="absolute left-3 top-3 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: getRandomColor(chat.name), color: "#333" }}
            >
              {chat.name.charAt(0).toUpperCase()}
            </div>

            {/* Chat Content */}
            <div className="ml-10">
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium ${selected === index ? "text-black font-bold" : "text-gray-700"
                    }`}
                >
                  {chat.name}
                </span>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="truncate max-w-[140px] sm:max-w-[180px]">{chat.message}</span>
                {chat.unread && (
                  <i className="ri-circle-fill text-indigo-500 text-[8px] ml-1"></i>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shadow-md bg-gray-100 w-full px-4 py-2 flex gap-3 justify-start">
        <div className="p-1 rounded cursor-pointer bg-gray-200" title="Inbox">
          <i className="ri-layout-left-fill text-gray-700 text-lg"></i>
        </div>
        <div className="p-1 rounded cursor-pointer" title="Settings">
          <i className="ri-menu-fill text-gray-500 text-lg"></i>
        </div>
      </div>
    </div>
  );
};

export default InboxList;
