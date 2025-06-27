# Message Board Prototype

A full-stack message board application built with React.js (frontend) and Node.js/Express (backend).

## Features

- 📝 Post new messages with author name
- 👍 Like messages
- 🗑️ Delete messages
- 📱 Responsive design
- ⚡ Real-time updates
- 🎨 Modern, beautiful UI

## Project Structure

```
MessageBoard/
├── backend/           # Node.js API server
│   ├── package.json
│   └── server.js
├── frontend/          # React application
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Fill in your name and message content
3. Click "Post Message" to add your message
4. Like messages by clicking the heart button
5. Delete messages by clicking the delete button

## API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create a new message
- `PUT /api/messages/:id/like` - Like a message
- `DELETE /api/messages/:id` - Delete a message
- `GET /api/health` - Health check

## Technologies Used

### Backend

- Node.js
- Express.js
- CORS
- UUID

### Frontend

- React.js
- Axios
- CSS3 (with gradients and animations)

## Development Notes

- Messages are stored in memory (not persistent)
- For production, consider using a database like MongoDB or PostgreSQL
- The app includes basic error handling and loading states
- Responsive design works on mobile and desktop

## Future Enhancements

- User authentication
- Persistent database storage
- Real-time updates with WebSockets
- Message threading/replies
- Image uploads
- User profiles
- Message search functionality

## License

MIT License
