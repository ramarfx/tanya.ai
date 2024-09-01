import GenerativeAIComponent from "@/components/GenerativeAI";
import Sidebar from "@/components/Sidebar";
import { useState, useRef } from "react";

const MainLayout = () => {
  const [messages, setMessages] = useState<{ text: string; type: 'user' | 'ai' }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async (message: string) => {
    // Add user message
    setMessages(prevMessages => [...prevMessages, { text: message, type: 'user' }]);

    // Fetch AI response
    try {
      const response = await fetch('/api/ai', { // Adjust this to your API endpoint if different
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });
      const data = await response.json();
      setMessages(prevMessages => [
        ...prevMessages,
        { text: data.response || 'No response from AI', type: 'ai' }
      ]);
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error: Unable to fetch AI response', type: 'ai' }
      ]);
    }

    // Scroll to the bottom
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
