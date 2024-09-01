import Sidebar from "@/components/Sidebar";
import Messages from "@/components/ui/Message";
import { useState, useRef } from "react";

const MainLayout = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (message: string) => {
    setMessages([...messages, message]);
  };

  return (
    <section className="h-screen w-full px-10 pb-10 relative bg-[#DCEEFF] flex flex-row pl-[300px]">
      <Sidebar />

      <main className="w-full h-full flex flex-col">
        <Messages ref={messagesEndRef} messages={messages} onSend={handleSend} />
      </main>
    </section>
  );
};

export default MainLayout;
