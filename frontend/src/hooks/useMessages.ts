import { useState, useCallback } from "react";
import axios from "axios";
import { Message } from "../types";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

export const useMessages = () => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const loadMessages = useCallback(
    async (channelId: string): Promise<void> => {
      try {
        // Return early if messages already loaded
        if (messages[channelId]) {
          return;
        }

        const response = await axios.get<Message[]>(
          `${API_BASE_URL}/channels/${channelId}/messages`
        );

        setMessages((prev) => ({
          ...prev,
          [channelId]: response.data,
        }));
      } catch (err) {
        console.error("Error fetching messages:", err);
        throw new Error("Failed to load messages. Please try again.");
      }
    },
    [messages]
  );

  const addMessage = useCallback(
    (channelId: string, message: Message): void => {
      setMessages((prev) => ({
        ...prev,
        [channelId]: [...(prev[channelId] || []), message],
      }));
    },
    []
  );

  const replaceMessage = useCallback(
    (channelId: string, tempId: string, newMessage: Message): void => {
      setMessages((prev) => ({
        ...prev,
        [channelId]:
          prev[channelId]?.map((msg) =>
            msg.id === tempId ? newMessage : msg
          ) || [],
      }));
    },
    []
  );

  const removeMessage = useCallback(
    (channelId: string, messageId: string): void => {
      setMessages((prev) => ({
        ...prev,
        [channelId]:
          prev[channelId]?.filter((msg) => msg.id !== messageId) || [],
      }));
    },
    []
  );

  return {
    messages,
    loadMessages,
    addMessage,
    replaceMessage,
    removeMessage,
  };
};
