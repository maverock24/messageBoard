// Import types for local use in interface definitions
import type { Channel, Message, MessageFormData, UserProfile } from 'common';

// Re-export shared types from common package for use throughout the frontend
export type {
  ApiError, ApiResponse, Channel, CreateMessageRequest, Message, MessageFormData, UserProfile, UserProfileFormData
} from 'common';

// Frontend-specific component prop interfaces

// Component prop types (frontend-specific)
export interface NavigationPanelProps {
  channels: Channel[];
  selectedChannel: Channel | null;
  loading: boolean;
  handleChannelSelect: (channel: Channel) => void;
  onProfileClick: () => void;
}

export interface MessagesPanelProps {
  selectedChannel: Channel | null;
  messages: Record<string, Message[]>;
  formatTimestamp: (timestamp: string) => string;
  handleRefresh: () => void;
}

export interface EditorPanelProps {
  selectedChannel: Channel | null;
  onMessageSent: () => void;
  formData: MessageFormData;
  onFormDataChange: (data: MessageFormData) => void;
  error?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface ProfileViewProps {
  isVisible: boolean;
  onSubmit: (profileData: UserProfile) => void;
  existingProfile?: UserProfile | null;
  onClose: () => void;
}
