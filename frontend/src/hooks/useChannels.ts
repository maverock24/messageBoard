import axios from "axios";
import type { Channel } from "common";
import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

export const useChannels = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadChannels = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get<Channel[]>(`${API_BASE_URL}/channels`);
      setChannels(response.data);
    } catch (err) {
      setError("Failed to load channels. Please try again.");
      console.error("Error fetching channels:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  return {
    channels,
    loading,
    error,
    refetchChannels: loadChannels,
  };
};
