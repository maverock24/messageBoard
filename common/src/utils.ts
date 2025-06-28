// Utility functions shared between frontend and backend

/**
 * Formats a timestamp string to a readable format
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
};

/**
 * Validates a message content
 */
export const validateMessageContent = (content: string): boolean => {
  return content.trim().length > 0 && content.trim().length <= 1000;
};

/**
 * Validates a channel name
 */
export const validateChannelName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 50;
};

/**
 * Sanitizes user input by trimming whitespace
 */
export const sanitizeInput = (input: string): string => {
  return input.trim();
};

/**
 * Generates a simple ID (for development purposes)
 * In production, use a proper UUID library
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
