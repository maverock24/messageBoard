#!/bin/bash

echo "🔧 Message Board Development Utilities"
echo "======================================"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    echo "🔍 Checking for processes on port $port..."
    
    if command_exists lsof; then
        local pids=$(lsof -ti:$port)
        if [ ! -z "$pids" ]; then
            echo "🛑 Killing processes on port $port: $pids"
            echo $pids | xargs kill -9
            echo "✅ Port $port cleared"
        else
            echo "✅ Port $port is already free"
        fi
    else
        echo "⚠️  lsof command not found. Skipping port cleanup."
    fi
}

# Function to clean project
clean_project() {
    echo "🧹 Cleaning project..."
    
    # Clean backend
    if [ -d "backend/node_modules" ]; then
        echo "   🗑️  Removing backend/node_modules..."
        rm -rf backend/node_modules
    fi
    
    if [ -d "backend/dist" ]; then
        echo "   🗑️  Removing backend/dist..."
        rm -rf backend/dist
    fi
    
    # Clean frontend
    if [ -d "frontend/node_modules" ]; then
        echo "   🗑️  Removing frontend/node_modules..."
        rm -rf frontend/node_modules
    fi
    
    if [ -d "frontend/build" ]; then
        echo "   🗑️  Removing frontend/build..."
        rm -rf frontend/build
    fi
    
    echo "✅ Project cleaned"
}

# Function to reinstall dependencies
reinstall_deps() {
    echo "📦 Reinstalling all dependencies..."
    
    # Backend
    echo "   📦 Installing backend dependencies..."
    cd backend && npm install
    if [ $? -ne 0 ]; then
        echo "❌ Backend installation failed"
        return 1
    fi
    
    # Frontend
    echo "   📦 Installing frontend dependencies..."
    cd ../frontend && npm install
    if [ $? -ne 0 ]; then
        echo "❌ Frontend installation failed"
        return 1
    fi
    
    cd ..
    echo "✅ All dependencies reinstalled"
}

# Function to check TypeScript compilation
check_typescript() {
    echo "🔍 Checking TypeScript compilation..."
    
    # Check backend
    echo "   🔍 Checking backend TypeScript..."
    cd backend
    npx tsc --noEmit
    if [ $? -ne 0 ]; then
        echo "❌ Backend TypeScript errors found"
        cd ..
        return 1
    fi
    
    # Check frontend
    echo "   🔍 Checking frontend TypeScript..."
    cd ../frontend
    npx tsc --noEmit
    if [ $? -ne 0 ]; then
        echo "❌ Frontend TypeScript errors found"
        cd ..
        return 1
    fi
    
    cd ..
    echo "✅ TypeScript compilation successful"
}

# Function to run builds
build_all() {
    echo "🏗️  Building all projects..."
    
    # Build backend
    echo "   🏗️  Building backend..."
    cd backend && npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Backend build failed"
        return 1
    fi
    
    # Build frontend
    echo "   🏗️  Building frontend..."
    cd ../frontend && npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Frontend build failed"
        return 1
    fi
    
    cd ..
    echo "✅ All builds successful"
}

# Function to show project status
show_status() {
    echo "📊 Project Status:"
    echo "=================="
    
    # Check if dependencies are installed
    if [ -d "backend/node_modules" ]; then
        echo "✅ Backend dependencies installed"
    else
        echo "❌ Backend dependencies missing"
    fi
    
    if [ -d "frontend/node_modules" ]; then
        echo "✅ Frontend dependencies installed"
    else
        echo "❌ Frontend dependencies missing"
    fi
    
    # Check if builds exist
    if [ -d "backend/dist" ]; then
        echo "✅ Backend build exists"
    else
        echo "⚠️  Backend not built"
    fi
    
    if [ -d "frontend/build" ]; then
        echo "✅ Frontend build exists"
    else
        echo "⚠️  Frontend not built"
    fi
    
    # Check TypeScript files
    echo ""
    echo "📁 TypeScript Files:"
    echo "   Backend: $(find backend -name "*.ts" | wc -l) files"
    echo "   Frontend: $(find frontend/src -name "*.ts" -o -name "*.tsx" | wc -l) files"
    
    # Check for running processes
    echo ""
    echo "🔍 Process Check:"
    if command_exists lsof; then
        local backend_proc=$(lsof -ti:3001)
        local frontend_proc=$(lsof -ti:3000)
        
        if [ ! -z "$backend_proc" ]; then
            echo "🟢 Backend running on port 3001 (PID: $backend_proc)"
        else
            echo "🔴 Backend not running on port 3001"
        fi
        
        if [ ! -z "$frontend_proc" ]; then
            echo "🟢 Frontend running on port 3000 (PID: $frontend_proc)"
        else
            echo "🔴 Frontend not running on port 3000"
        fi
    else
        echo "⚠️  Cannot check running processes (lsof not available)"
    fi
}

# Main menu
echo "Select an option:"
echo "1. 📊 Show project status"
echo "2. 🛑 Kill processes on ports 3000 & 3001"
echo "3. 🧹 Clean project (remove node_modules & builds)"
echo "4. 📦 Reinstall all dependencies"
echo "5. 🔍 Check TypeScript compilation"
echo "6. 🏗️  Build all projects"
echo "7. 🔄 Full reset (clean + reinstall + build)"
echo "8. ❌ Exit"
echo ""
echo -n "Enter your choice (1-8): "
read choice

case $choice in
    1)
        show_status
        ;;
    2)
        kill_port 3000
        kill_port 3001
        ;;
    3)
        clean_project
        ;;
    4)
        reinstall_deps
        ;;
    5)
        check_typescript
        ;;
    6)
        build_all
        ;;
    7)
        echo "🔄 Performing full reset..."
        clean_project && reinstall_deps && build_all
        echo "✅ Full reset complete!"
        ;;
    8)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-8."
        exit 1
        ;;
esac

echo ""
echo "✨ Operation completed!"
