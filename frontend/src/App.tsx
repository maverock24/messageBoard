import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationPanel from "./NavigationPanel";
import MessagesPanel from "./MessagesPanel";
import EditorPanel from "./EditorPanel";
import ProfileView from "./ProfileView";
import { Channel, Message, UserProfile, MessageFormData } from "./types";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

function App(): React.JSX.Element {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileView, setShowProfileView] = useState<boolean>(false);
  const [formData, setFormData] = useState<MessageFormData>({
    content: "",
  });

  // Load channels on component mount
  useEffect(() => {
    loadChannels();

    // Check if user profile is stored in localStorage
    const storedProfile = localStorage.getItem("messageBoardUserProfile");
    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile));
      } catch (err) {
        console.error("Error parsing stored profile:", err);
        setShowProfileView(true);
      }
    } else {
      setShowProfileView(true);
    }
  }, []);

  // Load messages when channel is selected
  useEffect(() => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id);
      // Clear input when switching channels
      setFormData({ content: "" });
    }
  }, [selectedChannel]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadChannels = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Channel[]>(`${API_BASE_URL}/channels`);
      setChannels(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load channels. Please try again.");
      console.error("Error fetching channels:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (channelId: string): Promise<void> => {
    try {
      // Show existing messages immediately if available
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
      setError("");
    } catch (err) {
      setError("Failed to load messages. Please try again.");
      console.error("Error fetching messages:", err);
    }
  };

  const handleChannelSelect = (channel: Channel): void => {
    setSelectedChannel(channel);
  };

  const handleUserNameSubmit = (profileData: UserProfile): void => {
    if (profileData.name.trim()) {
      setUserProfile(profileData);
      localStorage.setItem(
        "messageBoardUserProfile",
        JSON.stringify(profileData)
      );
      setShowProfileView(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.content.trim()) {
      setError("Please enter a message.");
      return;
    }

    if (!selectedChannel) {
      setError("Please select a channel first.");
      return;
    }

    if (!userProfile || !userProfile.name) {
      setError("Profile not found. Please refresh the page.");
      return;
    }

    // Create optimistic update - add message immediately
    const optimisticMessage = {
      id: "temp-" + Date.now(),
      author: userProfile.name,
      content: formData.content.trim(),
      timestamp: new Date().toISOString(),
      channelId: selectedChannel.id,
    };

    try {
      // Update local state immediately (add to end for chronological order)
      setMessages((prev) => ({
        ...prev,
        [selectedChannel.id]: [
          ...(prev[selectedChannel.id] || []),
          optimisticMessage,
        ],
      }));

      // Send to backend with userName
      const messageData = {
        author: userProfile.name,
        content: formData.content.trim(),
      };
      const response = await axios.post<Message>(
        `${API_BASE_URL}/channels/${selectedChannel.id}/messages`,
        messageData
      );

      // Replace optimistic message with real one
      setMessages((prev) => ({
        ...prev,
        [selectedChannel.id]: prev[selectedChannel.id].map((msg) =>
          msg.id === optimisticMessage.id ? response.data : msg
        ),
      }));

      // Clear input
      setFormData({ content: "" });
      setError("");
    } catch (err) {
      // Remove optimistic message on error
      setMessages((prev) => ({
        ...prev,
        [selectedChannel.id]: prev[selectedChannel.id].filter(
          (msg) => msg.id !== optimisticMessage.id
        ),
      }));
      setError("Failed to post message. Please try again.");
      console.error("Error posting message:", err);
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="app">
      {showProfileView && <ProfileView onSubmit={handleUserNameSubmit} />}

      {/* Navigation Panel */}
      <NavigationPanel
        channels={channels}
        selectedChannel={selectedChannel}
        loading={loading}
        handleChannelSelect={handleChannelSelect}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Messages Panel */}
        <MessagesPanel
          selectedChannel={selectedChannel}
          messages={messages}
          formatTimestamp={formatTimestamp}
        />

        {/* Editor Panel - only show when channel is selected */}
        {selectedChannel && (
          <EditorPanel
            selectedChannel={selectedChannel}
            error={error}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
