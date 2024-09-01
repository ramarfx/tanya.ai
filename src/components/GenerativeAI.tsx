import { useState, ChangeEvent, FormEvent } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mendapatkan API Key dari variabel lingkungan
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GenerativeAIComponent: React.FC<{ onSend: (message: string, aiResponse: string) => void }> = ({ onSend }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = await response.text();
      
      // Pass both the user's message and AI's response to the parent component
      onSend(prompt, aiResponse);
      setPrompt(""); // Clear input after sending
    } catch (error) {
      console.error('Error fetching AI response:', error);
      onSend(prompt, 'Error: Unable to fetch AI response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center py-4 border-t">
      <div className="w-full max-w-screen-sm mx-auto">
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            id="user-input"
            className="flex-1 py-2"
            placeholder="Type your question..."
            value={prompt}
            onChange={handlePromptChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e as any); // Type assertion to match FormEvent<HTMLFormElement>
              }
            }}
          />
          <Button type="submit" className="ml-2 bg-primary">
            <ArrowRight className="size-[18px]" />
          </Button>
        </form>
      </div>
      {isLoading && (
        <div className="mt-4 p-2 border rounded">Loading...</div>
      )}
    </div>
  );
};

export default GenerativeAIComponent;
