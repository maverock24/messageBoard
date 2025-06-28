// Core domain types shared between frontend and backend

export interface Channel {
  id: string;
  name: string;
  description: string;
}

export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  channelId: string;
}

export interface CreateMessageRequest {
  author: string;
  content: string;
}

export interface UserProfile {
  name: string;
  description: string;
  role: string;
  hobbies: string;
  profilePicture: string | null;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface ApiError {
  error: string;
  statusCode?: number;
}

// Form data interfaces
export interface MessageFormData {
  content: string;
}

export interface UserProfileFormData {
  name: string;
  description: string;
  role: string;
  hobbies: string;
}
