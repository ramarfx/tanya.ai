import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const MainLayout = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    const input = document.getElementById("user-input") as HTMLInputElement | null;

    if (input && input.value.trim()) {
      setMessages([...messages, input.value.trim()]);
      input.value = ""; // Clear the input field
    }
  };

  return (
    <section className="h-screen w-full px-10 pb-10 relative bg-[#DCEEFF] flex flex-row pl-[300px]">
      <Sidebar />

      <main className="w-full h-full flex justify-center items-end">
        <div className="absolute top-10 right-10 flex flex-col space-y-2 max-h-[80vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-primary text-white py-2 px-4 rounded-lg max-w-xl break-words"
            >
              {message}
            </div>
          ))}
        </div>

        <div className="relative max-w-screen-sm w-full flex items-center">
          <Input
            id="user-input"
            className="py-6"
            placeholder="Ketikkan Pertanyaanmu..."
          />
          <Button onClick={handleSend} className="absolute right-1.5 bg-primary">
            <ArrowRight className="size-[18px]" />
          </Button>
        </div>
      </main>
    </section>
  );
};

export default MainLayout;
