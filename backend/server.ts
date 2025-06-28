import { Channel, CreateMessageRequest, Message } from "common";
import cors from "cors";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with a database in production)
let channels: Channel[] = [
  { id: "1", name: "General", description: "General discussion" },
  { id: "2", name: "Development", description: "Development related topics" },
  { id: "3", name: "Random", description: "Random conversations" },
];

let messages: Record<string, Message[]> = {
  "1": [
    {
      id: uuidv4(),
      author: "Admin",
      content: "Welcome!",
      timestamp: new Date().toISOString(),
      channelId: "1",
    },
  ],
  "2": [
    {
      id: uuidv4(),
      author: "Dev User",
      content: "Let's talk React!",
      timestamp: new Date().toISOString(),
      channelId: "2",
    },
  ],
  "3": [],
};

// --- Routes ---

// GET all channels
app.get("/api/channels", (req: Request, res: Response<Channel[]>) => {
  res.json(channels);
});

// GET messages for a specific channel
app.get(
  "/api/channels/:channelId/messages",
  (
    req: Request<{ channelId: string }>,
    res: Response<Message[] | { error: string }>
  ) => {
    const { channelId } = req.params;

    if (!messages[channelId]) {
      // FIX: Removed 'return' keyword.
      res.status(404).json({ error: "Channel not found" });
      return; // Use a standalone return to exit the function.
    }

    // Sort messages by timestamp (newest first)
    const channelMessages = [...messages[channelId]].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    res.json(channelMessages);
  }
);

// POST new message to a channel
app.post(
  "/api/channels/:channelId/messages",
  (
    req: Request<{ channelId: string }, {}, CreateMessageRequest>,
    res: Response<Message | { error: string }>
  ) => {
    const { channelId } = req.params;
    const { author, content } = req.body;

    if (!author || !content) {
      // FIX: Removed 'return' keyword.
      res.status(400).json({ error: "Author and content are required" });
      return; // Exit function
    }

    if (!messages[channelId]) {
      // FIX: Removed 'return' keyword.
      res.status(404).json({ error: "Channel not found" });
      return; // Exit function
    }

    const newMessage: Message = {
      id: uuidv4(),
      author: author.trim(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
      channelId: channelId,
    };

    messages[channelId].push(newMessage);
    res.status(201).json(newMessage);
  }
);

// DELETE message
app.delete(
  "/api/messages/:id",
  (req: Request<{ id: string }>, res: Response<{ error: string } | void>) => {
    const { id } = req.params;

    for (const channelId in messages) {
      const messageIndex = messages[channelId].findIndex(
        (msg) => msg.id === id
      );

      if (messageIndex !== -1) {
        messages[channelId].splice(messageIndex, 1);
        // FIX: Removed 'return' keyword.
        res.status(204).send();
        return; // Important to exit the loop and function after deleting.
      }
    }

    res.status(404).json({ error: "Message not found" });
  }
);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
