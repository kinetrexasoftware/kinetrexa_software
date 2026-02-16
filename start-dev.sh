#!/bin/bash
echo "Starting KineTrexa Development Environment..."

# Start Backend
echo "🚀 Starting Backend on port 5000..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!

# Start Frontend
echo "🚀 Starting Frontend on port 3000..."
cd ../frontend
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
