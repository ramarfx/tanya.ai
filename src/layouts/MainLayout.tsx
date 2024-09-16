import { useState, useRef, useEffect } from "react";
import GenerativeAIComponent from "@/components/GenerativeAI";
import Sidebar from "@/components/Sidebar";
import MarkdownIt from 'markdown-it';

type MessageType = {
  text: string;
  type: 'user' | 'ai';
};

const md = new MarkdownIt();

const MainLayout = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [typingMessage, setTypingMessage] = useState<MessageType | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); 

  const handleSend = (message: string, aiResponse: string) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, type: 'user' }
    ]);

    setTypingMessage({ text: '', type: 'ai' });

    let index = 0;
    const typeEffect = async () => {
      let updatedText = '';
      while (index < aiResponse.length) {
        updatedText += aiResponse[index];
        setTypingMessage({ text: updatedText, type: 'ai' });
        index++;
        await new Promise(resolve => setTimeout(resolve, 0)); 
        
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
      const aiResponseMarkdown = md.render(aiResponse);

      setMessages(prevMessages => [
        ...prevMessages,
        { text: aiResponseMarkdown, type: 'ai' }
      ]);
      setTypingMessage(null); 
    };

    typeEffect();
  };

  useEffect(() => {
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
                className={`py-2 px-4 rounded-lg max-w-xl break-words ${
                  message.type === 'user' ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-300 text-black'
                }`}
              >
                {message.type === 'ai' ? (
                  <div
                    className="p-4 bg-gray-200 border border-gray-400 rounded-lg shadow-md"
                    dangerouslySetInnerHTML={{ __html: message.text }} 
                  />
                ) : (
                  message.text
                )}
              </div>
            ))}
            {typingMessage && (
              <div
                className={`py-2 px-4 rounded-lg max-w-2xl break-words  text-black`}
              >
                <div className="p-4 bg-gray-200 border  rounded-lg shadow-md">
                  {typingMessage.text} <span className="text-gray-500">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <GenerativeAIComponent onSend={handleSend} />
      </main>
    </section>
  );
};

export default MainLayout;
