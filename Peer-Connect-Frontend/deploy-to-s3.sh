#!/bin/bash

# S3 + CloudFront Deployment Script for Peer Connect Frontend
# Run this script from the frontend directory

echo "==================================="
echo "Peer Connect Frontend Deployment"
echo "==================================="

# Configuration - UPDATE THESE VALUES
S3_BUCKET="your-s3-bucket-name"           # e.g., peer-connect-frontend
CLOUDFRONT_DISTRIBUTION_ID="your-distribution-id"  # e.g., E1234567890ABC
AWS_REGION="us-east-1"                    # Your AWS region

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed.${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo -e "${RED}Error: .env.production file not found!${NC}"
    echo "Create it with your production environment variables."
    exit 1
fi

# Build the application
echo -e "${YELLOW}Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# Sync files to S3
echo -e "${YELLOW}Deploying to S3...${NC}"
aws s3 sync dist/ s3://$S3_BUCKET/ \
    --region $AWS_REGION \
    --delete \
    --cache-control "public,max-age=31536000,immutable" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML files with no-cache to ensure fresh content
echo -e "${YELLOW}Uploading HTML files...${NC}"
aws s3 sync dist/ s3://$S3_BUCKET/ \
    --region $AWS_REGION \
    --exclude "*" \
    --include "*.html" \
    --include "*.json" \
    --cache-control "public,max-age=0,must-revalidate"

# Invalidate CloudFront cache
echo -e "${YELLOW}Invalidating CloudFront cache...${NC}"
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"

echo -e "${GREEN}==================================="
echo -e "Deployment Complete!"
echo -e "===================================${NC}"
echo ""
echo "Your application is now live!"
echo "CloudFront may take 5-10 minutes to propagate changes globally."
