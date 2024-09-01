import { useState, useRef, useEffect } from "react";
import GenerativeAIComponent from "@/components/GenerativeAI";
import Sidebar from "@/components/Sidebar";

// Define a type for the messages
type MessageType = {
  text: string;
  type: 'user' | 'ai';
};

const MainLayout = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [typingMessage, setTypingMessage] = useState<MessageType | null>(null); // For typing effect
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (message: string, aiResponse: string) => {
    // Add user's message to the state
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, type: 'user' }
    ]);

    // Add AI typing placeholder
    setTypingMessage({ text: '', type: 'ai' });

    // Simulate typing effect
    let index = 0;
    const typeEffect = async () => {
      let updatedText = '';
      while (index < aiResponse.length) {
        updatedText += aiResponse[index];
        setTypingMessage({ text: updatedText, type: 'ai' });
        index++;
        await new Promise(resolve => setTimeout(resolve, 10)); // Adjust typing speed here
      }
      // Finalize the message
      setMessages(prevMessages => [
        ...prevMessages,
        { text: aiResponse, type: 'ai' }
      ]);
      setTypingMessage(null); // Clear typing placeholder
    };

    typeEffect();
  };

  useEffect(() => {
    // Scroll to the bottom every time messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
            {/* Display typing effect if present */}
            {typingMessage && (
              <div
                className={`py-2 px-4 rounded-lg max-w-xl break-words bg-gray-300 text-black`}
              >
                {typingMessage.text} <span className="text-gray-500">...</span>
              </div>
            )}
            {/* Reference element to scroll into view */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <GenerativeAIComponent onSend={handleSend} />
      </main>
    </section>
  );
};

export default MainLayout;
