#!/bin/bash

echo "🚀 Starting Message Board Application Setup..."
echo "📋 This will install dependencies and start both frontend and backend servers"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "   ✅ Backend server stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "   ✅ Frontend server stopped"
    fi
    echo "👋 Goodbye!"
    exit 0
}

# Trap signals to cleanup properly
trap cleanup SIGINT SIGTERM

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "⚠️  Node.js version $NODE_VERSION detected. Version 16 or higher is recommended."
    echo "   Current version: $(node --version)"
    echo "   Please consider upgrading for optimal TypeScript support."
fi

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js $(node --version) and npm $(npm --version) are installed"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies (Node.js + TypeScript)..."
cd backend

if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "✅ Backend dependencies installed successfully"

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies (React + TypeScript)..."
cd ../frontend

if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi

# Check for TypeScript version conflicts and use legacy peer deps if needed
echo "🔍 Checking for dependency conflicts..."

# First, try standard install
npm install > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "⚠️  Standard install failed due to peer dependency conflicts"
    echo "🔧 Attempting install with --legacy-peer-deps..."
    npm install --legacy-peer-deps
    
    if [ $? -ne 0 ]; then
        echo "⚠️  Legacy peer deps install failed, trying with --force..."
        npm install --force
        
        if [ $? -ne 0 ]; then
            echo "❌ All installation methods failed"
            echo ""
            echo "💡 Manual resolution required:"
            echo "   1. cd frontend"
            echo "   2. Check package.json for version conflicts"
            echo "   3. Try: npm install --legacy-peer-deps"
            echo "   4. Or: npm install --force"
            echo ""
            echo "🔍 Common issues:"
            echo "   - TypeScript version mismatch with react-scripts"
            echo "   - React types version conflicts"
            exit 1
        else
            echo "✅ Installation successful with --force flag"
        fi
    else
        echo "✅ Installation successful with --legacy-peer-deps"
    fi
else
    echo "✅ Installation successful"
fi

echo "✅ Frontend dependencies installed successfully"

# Build TypeScript backend to verify setup
echo ""
echo "🔧 Building TypeScript backend..."
cd ../backend
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Backend TypeScript build failed"
    exit 1
fi

echo "✅ Backend TypeScript build successful"

# Build React frontend to verify setup
echo ""
echo "🔧 Building React + TypeScript frontend..."
cd ../frontend
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo "✅ Frontend build successful"

echo ""
echo "🎉 Setup complete! All dependencies installed and builds verified."
echo ""
echo "🚀 Starting development servers..."
echo ""

# Function to start servers
start_servers() {
    echo "📡 Starting backend server (TypeScript)..."
    cd ../backend
    npm run dev &
    BACKEND_PID=$!
    
    # Wait a moment for backend to start
    sleep 3
    
    echo "🌐 Starting frontend server (React + TypeScript)..."
    cd ../frontend
    npm start &
    FRONTEND_PID=$!
    
    echo ""
    echo "🎯 Application is starting up..."
    echo ""
    echo "📍 Backend API: http://localhost:3001"
    echo "🌐 Frontend App: http://localhost:3000"
    echo ""
    echo "⌨️  Press Ctrl+C to stop both servers"
    echo ""
    
    # Wait for user to stop
    wait $FRONTEND_PID
}

# Ask user if they want to start servers automatically
echo "Would you like to start the development servers now? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    start_servers
else
    echo ""
    echo "✨ Manual startup instructions:"
    echo ""
    echo "1. Start the backend server (Terminal 1):"
    echo "   cd backend && npm run dev"
    echo ""
    echo "2. Start the frontend server (Terminal 2):"
    echo "   cd frontend && npm start"
    echo ""
    echo "3. Open http://localhost:3000 in your browser"
    echo ""
    echo "🔧 Available scripts:"
    echo "   Backend: npm run dev (development) | npm run build (production)"
    echo "   Frontend: npm start (development) | npm run build (production)"
    echo ""
    echo "📚 Features included:"
    echo "   ✅ TypeScript support (frontend & backend)"
    echo "   ✅ Channel-based messaging"
    echo "   ✅ User profiles with localStorage"
    echo "   ✅ Keyboard shortcuts (Enter to send, Alt+Enter for newline)"
    echo "   ✅ Auto-scroll and auto-focus"
    echo "   ✅ React best practices (custom hooks, memoization, error boundaries)"
    echo "   ✅ Responsive design"
fi
