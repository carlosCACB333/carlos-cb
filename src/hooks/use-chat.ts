import { aboutme } from "@/assets/aboutme";
import { useLlm } from "@/store/web-llm";
import { useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
}

export const useChat = () => {
  const engine = useLlm((s) => s.engine);
  const isLoaded = useLlm((s) => s.isLoaded);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!isLoaded || !engine) return;
      const form = e.currentTarget;
      const input = form.querySelector("input");
      if (!input) return;
      const content = input.value;
      if (!content) return;
      const user_msgs: Message[] = [
        ...messages,
        { id: "user_" + Date.now().toString(), content, role: "user" },
      ];
      setMessages(user_msgs);
      setIsTyping(true);
      form.reset();
      const id = "assistant_" + Date.now().toString();
      const chunks = await engine.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              'Eres el asistente virtual de Carlos. Responde las preguntas de que te hagan siempre en tercera persona. no inventas nada, si no tienes la información responde con un "no tengo información sobre eso" a continuación te dejo el contexto: ' +
              aboutme,
          },

          ...user_msgs.slice(-4),
        ],
        stream: true,
        max_tokens: 150,
      });
      let completion = "";
      for await (const chunk of chunks) {
        completion += chunk.choices[0].delta.content || "";
        const assistant_msgs: Message[] = [
          ...user_msgs,
          { id, content: completion, role: "assistant" },
        ];
        setMessages(assistant_msgs);
      }
      setIsTyping(false);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return {
    messages,
    isLoaded,
    isTyping,
    handleSubmit,
    clearMessages,
    inputRef,
  };
};
