// Channel interface
export interface Channel {
  id: string;
  name: string;
  description: string;
}

// Message interface
export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  channelId: string;
}

// User profile interface
export interface UserProfile {
  name: string;
  description: string;
  role: string;
  hobbies: string;
  profilePicture: string | null;
}

// Form data interface for message creation
export interface MessageFormData {
  content: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Component prop types
export interface NavigationPanelProps {
  channels: Channel[];
  selectedChannel: Channel | null;
  loading: boolean;
  handleChannelSelect: (channel: Channel) => void;
}

export interface MessagesPanelProps {
  selectedChannel: Channel | null;
  messages: Record<string, Message[]>;
  formatTimestamp: (timestamp: string) => string;
}

export interface EditorPanelProps {
  selectedChannel: Channel | null;
  error: string;
  formData: MessageFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ProfileViewProps {
  onSubmit: (profileData: UserProfile) => void;
}
