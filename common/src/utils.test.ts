import {
    formatTimestamp,
    generateId,
    sanitizeInput,
    validateChannelName,
    validateMessageContent
} from './utils';

describe('formatTimestamp', () => {
  it('should return "Just now" for very recent timestamps', () => {
    const now = new Date();
    const recentTimestamp = new Date(now.getTime() - 30 * 1000).toISOString(); // 30 seconds ago
    expect(formatTimestamp(recentTimestamp)).toBe('Just now');
  });

  it('should return minutes ago for timestamps within the last hour', () => {
    const now = new Date();
    const timestamp = new Date(now.getTime() - 15 * 60 * 1000).toISOString(); // 15 minutes ago
    expect(formatTimestamp(timestamp)).toBe('15m ago');
  });

  it('should return hours ago for timestamps within the last day', () => {
    const now = new Date();
    const timestamp = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(); // 3 hours ago
    expect(formatTimestamp(timestamp)).toBe('3h ago');
  });

  it('should return days ago for timestamps within the last week', () => {
    const now = new Date();
    const timestamp = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(); // 2 days ago
    expect(formatTimestamp(timestamp)).toBe('2d ago');
  });

  it('should return localized date string for timestamps older than a week', () => {
    const now = new Date();
    const timestamp = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(); // 10 days ago
    const result = formatTimestamp(timestamp);
    // Should return a date string, not a relative time
    expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  it('should handle invalid date strings gracefully', () => {
    const invalidTimestamp = 'invalid-date';
    expect(() => formatTimestamp(invalidTimestamp)).not.toThrow();
  });

  it('should handle edge case of exactly 1 minute', () => {
    const now = new Date();
    const timestamp = new Date(now.getTime() - 60 * 1000).toISOString(); // exactly 1 minute ago
    expect(formatTimestamp(timestamp)).toBe('1m ago');
  });

  it('should handle edge case of exactly 1 hour', () => {
    const now = new Date();
    const timestamp = new Date(now.getTime() - 60 * 60 * 1000).toISOString(); // exactly 1 hour ago
    expect(formatTimestamp(timestamp)).toBe('1h ago');
  });
});

describe('validateMessageContent', () => {
  it('should return true for valid message content', () => {
    expect(validateMessageContent('Hello world')).toBe(true);
    expect(validateMessageContent('A valid message with some content')).toBe(true);
    expect(validateMessageContent('Single character: a')).toBe(true);
  });

  it('should return false for empty or whitespace-only content', () => {
    expect(validateMessageContent('')).toBe(false);
    expect(validateMessageContent('   ')).toBe(false);
    expect(validateMessageContent('\t\n')).toBe(false);
  });

  it('should return false for content exceeding 1000 characters', () => {
    const longContent = 'a'.repeat(1001);
    expect(validateMessageContent(longContent)).toBe(false);
  });

  it('should return true for content exactly at the 1000 character limit', () => {
    const maxContent = 'a'.repeat(1000);
    expect(validateMessageContent(maxContent)).toBe(true);
  });

  it('should trim whitespace before validation', () => {
    expect(validateMessageContent('  valid message  ')).toBe(true);
    const contentWith999Chars = ' ' + 'a'.repeat(998) + ' ';
    expect(validateMessageContent(contentWith999Chars)).toBe(true);
  });
});

describe('validateChannelName', () => {
  it('should return true for valid channel names', () => {
    expect(validateChannelName('general')).toBe(true);
    expect(validateChannelName('development-team')).toBe(true);
    expect(validateChannelName('a')).toBe(true);
  });

  it('should return false for empty or whitespace-only names', () => {
    expect(validateChannelName('')).toBe(false);
    expect(validateChannelName('   ')).toBe(false);
    expect(validateChannelName('\t\n')).toBe(false);
  });

  it('should return false for names exceeding 50 characters', () => {
    const longName = 'a'.repeat(51);
    expect(validateChannelName(longName)).toBe(false);
  });

  it('should return true for names exactly at the 50 character limit', () => {
    const maxName = 'a'.repeat(50);
    expect(validateChannelName(maxName)).toBe(true);
  });

  it('should trim whitespace before validation', () => {
    expect(validateChannelName('  valid-channel  ')).toBe(true);
    const nameWith48Chars = ' ' + 'a'.repeat(48) + ' ';
    expect(validateChannelName(nameWith48Chars)).toBe(true);
  });
});

describe('sanitizeInput', () => {
  it('should trim leading and trailing whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
    expect(sanitizeInput('\t\ntest\t\n')).toBe('test');
  });

  it('should preserve internal whitespace', () => {
    expect(sanitizeInput('  hello   world  ')).toBe('hello   world');
  });

  it('should handle empty strings', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });

  it('should handle strings with no whitespace', () => {
    expect(sanitizeInput('hello')).toBe('hello');
  });

  it('should handle special characters', () => {
    expect(sanitizeInput('  hello@world.com  ')).toBe('hello@world.com');
    expect(sanitizeInput('  #hashtag  ')).toBe('#hashtag');
  });
});

describe('generateId', () => {
  it('should generate a string', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
  });

  it('should generate unique IDs', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(100);
  });

  it('should generate non-empty IDs', () => {
    const id = generateId();
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate IDs containing only valid base36 characters', () => {
    const id = generateId();
    expect(id).toMatch(/^[0-9a-z]+$/);
  });

  it('should generate different IDs when called multiple times', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should generate reasonably long IDs for uniqueness', () => {
    const id = generateId();
    expect(id.length).toBeGreaterThan(10); // Should be reasonably long for uniqueness
  });
});
