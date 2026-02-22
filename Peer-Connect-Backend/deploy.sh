#!/bin/bash

# EC2 Deployment Script for Peer Connect Backend
# This script should be run on your EC2 instance

echo "==================================="
echo "Peer Connect Backend Deployment"
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Stop existing PM2 process
echo -e "${YELLOW}Stopping existing PM2 processes...${NC}"
pm2 stop peer-connect-backend || true
pm2 delete peer-connect-backend || true

# Pull latest code (if using git)
echo -e "${YELLOW}Pulling latest code...${NC}"
git pull origin main || echo "Not a git repository or pull failed"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm ci --only=production

# Create logs directory if it doesn't exist
mkdir -p logs

# Start application with PM2
echo -e "${YELLOW}Starting application with PM2...${NC}"
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Setup PM2 to restart on system reboot
echo -e "${YELLOW}Setting up PM2 startup script...${NC}"
pm2 startup

echo -e "${GREEN}==================================="
echo -e "Deployment Complete!"
echo -e "===================================${NC}"
echo ""
echo "Run 'pm2 logs' to view application logs"
echo "Run 'pm2 status' to check application status"
echo "Run 'pm2 monit' to monitor application"
