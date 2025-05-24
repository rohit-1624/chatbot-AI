import InboxList from "./InboxList";
import ChatPanel from "./ChatPanel";
import CopilotPanel from "./CopilotPanel";

const InboxLayout = () => {
  return (
<div className="flex flex-col md:flex-row w-full h-screen">
      <InboxList />
      <ChatPanel />
      <CopilotPanel />
    </div>
  );
};

export default InboxLayout;
