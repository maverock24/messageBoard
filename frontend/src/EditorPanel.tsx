import React, {useEffect, useRef} from 'react';
import {EditorPanelProps} from './types';

const EditorPanel: React.FC<EditorPanelProps> = ({
  selectedChannel,
  error,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus on textarea when channel is selected
  useEffect(() => {
    if (selectedChannel && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [selectedChannel]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.altKey) {
        // Alt+Enter: Add new line - manually insert newline
        e.preventDefault();
        const textarea = e.target as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        // Create new value with newline inserted at cursor position
        const newValue =
          value.substring(0, start) + '\n' + value.substring(end);

        // Create synthetic event for handleInputChange
        const syntheticEvent = {
          target: {
            name: 'content',
            value: newValue,
          },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        handleInputChange(syntheticEvent);

        // Set cursor position after the newline
        setTimeout(() => {
          textarea.setSelectionRange(start + 1, start + 1);
        }, 0);
      } else {
        // Enter: Send message
        e.preventDefault();
        if (formData.content.trim()) {
          // Create a synthetic form event
          const syntheticFormEvent = {
            preventDefault: () => {},
            target: e.target,
            currentTarget: (e.target as HTMLTextAreaElement).form,
          } as React.FormEvent<HTMLFormElement>;
          handleSubmit(syntheticFormEvent);
        }
      }
    }
  };

  return (
    <div className='editor-panel'>
      <div className='editor-header'>
        <h3>New Message</h3>
        <span className='keyboard-hint'>
          Press Enter to send • Alt+Enter for new line
        </span>
      </div>

      {error && <div className='error'>{error}</div>}

      <form className='editor-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <textarea
            ref={textareaRef}
            id='content'
            name='content'
            value={formData.content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind?"
            maxLength={500}
            rows={3}
          />
        </div>

        <button
          type='submit'
          className='submit-button'
          disabled={!formData.content.trim()}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default React.memo(EditorPanel);
