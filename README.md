# Message Board

A modern, full-stack channel-based message board application built with React.js + TypeScript (frontend) and Node.js/Express + TypeScript (backend).

## Features

- 🏢 **Channel-based messaging** - Organize conversations by topic
- 📝 **Rich message posting** - Post messages with author attribution
- � **User profiles** - Complete onboarding with name, role, description, hobbies, and profile pictures
- ⌨️ **Keyboard shortcuts** - Enter to send, Alt+Enter for new lines
- 📱 **Responsive design** - Works seamlessly on mobile and desktop
- 🎨 **Modern, beautiful UI** - Clean three-panel layout with smooth animations
- 🔄 **Auto-scroll & focus** - Automatically scrolls to latest messages and focuses input
- 📊 **Message ordering** - Messages sorted chronologically (oldest to newest)
- 💾 **Local storage** - User profiles persist across sessions
- 🎯 **TypeScript support** - Full type safety across frontend and backend

## Project Structure

```
MessageBoard/
├── backend/                    # Node.js + TypeScript API server
│   ├── package.json           # Backend dependencies and scripts
│   ├── tsconfig.json          # TypeScript configuration
│   ├── server.ts              # Main server file (TypeScript)
│   └── types.ts               # Backend type definitions
├── frontend/                   # React + TypeScript application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── App.tsx            # Main application component
│   │   ├── types.ts           # Frontend type definitions
│   │   ├── NavigationPanel.tsx # Channel navigation sidebar
│   │   ├── MessagesPanel.tsx   # Message display area
│   │   ├── EditorPanel.tsx     # Message composition area
│   │   ├── ProfileView.tsx     # User profile onboarding
│   │   ├── index.tsx          # React app entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies and scripts
│   └── tsconfig.json          # TypeScript configuration
├── .gitignore                 # Git ignore rules
├── setup.sh                   # Automated setup script
└── README.md                  # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Quick Setup (Recommended)

Run the automated setup script:

```bash
chmod +x setup.sh
./setup.sh
```

This will install dependencies for both frontend and backend, then start both development servers.

### Manual Setup

#### Backend Setup

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

   Or for production build:

   ```bash
   npm run build
   npm run start:prod
   ```

   The backend server will run on `http://localhost:3001`

#### Frontend Setup

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

   Or for production build:

   ```bash
   npm run build
   ```

   The frontend will run on `http://localhost:3000`

## Usage

1. **Initial Setup**: Open your browser and go to `http://localhost:3000`
2. **Profile Creation**: Complete the user profile onboarding (name, role, description, hobbies, profile picture)
3. **Channel Selection**: Choose a channel from the sidebar (General, Development, or Random)
4. **Message Composition**: Type your message in the editor at the bottom
5. **Keyboard Shortcuts**:
   - Press **Enter** to send a message
   - Press **Alt+Enter** to insert a new line
6. **Navigation**: Switch between channels to see different conversations
7. **Auto-scroll**: Messages automatically scroll to the latest, and the input field auto-focuses

## API Endpoints

### Channels

- `GET /api/channels` - Get all available channels

### Messages

- `GET /api/channels/:channelId/messages` - Get messages for a specific channel
- `POST /api/channels/:channelId/messages` - Create a new message in a channel
- `DELETE /api/messages/:id` - Delete a message (admin functionality)

## Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **ts-node** - TypeScript execution for Node.js
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

### Frontend

- **React.js** - UI library
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **React Scripts** - Build tooling and development server

### Development Tools

- **TypeScript** - Full type safety across the stack
- **ESLint** - Code linting and formatting
- **Nodemon** - Development server auto-restart

## Architecture & Design

### Frontend Architecture

- **Component-based design** with React and TypeScript
- **Three-panel layout**: Navigation sidebar, messages area, and message editor
- **Type-safe state management** with React hooks and TypeScript interfaces
- **Modular components**: `NavigationPanel`, `MessagesPanel`, `EditorPanel`, `ProfileView`
- **Responsive CSS** with mobile-first design approach

### Backend Architecture

- **RESTful API** with Express.js and TypeScript
- **In-memory data storage** with proper TypeScript interfaces
- **Channel-based message organization**
- **Type-safe request/response handling**

### Key Features Implementation

- **Auto-scroll behavior**: Messages automatically scroll to bottom on new content
- **Keyboard shortcuts**: Enhanced UX with Enter/Alt+Enter handling
- **Profile persistence**: User data stored in localStorage with proper typing
- **Message chronology**: Messages sorted oldest-to-newest for natural conversation flow

## Development Notes

- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Data Persistence**: Messages stored in memory (consider database for production)
- **Error Handling**: Comprehensive error states and loading indicators
- **Responsive Design**: Optimized for both mobile and desktop experiences
- **Modern UX**: Auto-focus, keyboard shortcuts, and smooth scrolling
- **Modular Architecture**: Easy to extend with new features

## Future Enhancements

- **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
- **Real-time Updates**: WebSocket implementation for live message updates
- **User Authentication**: JWT-based authentication and authorization
- **Message Threading**: Reply functionality and conversation threading
- **File Uploads**: Image and document sharing capabilities
- **Advanced Search**: Full-text search across messages and channels
- **Custom Channels**: User-created channels and channel management
- **Notifications**: Push notifications for new messages
- **Message Reactions**: Emoji reactions and message interactions
- **Dark Mode**: Theme switching and user preferences
- **Admin Panel**: Channel and user management interface
- **API Rate Limiting**: Request throttling and abuse prevention

## License

MIT License
