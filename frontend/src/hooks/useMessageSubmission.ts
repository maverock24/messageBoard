import { useState, useCallback } from "react";
import axios from "axios";
import { Channel, Message, UserProfile, MessageFormData } from "../types";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

interface UseMessageSubmissionProps {
  selectedChannel: Channel | null;
  userProfile: UserProfile | null;
  addMessage: (channelId: string, message: Message) => void;
  replaceMessage: (
    channelId: string,
    tempId: string,
    newMessage: Message
  ) => void;
  removeMessage: (channelId: string, messageId: string) => void;
}

export const useMessageSubmission = ({
  selectedChannel,
  userProfile,
  addMessage,
  replaceMessage,
  removeMessage,
}: UseMessageSubmissionProps) => {
  const [formData, setFormData] = useState<MessageFormData>({ content: "" });
  const [error, setError] = useState<string>("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const clearForm = useCallback((): void => {
    setFormData({ content: "" });
    setError("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      // Validation
      if (!formData.content.trim()) {
        setError("Please enter a message.");
        return;
      }

      if (!selectedChannel) {
        setError("Please select a channel first.");
        return;
      }

      if (!userProfile?.name) {
        setError("Profile not found. Please refresh the page.");
        return;
      }

      // Create optimistic message
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        author: userProfile.name,
        content: formData.content.trim(),
        timestamp: new Date().toISOString(),
        channelId: selectedChannel.id,
      };

      try {
        // Optimistic update
        addMessage(selectedChannel.id, optimisticMessage);

        // API call
        const messageData = {
          author: userProfile.name,
          content: formData.content.trim(),
        };

        const response = await axios.post<Message>(
          `${API_BASE_URL}/channels/${selectedChannel.id}/messages`,
          messageData
        );

        // Replace optimistic message with real one
        replaceMessage(selectedChannel.id, optimisticMessage.id, response.data);

        // Clear form
        clearForm();
      } catch (err) {
        // Remove optimistic message on error
        removeMessage(selectedChannel.id, optimisticMessage.id);
        setError("Failed to post message. Please try again.");
        console.error("Error posting message:", err);
      }
    },
    [
      formData.content,
      selectedChannel,
      userProfile,
      addMessage,
      replaceMessage,
      removeMessage,
      clearForm,
    ]
  );

  return {
    formData,
    error,
    handleInputChange,
    handleSubmit,
    clearForm,
  };
};
