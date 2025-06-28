import React from 'react';
import {LoadingSpinner} from './components/LoadingSpinner';
import {NavigationPanelProps} from './types';

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  channels,
  selectedChannel,
  loading,
  handleChannelSelect,
  onProfileClick,
}) => {
  return (
    <div className='navigation-panel'>
      <div className='navigation-header'>
        <h1>💬 Message Board</h1>
        <p>Select a channel to start</p>
      </div>

      <div className='channels-list'>
        {loading ? (
          <LoadingSpinner size='small' message='Loading channels...' />
        ) : (
          channels.map((channel) => (
            <div
              key={channel.id}
              className={`channel-item ${
                selectedChannel?.id === channel.id ? 'selected' : ''
              }`}
              onClick={() => handleChannelSelect(channel)}
            >
              <div className='channel-name'>#{channel.name}</div>
              <div className='channel-description'>{channel.description}</div>
            </div>
          ))
        )}
      </div>

      {/* Profile Icon */}
      <div className='navigation-footer'>
        <button
          className='profile-button'
          onClick={onProfileClick}
          title='View/Edit Profile'
        >
          👤
        </button>
      </div>
    </div>
  );
};

export default React.memo(NavigationPanel);
