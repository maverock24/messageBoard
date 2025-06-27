import React from 'react';
import { NavigationPanelProps } from './types';

const NavigationPanel: React.FC<NavigationPanelProps> = ({ 
  channels, 
  selectedChannel, 
  loading, 
  handleChannelSelect 
}) => {
  return (
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
  );
};

export default NavigationPanel;
