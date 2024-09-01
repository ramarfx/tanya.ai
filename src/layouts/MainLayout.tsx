import Sidebar from "@/components/Sidebar";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const MainLayout = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Create a ref to the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue.trim()]);
      setInputValue(""); // Clear the input field
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action (e.g., form submission)
      handleSend();
    }
  };

  // Scroll to the bottom of the messages container when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <section className="h-screen w-full px-10 pb-10 relative bg-[#DCEEFF] flex flex-row pl-[300px]">
      <Sidebar />

      <main className="w-full h-full flex flex-col">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className="bg-primary text-white py-2 px-4 rounded-lg max-w-xl break-words ml-auto"
              >
                {message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input field and send button */}
        <div className="relative w-full flex justify-center items-center border-gray-300 py-4">
          <div className="flex w-full max-w-screen-sm items-center">
            <Input
              id="user-input"
              className="flex-1 py-6"
              placeholder="Ketikkan Pertanyaanmu..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSend} className="ml-2 bg-primary">
              <ArrowRight className="size-[18px]" />
            </Button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default MainLayout;
