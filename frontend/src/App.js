import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

function App() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    author: '',
    content: ''
  });

  // Load channels on component mount
  useEffect(() => {
    loadChannels();
  }, []);

  // Load messages when channel is selected
  useEffect(() => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id);
      // Clear input when switching channels
      setFormData({ author: '', content: '' });
    }
  }, [selectedChannel]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadChannels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/channels`);
      setChannels(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load channels. Please try again.');
      console.error('Error fetching channels:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (channelId) => {
    try {
      // Show existing messages immediately if available
      if (messages[channelId]) {
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/channels/${channelId}/messages`);
      setMessages(prev => ({
        ...prev,
        [channelId]: response.data
      }));
      setError('');
    } catch (err) {
      setError('Failed to load messages. Please try again.');
      console.error('Error fetching messages:', err);
    }
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.author.trim() || !formData.content.trim()) {
      setError('Please fill in both author and message fields.');
      return;
    }

    if (!selectedChannel) {
      setError('Please select a channel first.');
      return;
    }

    // Create optimistic update - add message immediately
    const optimisticMessage = {
      id: 'temp-' + Date.now(),
      author: formData.author.trim(),
      content: formData.content.trim(),
      timestamp: new Date().toISOString(),
      channelId: selectedChannel.id
    };

    try {
      // Update local state immediately
      setMessages(prev => ({
        ...prev,
        [selectedChannel.id]: [optimisticMessage, ...(prev[selectedChannel.id] || [])]
      }));

      // Send to backend
      const response = await axios.post(`${API_BASE_URL}/channels/${selectedChannel.id}/messages`, formData);
      
      // Replace optimistic message with real one
      setMessages(prev => ({
        ...prev,
        [selectedChannel.id]: prev[selectedChannel.id].map(msg => 
          msg.id === optimisticMessage.id ? response.data : msg
        )
      }));

      // Clear input
      setFormData({ author: '', content: '' });
      setError('');
    } catch (err) {
      // Remove optimistic message on error
      setMessages(prev => ({
        ...prev,
        [selectedChannel.id]: prev[selectedChannel.id].filter(msg => msg.id !== optimisticMessage.id)
      }));
      setError('Failed to post message. Please try again.');
      console.error('Error posting message:', err);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const currentMessages = selectedChannel ? (messages[selectedChannel.id] || []) : [];

  return (
    <div className="app">
      {/* Navigation Panel */}
      <div className="navigation-panel">
        <div className="navigation-header">
          <h1>💬 Message Board</h1>
          <p>Select a channel to start</p>
        </div>
        
        <div className="channels-list">
          {loading ? (
            <div className="loading">Loading channels...</div>
          ) : (
            channels.map(channel => (
              <div
                key={channel.id}
                className={`channel-item ${selectedChannel?.id === channel.id ? 'selected' : ''}`}
                onClick={() => handleChannelSelect(channel)}
              >
                <div className="channel-name">#{channel.name}</div>
                <div className="channel-description">{channel.description}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Messages Panel */}
      <div className="messages-panel">
        {selectedChannel ? (
          <>
            <div className="messages-header">
              <h2>#{selectedChannel.name}</h2>
            </div>
            
            <div className="messages-list">
              {currentMessages.length === 0 ? (
                <div className="no-messages">
                  No messages yet. Be the first to post in this channel!
                </div>
              ) : (
                currentMessages.map(message => (
                  <div key={message.id} className="message-card">
                    <div className="message-header">
                      <span className="message-author">{message.author}</span>
                      <span className="message-timestamp">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="no-channel-selected">
            👈 Select a channel from the sidebar to view messages
          </div>
        )}
      </div>

      {/* Editor Panel */}
      <div className={`editor-panel ${!selectedChannel ? 'hidden' : ''}`}>
        <div className="editor-header">
          <h3>New Message</h3>
        </div>
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}
        
        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="author">Your Name:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter your name"
              maxLength="50"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Message:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              maxLength="500"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={!formData.author.trim() || !formData.content.trim()}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
