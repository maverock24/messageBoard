const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for channels and messages (in production, use a database)
let channels = [
  {
    id: uuidv4(),
    name: 'General',
    description: 'General discussion'
  },
  {
    id: uuidv4(),
    name: 'Development',
    description: 'Development related topics'
  },
  {
    id: uuidv4(),
    name: 'Random',
    description: 'Random conversations'
  }
];

// Messages organized by channel
let messages = {
  [channels[0].id]: [
    {
      id: uuidv4(),
      author: 'Admin',
      content: 'Welcome to the General channel! Share your thoughts here.',
      timestamp: new Date().toISOString(),
      channelId: channels[0].id
    },
    {
      id: uuidv4(),
      author: 'John Doe',
      content: 'This is a great platform for discussions!',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      channelId: channels[0].id
    }
  ],
  [channels[1].id]: [
    {
      id: uuidv4(),
      author: 'Dev User',
      content: 'Let\'s discuss our latest React project!',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      channelId: channels[1].id
    }
  ],
  [channels[2].id]: []
};

// Routes

// GET all channels
app.get('/api/channels', (req, res) => {
  res.json(channels);
});

// GET messages for a specific channel
app.get('/api/channels/:channelId/messages', (req, res) => {
  const { channelId } = req.params;
  
  if (!messages[channelId]) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  // Sort messages by timestamp (newest first)
  const channelMessages = messages[channelId].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json(channelMessages);
});

// POST new message to a channel
app.post('/api/channels/:channelId/messages', (req, res) => {
  const { channelId } = req.params;
  const { author, content } = req.body;
  
  if (!author || !content) {
    return res.status(400).json({ error: 'Author and content are required' });
  }

  if (!messages[channelId]) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  const newMessage = {
    id: uuidv4(),
    author: author.trim(),
    content: content.trim(),
    timestamp: new Date().toISOString(),
    channelId: channelId
  };

  messages[channelId].push(newMessage);
  res.status(201).json(newMessage);
});

// DELETE message
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  
  // Find the message in any channel
  for (const channelId in messages) {
    const messageIndex = messages[channelId].findIndex(msg => msg.id === id);
    if (messageIndex !== -1) {
      messages[channelId].splice(messageIndex, 1);
      return res.status(204).send();
    }
  }
  
  res.status(404).json({ error: 'Message not found' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
