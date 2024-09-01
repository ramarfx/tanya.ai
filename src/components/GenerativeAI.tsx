import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MarkdownIt from 'markdown-it';

const API_KEY = import.meta.env.VITE_API_KEY; // For Vite

const GenerativeAIComponent: React.FC<{ onSend: (message: string) => void }> = ({ onSend }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOutput('Generating...');

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse',
        {
          systemInstruction: `Berikan komentar yang agak menyakitkan tetapi dalam konteks lucu lucuan aja dalam bahasa gaul untuk username seperti berikut ini : ${prompt}. dengan minimal 100 kata`,
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const md = new MarkdownIt();
      setOutput(md.render(response.data.text || 'No response text available'));
    } catch (error) {
      console.error('API call error:', error); // Log error details
      if (axios.isAxiosError(error)) {
        setOutput(`API Error: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        setOutput('Error: ' + (error as Error).message);
      }
    }

    // Notify parent component
    onSend(prompt);
  };

  return (
    <div className="relative w-full flex justify-center items-center border-t py-4">
      <div className="flex w-full max-w-screen-sm items-center mx-auto">
        <form className="w-full flex items-center" onSubmit={handleSubmit}>
          <Input
            id="user-input"
            className="flex-1 py-2"
            placeholder="Type your message..."
            value={prompt}
            onChange={handlePromptChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e as any); // type assertion needed to match FormEvent<HTMLFormElement>
              }
            }}
          />
          <Button type="submit" className="ml-2 bg-primary">
            <ArrowRight className="size-[18px]" />
          </Button>
        </form>
      </div>
      {output && <div className="mt-4 p-2 border rounded">{output}</div>}
    </div>
  );
};

export default GenerativeAIComponent;
