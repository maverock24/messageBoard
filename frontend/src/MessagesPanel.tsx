import React, { useEffect, useRef } from "react";
import { MessagesPanelProps } from "./types";

const MessagesPanel: React.FC<MessagesPanelProps> = ({
  selectedChannel,
  messages,
  formatTimestamp,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentMessages = selectedChannel
    ? messages[selectedChannel.id] || []
    : [];

  // Sort messages chronologically (oldest to newest)
  const sortedMessages = [...currentMessages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Auto-scroll to bottom when messages change or channel changes
  useEffect(() => {
    if (messagesEndRef.current && selectedChannel) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedMessages, selectedChannel]);

  return (
    <div className="messages-panel">
      {selectedChannel ? (
        <>
          <div className="messages-header">
            <h2>#{selectedChannel.name}</h2>
          </div>

          <div className="messages-list">
            {sortedMessages.length === 0 ? (
              <div className="no-messages">
                No messages yet. Be the first to post in this channel!
              </div>
            ) : (
              sortedMessages.map((message) => (
                <div key={message.id} className="message-card">
                  <div className="message-header">
                    <span className="message-author">{message.author}</span>
                    <span className="message-timestamp">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="message-content">{message.content}</div>
                </div>
              ))
            )}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        </>
      ) : (
        <div className="no-channel-selected">
          👈 Select a channel from the sidebar to view messages
        </div>
      )}
    </div>
  );
};

export default React.memo(MessagesPanel);
