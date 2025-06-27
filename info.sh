#!/bin/bash

echo "📖 Message Board Application - Development Guide"
echo "=================================================="
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system requirements
echo "🔍 System Requirements Check:"
echo "------------------------------"

if command_exists node; then
    echo "✅ Node.js: $(node --version)"
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        echo "   ⚠️  Recommended: v16 or higher"
    fi
else
    echo "❌ Node.js: Not installed"
fi

if command_exists npm; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm: Not installed"
fi

if command_exists git; then
    echo "✅ Git: $(git --version)"
else
    echo "❌ Git: Not installed"
fi

echo ""
echo "📂 Project Structure:"
echo "--------------------"
echo "MessageBoard/"
echo "├── 📁 backend/          # Node.js + TypeScript API"
echo "│   ├── server.ts        # Main server file"
echo "│   ├── types.ts         # Type definitions"
echo "│   ├── tsconfig.json    # TypeScript config"
echo "│   └── package.json     # Dependencies & scripts"
echo "├── 📁 frontend/         # React + TypeScript UI"
echo "│   ├── src/"
echo "│   │   ├── App.tsx      # Main component"
echo "│   │   ├── hooks/       # Custom React hooks"
echo "│   │   ├── components/  # Reusable components"
echo "│   │   ├── utils/       # Helper functions"
echo "│   │   └── types.ts     # Type definitions"
echo "│   ├── tsconfig.json    # TypeScript config"
echo "│   └── package.json     # Dependencies & scripts"
echo "├── setup.sh             # Automated setup script"
echo "├── info.sh              # This file"
echo "└── README.md            # Documentation"

echo ""
echo "🚀 Quick Start Commands:"
echo "------------------------"
echo "1. Run setup:           ./setup.sh"
echo "2. Backend only:        cd backend && npm run dev"
echo "3. Frontend only:       cd frontend && npm start"
echo "4. Build backend:       cd backend && npm run build"
echo "5. Build frontend:      cd frontend && npm run build"

echo ""
echo "🔧 Available Scripts:"
echo "--------------------"
echo "Backend:"
echo "  npm run dev          Start development server with ts-node"
echo "  npm run build        Compile TypeScript to JavaScript"
echo "  npm run start:prod   Run compiled JavaScript (production)"
echo ""
echo "Frontend:"
echo "  npm start            Start development server with hot reload"
echo "  npm run build        Create production build"
echo "  npm test             Run test suite"

echo ""
echo "🌐 Development URLs:"
echo "-------------------"
echo "Frontend:  http://localhost:3000"
echo "Backend:   http://localhost:3001"
echo "API Base:  http://localhost:3001/api"

echo ""
echo "📋 API Endpoints:"
echo "-----------------"
echo "GET    /api/channels                     # Get all channels"
echo "GET    /api/channels/:id/messages        # Get channel messages"
echo "POST   /api/channels/:id/messages        # Send new message"
echo "DELETE /api/messages/:id                 # Delete message"

echo ""
echo "✨ Features:"
echo "------------"
echo "🏢 Channel-based messaging"
echo "👤 User profile management"
echo "⌨️  Keyboard shortcuts (Enter/Alt+Enter)"
echo "📱 Responsive design"
echo "🎨 Modern UI with auto-scroll"
echo "💾 Local storage for user data"
echo "🔧 Full TypeScript support"
echo "⚡ React best practices"
echo "🚨 Error boundaries"
echo "🔄 Optimistic updates"

echo ""
echo "🛠️  Troubleshooting:"
echo "--------------------"
echo "Port conflicts:"
echo "  - Kill process on port 3000: lsof -ti:3000 | xargs kill -9"
echo "  - Kill process on port 3001: lsof -ti:3001 | xargs kill -9"
echo ""
echo "Build issues:"
echo "  - Clear npm cache: npm cache clean --force"
echo "  - Delete node_modules and reinstall: rm -rf node_modules && npm install"
echo "  - Check TypeScript compilation: npx tsc --noEmit"
echo ""
echo "Browser issues:"
echo "  - Clear browser cache and storage"
echo "  - Try incognito/private mode"
echo "  - Check browser console for errors"

echo ""
echo "📚 Learn More:"
echo "--------------"
echo "React:      https://react.dev/"
echo "TypeScript: https://typescriptlang.org/"
echo "Node.js:    https://nodejs.org/"
echo "Express:    https://expressjs.com/"

echo ""
echo "🎯 Happy coding! 🚀"
