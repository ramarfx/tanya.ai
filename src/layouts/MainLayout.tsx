import GenerativeAIComponent from "@/components/GenerativeAI";
import Sidebar from "@/components/Sidebar";
import { useState, useRef } from "react";

const MainLayout = () => {
  const [messages, setMessages] = useState<{ text: string; type: 'user' | 'ai' }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (message: string, aiResponse: string) => {
    // Tambahkan pesan pengguna ke dalam state
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, type: 'user' },
      { text: aiResponse, type: 'ai' }
    ]);

    // Scroll ke bagian bawah
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen w-full px-10 pb-10 relative bg-[#DCEEFF] flex flex-row pl-[300px]">
      <Sidebar />

      <main className="w-full h-full flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`py-2 px-4 rounded-lg max-w-xl break-words ${message.type === 'user' ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <GenerativeAIComponent onSend={handleSend} />

      </main>
    </section>
  );
};

export default MainLayout;
