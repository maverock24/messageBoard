# Message Board Workspace

This project is organized as an npm workspace with three packages:

## 📁 Workspace Structure

```
messageBoard/
├── backend/              # Express.js API server
├── frontend/             # React.js web application  
├── packages/
│   └── shared/          # Shared types and utilities
└── package.json         # Workspace root configuration
```

## 🔧 Workspace Setup

This project uses **npm workspaces** to manage multiple related packages. The workspace includes:

- **Backend**: TypeScript Express.js server
- **Frontend**: React TypeScript application
- **Shared**: Common types, interfaces, and utilities

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Build All Packages
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

### Individual Package Commands

#### Shared Package
```bash
npm run build:shared     # Build shared types
npm run dev:shared       # Watch mode for shared package
```

#### Backend
```bash
npm run dev:backend      # Start backend in development mode
npm run build:backend    # Build backend
```

#### Frontend
```bash
npm run dev:frontend     # Start frontend development server
npm run build:frontend   # Build frontend for production
```

## 📦 Shared Package (@message-board/shared)

The shared package contains:

### Types
- `Channel` - Channel information
- `Message` - Message data structure
- `CreateMessageRequest` - API request format
- `UserProfile` - User profile data
- `ApiResponse<T>` - Generic API response wrapper
- `MessageFormData` - Form data interfaces
- `UserProfileFormData` - Profile form data

### Utilities
- `formatTimestamp(timestamp: string)` - Format timestamps for display
- `validateMessageContent(content: string)` - Validate message content
- `validateChannelName(name: string)` - Validate channel names
- `sanitizeInput(input: string)` - Sanitize user input
- `generateId()` - Generate simple IDs

### Usage in Projects

#### Backend
```typescript
import { Channel, Message, CreateMessageRequest } from '@message-board/shared';
```

#### Frontend
```typescript
import { Channel, Message, formatTimestamp } from '@message-board/shared';
```

## 🛠 Development Workflow

1. **Make changes to shared types/utilities**: Edit files in `packages/shared/src/`
2. **Build shared package**: `npm run build:shared`
3. **The changes automatically become available** in both frontend and backend

## 📝 Scripts

### Root Level Commands
- `npm run build` - Build all packages
- `npm run dev` - Run all packages in development mode
- `npm run lint` - Lint all packages
- `npm run lint:fix` - Fix linting issues across all packages
- `npm run clean` - Clean build artifacts

### Package-Specific Commands
- `npm run build:shared` - Build shared package only
- `npm run build:backend` - Build backend only
- `npm run build:frontend` - Build frontend only
- `npm run dev:shared` - Watch shared package
- `npm run dev:backend` - Run backend dev server
- `npm run dev:frontend` - Run frontend dev server

## 🔗 Package Dependencies

The workspace automatically manages internal dependencies:

- **Backend** depends on `@message-board/shared`
- **Frontend** depends on `@message-board/shared`
- Changes to shared package are immediately available to dependent packages

## ⚡ Benefits of This Setup

1. **Type Safety**: Shared types ensure consistency between frontend and backend
2. **Code Reuse**: Common utilities and validations are shared
3. **Simplified Development**: Single `npm install` and unified scripts
4. **Automatic Updates**: Changes to shared code are immediately available
5. **Unified Linting**: Consistent code style across all packages

## 🏗 Build Process

1. **Shared package** is built first (generates TypeScript definitions)
2. **Backend** and **Frontend** can then use the shared types
3. All packages can be built independently or together

## 📋 Package Management

- Use `npm install` at the root to install dependencies for all packages
- Dependencies are hoisted to the root `node_modules` when possible
- Each package maintains its own `package.json` for specific dependencies
