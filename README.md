# Message Board

A modern, full-stack channel-based message board application built with React + TypeScript (frontend) and Node.js/Express + TypeScript (backend), organized as an npm workspace with shared types.

## Features

- 🏢 **Channel-based messaging** - Organize conversations by topic
- 📝 **Rich message posting** - Post messages with author attribution  
- 👤 **User profiles** - Complete onboarding with name, role, description, hobbies, and profile pictures
- ⌨️ **Keyboard shortcuts** - Enter to send, Alt+Enter for new lines
- 📱 **Responsive design** - Works seamlessly on mobile and desktop
- 🎨 **Modern, beautiful UI** - Clean three-panel layout with smooth animations
- 🔄 **Auto-scroll & focus** - Automatically scrolls to latest messages and focuses input
- 💾 **Local storage** - User profiles persist across sessions with robust error handling
- 🎯 **TypeScript support** - Full type safety across frontend and backend
- ⚡ **React best practices** - Custom hooks, memoization, error boundaries
- 🚨 **Error handling** - Graceful error recovery with user-friendly messages
- 🔄 **Optimistic updates** - Instant UI feedback for better user experience

## Architecture

### NPM Workspace Structure

```text
messageBoard/
├── backend/              # Express.js API server
├── frontend/             # React.js web application  
├── common/               # Shared types and utilities
└── package.json          # Workspace root configuration
```

This project uses **npm workspaces** to manage multiple related packages with automatic dependency resolution through symbolic links.

### Common Package

The `common/` workspace contains shared code used by both frontend and backend:

**Types**: `Channel`, `Message`, `CreateMessageRequest`, `UserProfile`, `ApiResponse<T>`, form data interfaces  
**Utilities**: `formatTimestamp()`, `validateMessageContent()`, `validateChannelName()`, `sanitizeInput()`, `generateId()`

**Usage**:

```typescript
// Backend
import { Channel, Message, CreateMessageRequest } from 'common';

// Frontend  
import type { Channel, Message } from 'common';
```

## Getting Started

### Quick Start

```bash
# Install all dependencies
npm install

# Build all packages
npm run build

# Development mode (builds common → starts backend & frontend)
npm run dev
```

### Individual Commands

```bash
# Build specific packages
npm run build:common      # Build shared types
npm run build:backend     # Build backend
npm run build:frontend    # Build frontend

# Development
npm run dev:backend       # Start backend (http://localhost:3001)
npm run dev:frontend      # Start frontend (http://localhost:3000)

# Linting
npm run lint              # Lint all workspaces
npm run lint:fix          # Auto-fix linting issues

# Testing
npm test                  # Run all tests
npm run test:common       # Run common package tests only
npm run test:coverage     # Run tests with coverage report
```

## Development

### Project Structure

```text
frontend/src/
├── App.tsx                    # Main application component
├── types.ts                   # Re-exports from common + component props
├── components/
│   ├── ErrorBoundary.tsx      # Error handling
│   └── LoadingSpinner.tsx     # Loading indicators
├── hooks/                     # Custom React hooks
│   ├── useChannels.ts         # Channel management
│   ├── useMessages.ts         # Message state management
│   ├── useUserProfile.ts      # User profile handling
│   ├── useMessageSubmission.ts # Form submission logic
│   └── useStorage.ts          # Local/session storage utilities
├── utils/
│   └── helpers.ts             # Re-exports from common + frontend utilities
├── context/
│   └── AppContext.tsx         # Global state management
├── NavigationPanel.tsx        # Channel navigation sidebar
├── MessagesPanel.tsx          # Message display area
├── EditorPanel.tsx            # Message composition
└── ProfileView.tsx            # User profile modal

backend/
├── server.ts                  # Main server file
├── package.json               # Backend dependencies
└── tsconfig.json              # TypeScript configuration

common/src/
├── index.ts                   # Main entry point
├── types.ts                   # Core domain types
└── utils.ts                   # Shared utility functions
```

### React Best Practices Implemented

**Custom Hooks**:

- `useChannels` - Channel loading state and API calls
- `useMessages` - Message state with optimistic updates
- `useUserProfile` - Profile management with localStorage
- `useMessageSubmission` - Form handling and validation
- `useStorage` - Type-safe localStorage/sessionStorage

**Performance Optimizations**:

- `React.memo` on major components
- `useCallback` for function memoization
- Optimistic updates for better UX
- Error boundaries for graceful error handling

**TypeScript Integration**:

- Full type safety across all components
- Shared types between frontend and backend
- Proper prop interfaces for all components

### ESLint Configuration

- **Backend**: Node.js environment with TypeScript support
- **Frontend**: React environment with TypeScript support
- **Shared**: Common linting rules across workspaces

### Testing

The project includes comprehensive unit tests for shared utilities:

- **Jest**: Test framework with TypeScript support
- **Coverage reporting**: HTML and text coverage reports
- **29 test cases** covering all utility functions:
  - `formatTimestamp()` - 8 test cases including edge cases
  - `validateMessageContent()` - 5 test cases for content validation
  - `validateChannelName()` - 5 test cases for channel name validation  
  - `sanitizeInput()` - 5 test cases for input sanitization
  - `generateId()` - 6 test cases for ID generation

**Test Commands**:
```bash
npm test                  # Run all tests
npm run test:common       # Run common package tests only
npm run test:coverage     # Run tests with coverage report
```

**Coverage**: 100% function and branch coverage for all utility functions

### API Endpoints

```text
GET    /api/channels           # List all channels
GET    /api/channels/:id/messages  # Get messages for channel
POST   /api/channels/:id/messages  # Create new message
```

## Architecture Decisions

### Workspace Benefits

- **Clean separation**: Shared code in `common/`, specific code in respective packages
- **No dependency pollution**: Automatic resolution via workspace symlinks
- **Build optimization**: Common package built first, then dependent packages
- **Type safety**: Shared types ensure consistency across frontend/backend

### Frontend Type Strategy

- **Re-exports**: Frontend `types.ts` re-exports from `common` plus component-specific props
- **Direct imports**: Components import directly from `common` when needed
- **Build compatibility**: Maintains React build compatibility while sharing core types

## Production Deployment

```bash
# Build all packages for production
npm run build

# Backend production
cd backend && npm run start:prod

# Frontend production
cd frontend && npm run build
# Serve frontend/build/ with your preferred static server
```

## Contributing

1. **Shared types**: Add to `common/src/types.ts`
2. **Shared utilities**: Add to `common/src/utils.ts`
3. **Frontend components**: Follow existing patterns with custom hooks
4. **Backend routes**: Add to `backend/server.ts`

All code should pass ESLint and TypeScript compilation before committing.
