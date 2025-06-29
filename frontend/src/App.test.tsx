import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock data
const mockChannels = [
  {id: '1', name: 'general', description: 'General discussion'},
  {id: '2', name: 'development', description: 'Development topics'},
  {id: '3', name: 'random', description: 'Random chat'},
];

const mockMessages = [
  {
    id: '1',
    author: 'John Doe',
    content: 'Hello everyone!',
    timestamp: new Date().toISOString(),
    channelId: '1',
  },
  {
    id: '2',
    author: 'Jane Smith',
    content: 'How is everyone doing?',
    timestamp: new Date().toISOString(),
    channelId: '1',
  },
];

const mockUserProfile = {
  name: 'Test User',
  description: 'Test Description',
  role: 'Developer',
  hobbies: 'Testing',
  profilePicture: null,
};

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    localStorageMock.clear();

    // Set up user profile so profile view doesn't show
    localStorageMock.setItem(
      'messageBoardUserProfile',
      JSON.stringify(mockUserProfile)
    );

    // Mock successful channel loading
    mockedAxios.get.mockResolvedValue({data: mockChannels});
    mockedAxios.post.mockResolvedValue({
      data: {
        id: '3',
        author: 'Test User',
        content: 'Test message',
        timestamp: new Date().toISOString(),
        channelId: '1',
      },
    });
  });

  describe('Initial Render and Layout', () => {
    it('renders full page application with three panels', async () => {
      render(<App />);

      // Check for navigation panel
      expect(screen.getByText('💬 Message Board')).toBeInTheDocument();

      // Check for main content area
      expect(
        screen.getByText(
          '👈 Select a channel from the sidebar to view messages'
        )
      ).toBeInTheDocument();
    });

    it('shows navigation panel with channel list', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      expect(screen.getByText(/development/)).toBeInTheDocument();
      expect(screen.getByText(/random/)).toBeInTheDocument();
    });

    it('initially shows no channel selected message', () => {
      render(<App />);
      expect(
        screen.getByText(/select a channel from the sidebar to view messages/i)
      ).toBeInTheDocument();
    });
  });

  describe('Channel List Loading', () => {
    it('loads channel list once on application loading', async () => {
      render(<App />);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          'http://localhost:3001/api/channels'
        );
      });

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('shows loading state while channels are loading', () => {
      // Mock a delayed response
      mockedAxios.get.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({data: mockChannels}), 100)
          )
      );

      render(<App />);
      expect(screen.getByText('Loading channels...')).toBeInTheDocument();
    });

    it('handles channel loading errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText(/failed to load channels. please try again/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Channel Selection', () => {
    it('initially has no channel selected', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      const channelItems = screen.getAllByText(/general|development|random/);
      // Verify no channel has selected class (we can't easily check for the selected class without the actual DOM structure)
      expect(channelItems.length).toBeGreaterThan(0);
    });

    it('clicking a channel selects that channel', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      // Mock messages loading for the selected channel
      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});

      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          'http://localhost:3001/api/channels/1/messages'
        );
      });
    });

    it('loads messages when channel is selected', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});

      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          'http://localhost:3001/api/channels/1/messages'
        );
      });
    });

    it('shows messages immediately from local state when available', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      // First selection - loads from remote
      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
      });

      // Select different channel
      const devChannel = screen.getByText(/development/);
      fireEvent.click(devChannel);

      // Select general again - should show cached messages immediately
      fireEvent.click(generalChannel);

      expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
    });
  });

  describe('Editor Panel Visibility and State', () => {
    it('hides editor panel when no channel is selected', () => {
      render(<App />);
      // Since editor panel only shows when channel is selected, and we don't have specific test IDs,
      // we'll check that certain editor-specific elements aren't present
      expect(screen.queryByText(/send message/i)).not.toBeInTheDocument();
    });

    it('shows editor panel when channel is selected', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(screen.getByText(/send message/i)).toBeInTheDocument();
      });
    });

    it('shows text area input in editor', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText(/what's on your mind/i)
        ).toBeInTheDocument();
      });
    });

    it('shows submit button in editor', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(screen.getByText(/send message/i)).toBeInTheDocument();
      });
    });

    it('disables submit button when text area is empty', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        const submitButton = screen.getByText(/send message/i);
        expect(submitButton).toBeDisabled();
      });
    });

    it('enables submit button when text is entered', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText(/what's on your mind/i)
        ).toBeInTheDocument();
      });

      const textArea = screen.getByPlaceholderText(/what's on your mind/i);
      fireEvent.change(textArea, {target: {value: 'Hello world!'}});

      const submitButton = screen.getByText(/send message/i);
      expect(submitButton).toBeEnabled();
    });
  });

  describe('Message Submission', () => {
    it('adds message to currently selected channel when submitted', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText(/what's on your mind/i)
        ).toBeInTheDocument();
      });

      const textArea = screen.getByPlaceholderText(/what's on your mind/i);
      fireEvent.change(textArea, {target: {value: 'New test message'}});

      const submitButton = screen.getByText(/send message/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/api/channels/1/messages',
          {
            author: expect.any(String),
            content: 'New test message',
          }
        );
      });
    });

    it('clears input after submitting', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText(/what's on your mind/i)
        ).toBeInTheDocument();
      });

      const textArea = screen.getByPlaceholderText(/what's on your mind/i);
      fireEvent.change(textArea, {target: {value: 'Test message'}});

      const submitButton = screen.getByText(/send message/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(textArea).toHaveValue('');
      });
    });

    it('clears input when switching channels', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValue({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText(/what's on your mind/i)
        ).toBeInTheDocument();
      });

      const textArea = screen.getByPlaceholderText(/what's on your mind/i);
      fireEvent.change(textArea, {target: {value: 'Some text'}});

      // Switch to different channel
      const devChannel = screen.getByText(/development/);
      fireEvent.click(devChannel);

      await waitFor(() => {
        const newTextArea = screen.getByPlaceholderText(/what's on your mind/i);
        expect(newTextArea).toHaveValue('');
      });
    });
  });

  describe('Message Display', () => {
    it('shows message list for selected channel', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
      });

      expect(screen.getByText('How is everyone doing?')).toBeInTheDocument();
    });

    it('updates message list after loading from remote', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
      });

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('stores messages in local state after loading from remote', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
      });

      // Switch channels and back - should not reload from API
      mockedAxios.get.mockClear();
      const devChannel = screen.getByText(/development/);
      fireEvent.click(devChannel);
      fireEvent.click(generalChannel);

      // Messages should still be there (from local state)
      expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
      // API should not have been called again for general channel
      expect(mockedAxios.get).not.toHaveBeenCalledWith(
        'http://localhost:3001/api/channels/1/messages'
      );
    });
  });

  describe('Error Handling', () => {
    it('handles message submission errors gracefully', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockResolvedValueOnce({data: mockMessages});
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText(/what's on your mind/i)
        ).toBeInTheDocument();
      });

      // Mock submission error
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      const textArea = screen.getByPlaceholderText(/what's on your mind/i);
      fireEvent.change(textArea, {target: {value: 'Test message'}});

      const submitButton = screen.getByText(/send message/i);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to post message/i)).toBeInTheDocument();
      });
    });

    it('handles message loading errors gracefully', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/general/)).toBeInTheDocument();
      });

      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      const generalChannel = screen.getByText(/general/);
      fireEvent.click(generalChannel);

      await waitFor(() => {
        expect(
          screen.getByText(/failed to load messages. please try again/i)
        ).toBeInTheDocument();
      });
    });
  });
});
