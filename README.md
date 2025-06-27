# MessageBoard

A modern, full-stack channel-based message board application built with React.js + TypeScript (frontend) and Node.js/Express + TypeScript (backend).

## Features

- 🏢 **Channel-based messaging** - Organize conversations by topic
- 📝 **Rich message posting** - Post messages with author attribution
- 👤 **User profiles** - Complete onboarding with name, role, description, hobbies, and profile pictures
- ⌨️ **Keyboard shortcuts** - Enter to send, Alt+Enter for new lines
- 📱 **Responsive design** - Works seamlessly on mobile and desktop
- 🎨 **Modern, beautiful UI** - Clean three-panel layout with smooth animations
- 🔄 **Auto-scroll & focus** - Automatically scrolls to latest messages and focuses input
- 📊 **Message ordering** - Messages sorted chronologically (oldest to newest)
- 💾 **Local storage** - User profiles persist across sessions with robust error handling
- 🎯 **TypeScript support** - Full type safety across frontend and backend
- ⚡ **React best practices** - Custom hooks, memoization, error boundaries
- 🚨 **Error handling** - Graceful error recovery with user-friendly messages
- 🔄 **Optimistic updates** - Instant UI feedback for better user experience
- 🛠️ **Developer tools** - Comprehensive setup and development utility scripts

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
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ErrorBoundary.tsx    # Error handling component
│   │   │   └── LoadingSpinner.tsx   # Loading indicators
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useChannels.ts       # Channel management
│   │   │   ├── useMessages.ts       # Message state management
│   │   │   ├── useUserProfile.ts    # User profile handling
│   │   │   ├── useMessageSubmission.ts # Form submission logic
│   │   │   └── useStorage.ts        # Local/session storage utilities
│   │   ├── utils/             # Utility functions
│   │   │   └── helpers.ts           # Common helper functions
│   │   ├── context/           # React Context providers
│   │   │   └── AppContext.tsx       # Global state management
│   │   ├── NavigationPanel.tsx # Channel navigation sidebar
│   │   ├── MessagesPanel.tsx   # Message display area
│   │   ├── EditorPanel.tsx     # Message composition area
│   │   ├── ProfileView.tsx     # User profile onboarding
│   │   ├── index.tsx          # React app entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies and scripts
│   └── tsconfig.json          # TypeScript configuration
├── .gitignore                 # Git ignore rules
├── setup.sh                   # Automated setup script with dependency handling
├── info.sh                    # Project information and development guide
├── dev-utils.sh              # Development utilities and troubleshooting
├── REACT_BEST_PRACTICES.md   # Documentation of implemented React patterns
└── README.md                  # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Quick Setup (Recommended)

Run the automated setup script that handles everything for you:

```bash
chmod +x setup.sh
./setup.sh
```

The setup script will:

- Check Node.js and npm versions
- Install dependencies for both frontend and backend
- Handle TypeScript/react-scripts version conflicts automatically
- Verify builds are working correctly
- Offer to start both development servers interactively

### Developer Utilities

For ongoing development, use the provided utility scripts:

```bash
# Get project overview and help
./info.sh

# Access development utilities (cleaning, port management, build/test tools)
./dev-utils.sh
```

### Troubleshooting

If you encounter dependency conflicts (especially with TypeScript and react-scripts), the `setup.sh` script handles these automatically. For manual troubleshooting, see the troubleshooting section in the script or run `./info.sh` for guidance.

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

### Frontend

- **React.js 18** - Modern UI library with concurrent features
- **TypeScript** - Strict type safety and enhanced developer experience
- **Custom React Hooks** - Modular state management and reusable logic
- **React Context API** - Global state management
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **React Scripts** - Build tooling and development server
- **Error Boundaries** - Graceful error handling and recovery

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimal and flexible web application framework
- **TypeScript** - Type-safe server-side development
- **ts-node** - TypeScript execution for Node.js development
- **CORS** - Cross-origin resource sharing middleware
- **UUID** - Unique identifier generation for messages and channels

### Development Tools & Utilities

- **TypeScript Compiler** - Strict type checking across the entire stack
- **Nodemon** - Development server auto-restart for backend
- **ESLint** - Code linting and style consistency
- **Automated Setup Scripts** - Bash scripts for project initialization and utilities
- **React Developer Tools** - Enhanced debugging and performance monitoring

## Architecture & Design

### Frontend Architecture

- **Modern React + TypeScript**: Full type safety with strict TypeScript configuration
- **Component-based design** with modular, reusable components
- **Three-panel layout**: Navigation sidebar, messages area, and message editor
- **Custom hooks architecture**:
  - `useChannels` - Channel state management
  - `useMessages` - Message fetching and state
  - `useUserProfile` - Profile management with localStorage
  - `useMessageSubmission` - Form handling and optimistic updates
  - `useStorage` - Robust localStorage/sessionStorage utilities
