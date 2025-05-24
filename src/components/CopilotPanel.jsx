"use client";
import { useState } from "react";

const CopilotPanel = () => {
  const [activeTab, setActiveTab] = useState("copilot");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const aiReply = getAutoReply(text);
      setMessages([...newMessages, { role: "ai", text: aiReply }]);
    }, 600);
  };

  const getAutoReply = (question) => {
    if (question.toLowerCase().includes("refund")) {
      return "To get a refund, go to your orders, select the item and click 'Request Refund'.";
    }
    return "I'm here to help! Please clarify your question.";
  };

  return (
    <div className="w-full md:w-[380px] flex flex-col h-full border-l bg-white">
      {/* Tabs */}
      <div className="flex border-b h-14">
        {["copilot", "details"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-sm font-medium ${activeTab === tab
                ? "border-b-2 font-bold border-blue-600 text-blue-600"
                : "text-gray-500"
              }`}
          >
            {tab === "copilot" ? "AI Copilot" : "Details"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto max-h-[100vh]">
        {activeTab === "copilot" ? (
          <>
            <div className={`${messages.length === 0 ? "bg-linear-to-br from-violet-400 to-fuchsia-200" : "bg-white" }p-4 space-y-3 overflow-y-auto flex-1`}>
              {messages.length === 0 ? (
                <div className="text-center mt-10 text-gray-600">
                  <div className="text-4xl mb-3">🤖</div>
                  <p className="text-sm font-semibold">Hi, I’m Fin AI Copilot</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Ask me anything about this conversation.
                  </p>

                  <div className="mt-65 bg-white w-[80%] ml-4 pl-4 p-2 text-left rounded text-sm text-gray-600">
                    💡 Suggested:{" "}
                    <span
                      className="text-black font-medium cursor-pointer hover:underline"
                      onClick={() => handleSend("How do I get a refund?")}
                    >
                      How do I get a refund?
                    </span>
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[90%] px-3 py-2 m-3 rounded-lg text-sm text-gray-800 ${msg.role === "user"
                        ? "ml-auto bg-blue-300 text-right"
                        : "mr-auto bg-slate-300"
                      }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-3">
              <div className="flex items-center gap-2 border px-3 py-2 rounded-md">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  className="flex-1 text-sm text-gray-700 placeholder:text-gray-600 outline-none"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="text-gray-900 text-lg font-medium"
                >
                  <i className="ri-arrow-up-line"></i>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-800 p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Assignee</span>
              <div className="flex items-center gap-2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="avatar"
                  className="w-5 h-5 rounded-full"
                />
                <span>Brian Byrne</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Team</span>
              <div className="flex items-center gap-1">
                <i className="ri-group-fill text-gray-500" />
                <span>Unassigned</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-3">
              <div className="text-xs text-gray-500 mb-1">LINKS</div>
              <div className="space-y-2">
                {[
                  { label: "Tracker ticket", icon: "ri-link" },
                  { label: "Back-office tickets", icon: "ri-archive-line" },
                  { label: "Side conversations", icon: "ri-share-forward-line" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <i className={`${item.icon} text-gray-500`} />
                      <span>{item.label}</span>
                    </div>
                    <button className="w-6 h-6 rounded-lg bg-gray-200 text-xs font-bold text-gray-700 flex items-center justify-center">
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>


            <div className="pt-4 space-y-2">
              {[
                "User Data",
                "Conversation Attributes",
                "Company Details",
                "Salesforce",
                "Stripe",
                "Jira for Tickets",
              ].map((title, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer"
                >
                  <span>{title}</span>
                  <i className="ri-arrow-down-s-line text-gray-500 text-lg"></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CopilotPanel;
