import type {Channel} from 'common';
import React, {useEffect, useState} from 'react';
import EditorPanel from './EditorPanel';
import MessagesPanel from './MessagesPanel';
import NavigationPanel from './NavigationPanel';
import ProfileView from './ProfileView';
import {ErrorBoundary} from './components/ErrorBoundary';
import {useChannels} from './hooks/useChannels';
import {useMessageSubmission} from './hooks/useMessageSubmission';
import {useMessages} from './hooks/useMessages';
import {useUserProfile} from './hooks/useUserProfile';
import {formatTimestamp} from './utils/helpers';

function App(): React.JSX.Element {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // Custom hooks for state management
  const {channels, loading, error: channelsError} = useChannels();
  const {
    messages,
    loadMessages,
    addMessage,
    replaceMessage,
    removeMessage,
  } = useMessages();
  const {
    userProfile,
    showProfileView,
    saveUserProfile,
    openProfileView,
    closeProfileView,
  } = useUserProfile();

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
        console.error('Failed to load messages:', err);
      });
      clearForm(); // Clear input when switching channels
    }
  }, [selectedChannel, loadMessages, clearForm]);

  const handleChannelSelect = (channel: Channel): void => {
    setSelectedChannel(channel);
  };

  const handleRefresh = (): void => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id).catch((err) => {
        console.error('Failed to refresh messages:', err);
      });
    }
  };

  // Combine errors from different sources
  const displayError = channelsError || submissionError;

  return (
    <ErrorBoundary>
      <div className='app'>
        {showProfileView && (
          <ProfileView
            isVisible={showProfileView}
            onSubmit={saveUserProfile}
            existingProfile={userProfile}
            onClose={closeProfileView}
          />
        )}

        {/* Navigation Panel */}
        <NavigationPanel
          channels={channels}
          selectedChannel={selectedChannel}
          loading={loading}
          handleChannelSelect={handleChannelSelect}
          onProfileClick={openProfileView}
        />

        {/* Main Content Area */}
        <div className='main-content'>
          {/* Messages Panel */}
          <MessagesPanel
            selectedChannel={selectedChannel}
            messages={messages}
            formatTimestamp={formatTimestamp}
            handleRefresh={handleRefresh}
          />

          {/* Editor Panel - only show when channel is selected */}
          {selectedChannel && (
            <EditorPanel
              selectedChannel={selectedChannel}
              onMessageSent={() => {
                // Refresh messages after sending
                handleRefresh();
              }}
              formData={formData}
              onFormDataChange={(data: import('common').MessageFormData) => {
                // Handle form data changes if needed
                console.log('Form data changed:', data);
              }}
              error={displayError}
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
