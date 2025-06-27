import React, { createContext, useContext, ReactNode } from "react";
import { Channel, Message, UserProfile } from "../types";

// Context interfaces
interface AppContextType {
  // Channels
  channels: Channel[];
  selectedChannel: Channel | null;
  channelsLoading: boolean;
  channelsError: string;

  // Messages
  messages: Record<string, Message[]>;

  // User Profile
  userProfile: UserProfile | null;
  showProfileView: boolean;

  // Actions
  setSelectedChannel: (channel: Channel | null) => void;
  loadMessages: (channelId: string) => Promise<void>;
  addMessage: (channelId: string, message: Message) => void;
  saveUserProfile: (profile: UserProfile) => void;
}

// Create contexts
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
  value: AppContextType;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  value,
}) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// HOC for components that need app context
export const withAppContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => (
    <AppProvider value={useAppContext()}>
      <Component {...props} />
    </AppProvider>
  );
};