- **Error boundaries and loading states** for graceful error handling
- **React performance optimizations**: `React.memo`, `useCallback`, and `useMemo`
- **Context API** for global state management
- **Responsive CSS** with mobile-first design approach

### Backend Architecture

- **RESTful API** with Express.js and TypeScript
- **Type-safe request/response handling** with shared type definitions
- **In-memory data storage** with proper TypeScript interfaces
- **Channel-based message organization** with UUID-based identification
- **CORS-enabled** for cross-origin requests
- **Modular structure** with separate types and utilities

### Key Features Implementation

- **Auto-scroll behavior**: Messages automatically scroll to bottom on new content
- **Keyboard shortcuts**: Enhanced UX with Enter/Alt+Enter handling
- **Profile persistence**: User data stored in localStorage with error recovery
- **Message chronology**: Messages sorted oldest-to-newest for natural conversation flow
- **Optimistic updates**: Instant UI feedback while API calls are in progress
- **Error boundaries**: Graceful error recovery without full app crashes
- **Loading spinners**: User feedback during async operations

### Development Experience

- **Automated setup**: `setup.sh` handles all dependencies and version conflicts
- **Developer utilities**: `dev-utils.sh` provides cleaning, port management, and build tools
- **Comprehensive documentation**: `REACT_BEST_PRACTICES.md` documents all patterns used
- **TypeScript strict mode**: Maximum type safety across the entire codebase
- **Consistent code patterns**: Standardized hooks, components, and utilities

## Development Notes

### Code Quality & Best Practices

- **Full TypeScript implementation** across frontend and backend with strict type checking
- **React best practices**: Custom hooks, memoization, error boundaries, and proper component patterns
- **Modular architecture**: Separation of concerns with dedicated hooks, components, and utilities
- **Error handling**: Comprehensive error states, loading indicators, and graceful recovery
- **Performance optimizations**: React.memo, useCallback, and efficient re-rendering patterns

### Data Management

- **Type-safe state management** using React hooks and TypeScript interfaces
- **Optimistic updates** for better user experience during API calls
- **Local storage persistence** with robust error handling and data validation
- **In-memory backend storage** (consider database integration for production)

### Developer Experience

- **Automated setup scripts** handle dependencies, version conflicts, and initial setup
- **Comprehensive documentation** including React best practices guide
- **Development utilities** for project cleaning, port management, and troubleshooting
- **Hot reloading** and fast development iteration
- **Consistent coding patterns** throughout the codebase

### Production Considerations

- **TypeScript/react-scripts compatibility** handled automatically in setup
- **Build optimization** with proper TypeScript compilation
- **Environment-specific configurations** for development vs production
- **Error boundaries** prevent complete app crashes
- **Responsive design** optimized for all device sizes

## Project Documentation

### Setup & Development Scripts

- **`setup.sh`** - Automated project setup with dependency management and version conflict resolution
- **`info.sh`** - Project overview, architecture explanation, and development guidance
- **`dev-utils.sh`** - Development utilities including project cleaning, port management, and build/test tools

### Documentation Files

- **`README.md`** - This comprehensive project documentation
- **`REACT_BEST_PRACTICES.md`** - Detailed documentation of all React patterns, hooks, and optimizations implemented

### Configuration Files

- **Frontend**: `package.json`, `tsconfig.json` with strict TypeScript settings
- **Backend**: `package.json`, `tsconfig.json` with Node.js-specific TypeScript configuration

## Development Workflow

1. **Initial Setup**: Run `./setup.sh` to set up the entire project
2. **Development**: Use `./info.sh` for guidance and `./dev-utils.sh` for utilities
3. **Code Changes**: TypeScript provides compile-time error checking
4. **Testing**: Components include error boundaries and loading states
5. **Building**: Both frontend and backend have optimized build processes

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

## Contributing

1. **Setup**: Use `./setup.sh` to set up the development environment
2. **Code Style**: Follow TypeScript best practices and existing patterns
3. **Testing**: Ensure error boundaries and loading states work correctly
4. **Documentation**: Update README.md and relevant documentation files
5. **Best Practices**: Refer to `REACT_BEST_PRACTICES.md` for code patterns

## Support

- **Project Info**: Run `./info.sh` for comprehensive project guidance
- **Development Utils**: Use `./dev-utils.sh` for troubleshooting and utilities
- **Architecture**: See `REACT_BEST_PRACTICES.md` for implementation details

## License

MIT License
