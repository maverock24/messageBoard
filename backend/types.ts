// Types for the backend
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
