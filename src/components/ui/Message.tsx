import { useState, useEffect, KeyboardEvent, forwardRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MessagesProps {
  messages: { text: string; type: 'user' | 'ai' }[]; // Changed to include message type
  onSend: (message: string) => void;
}

const Messages = forwardRef<HTMLDivElement, MessagesProps>(({ messages, onSend }, ref) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, ref]);

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`py-2 px-4 rounded-lg max-w-xl break-words ${
                message.type === 'user' ? 'bg-primary text-white ml-auto' : 'bg-gray-200 text-black'
              }`}
            >
              {message.text}
            </div>
          ))}
          <div ref={ref} />
        </div>
      </div>

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
    </>
  );
});

Messages.displayName = 'Messages';

export default Messages;
