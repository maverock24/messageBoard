import React, { useState, useEffect } from "react";
import NavigationPanel from "./NavigationPanel";
import MessagesPanel from "./MessagesPanel";
import EditorPanel from "./EditorPanel";
import ProfileView from "./ProfileView";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Channel } from "./types";
import { useChannels } from "./hooks/useChannels";
import { useMessages } from "./hooks/useMessages";
import { useUserProfile } from "./hooks/useUserProfile";
import { useMessageSubmission } from "./hooks/useMessageSubmission";
import { formatTimestamp } from "./utils/helpers";

function App(): React.JSX.Element {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // Custom hooks for state management
  const { channels, loading, error: channelsError } = useChannels();
  const { messages, loadMessages, addMessage, replaceMessage, removeMessage } =
    useMessages();
  const { userProfile, showProfileView, saveUserProfile } = useUserProfile();

  // Message submission hook
  const {
    formData,
    error: submissionError,
    handleInputChange,
    handleSubmit,
    clearForm,
  } = useMessageSubmission({
    selectedChannel,
    userProfile,
    addMessage,
    replaceMessage,
    removeMessage,
  });

  // Load messages when channel is selected
  useEffect(() => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id).catch((err) => {
        console.error("Failed to load messages:", err);
      });
      clearForm(); // Clear input when switching channels
    }
  }, [selectedChannel, loadMessages, clearForm]);

  const handleChannelSelect = (channel: Channel): void => {
    setSelectedChannel(channel);
  };

  // Combine errors from different sources
  const displayError = channelsError || submissionError;

  return (
    <ErrorBoundary>
      <div className="app">
        {showProfileView && <ProfileView onSubmit={saveUserProfile} />}

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
              error={displayError}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
