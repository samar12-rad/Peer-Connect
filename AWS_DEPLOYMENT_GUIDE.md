# AWS Deployment Guide - Peer Connect

This guide walks you through deploying the Peer Connect application on AWS with:

- **Frontend**: AWS S3 + CloudFront (CDN)
- **Backend**: AWS EC2 instance

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment (EC2)](#backend-deployment-ec2)
3. [Frontend Deployment (S3 + CloudFront)](#frontend-deployment-s3--cloudfront)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Monitoring and Maintenance](#monitoring-and-maintenance)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools

- AWS Account with billing enabled
- AWS CLI v2 installed ([Download](https://aws.amazon.com/cli/))
- Node.js 18+ and npm
- Git
- SSH client

### AWS CLI Configuration

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: us-east-1 (or your preferred region)
# Default output format: json
```

---

## Backend Deployment (EC2)

### Step 1: Launch EC2 Instance

1. **Go to AWS Console** → EC2 → Launch Instance

2. **Configure Instance**:

   - **Name**: `peer-connect-backend`
   - **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type**: t2.small or t3.small (minimum recommended)
   - **Key Pair**: Create new or use existing (download .pem file)
   - **Network Settings**:
     - Allow SSH (port 22) from your IP
     - Allow HTTP (port 80) from anywhere (0.0.0.0/0)
     - Allow HTTPS (port 443) from anywhere (0.0.0.0/0)
   - **Storage**: 20 GB gp3 (minimum)

3. **Launch Instance** and wait for it to start

4. **Note your instance details**:
   - Public IPv4 address
   - Public IPv4 DNS

### Step 2: Connect to EC2 Instance

```bash
# Make key file read-only
chmod 400 your-key-pair.pem

# Connect via SSH
ssh -i "your-key-pair.pem" ubuntu@your-ec2-public-ip
```

### Step 3: Install Required Software on EC2

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

### Step 4: Set Up Application on EC2

```bash
# Create application directory
sudo mkdir -p /var/www/peer-connect-backend
sudo chown -R ubuntu:ubuntu /var/www/peer-connect-backend
cd /var/www/peer-connect-backend

# Clone your repository (or upload via SCP)
git clone https://github.com/samar12-rad/Peer-Connect.git .
cd Peer-Connect-Backend

# Install dependencies
npm ci --only=production

# Create logs directory
mkdir -p logs
```

### Step 5: Configure Environment Variables

```bash
# Create .env file
nano .env.production

# Copy content from Peer-Connect-Backend/.env.production template
# Update with your actual values:
# - MongoDB connection string
# - JWT secrets
# - Cloudinary credentials
# - CloudFront URL (you'll add this after frontend deployment)
```

**Important**: Generate strong secrets:

```bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 6: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/peer-connect

# Paste the content from nginx.conf file
# Update server_name with your domain or EC2 public IP

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/peer-connect /etc/nginx/sites-enabled/

# Remove default config
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Step 7: Start Application with PM2

```bash
# Start the application
pm2 start ecosystem.config.js --env production

# Or use the deploy script
chmod +x deploy.sh
./deploy.sh

# Check status
pm2 status
pm2 logs

# Save PM2 process list
pm2 save

# Set PM2 to start on boot
pm2 startup
# Run the command that PM2 outputs
```

### Step 8: Set Up SSL (Optional but Recommended)

```bash
# Install Certbot for Let's Encrypt SSL
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (certbot sets this up automatically)
sudo certbot renew --dry-run
```

### Step 9: Configure EC2 Security and Firewall

```bash
# Allow Nginx through UFW
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

**Your backend should now be running at**: `http://your-ec2-ip` or `https://your-domain.com`

**Test health endpoint**: `curl http://your-ec2-ip/health`

---

## Frontend Deployment (S3 + CloudFront)

### Step 1: Create S3 Bucket

1. **AWS Console** → S3 → Create Bucket

2. **Configure Bucket**:
   - **Name**: `peer-connect-frontend` (must be globally unique)
   - **Region**: us-east-1 (or your preferred region)
   - **Block Public Access**: UNCHECK "Block all public access"
   - Acknowledge the warning
   - Keep other settings as default
   - **Create Bucket**

### Step 2: Enable Static Website Hosting

1. Go to your bucket → **Properties**
2. Scroll to **Static website hosting** → **Edit**
3. **Enable** static website hosting
4. **Index document**: `index.html`
5. **Error document**: `index.html` (important for React Router)
6. **Save changes**

### Step 3: Configure Bucket Policy

1. Go to **Permissions** tab
2. Scroll to **Bucket policy** → **Edit**
3. Paste the content from `s3-bucket-policy.json`
4. Replace `your-bucket-name` with your actual bucket name
5. **Save changes**

### Step 4: Create CloudFront Distribution

1. **AWS Console** → CloudFront → Create Distribution

2. **Origin Settings**:

   - **Origin Domain**: Select your S3 bucket (use the website endpoint)
   - **Name**: S3-peer-connect
   - **Origin Access**: Public (S3 will handle access)

3. **Default Cache Behavior**:

   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - **Cache Policy**: CachingOptimized
   - **Origin Request Policy**: CORS-CustomOrigin

4. **Distribution Settings**:

   - **Price Class**: Use all edge locations (or choose based on your needs)
   - **Alternate Domain Names (CNAMEs)**: Add your custom domain if you have one
   - **SSL Certificate**: Default CloudFront certificate (or use custom if you have a domain)
   - **Default Root Object**: `index.html`

5. **Custom Error Responses** (Important for SPA routing):

   - Click **Create Custom Error Response**
   - **HTTP Error Code**: 404
   - **Customize Error Response**: Yes
   - **Response Page Path**: `/index.html`
   - **HTTP Response Code**: 200
   - Repeat for error code 403

6. **Create Distribution**

7. **Wait 5-15 minutes** for distribution to deploy
8. **Note your CloudFront domain**: `d1234567890abc.cloudfront.net`

### Step 5: Configure Frontend Environment

```bash
# Navigate to frontend directory
cd Peer-Connect-Frontend

# Update .env.production file
# Replace placeholders with actual values:
# - VITE_API_BASE_URL: Your EC2 backend URL (http://your-ec2-ip or https://your-domain.com)
# - VITE_SOCKET_URL: Same as API URL
```

Example `.env.production`:

```env
VITE_API_BASE_URL=https://api.yourbackend.com
VITE_PROD_API_BASE_URL=https://api.yourbackend.com
VITE_SOCKET_URL=https://api.yourbackend.com
VITE_PROD_SOCKET_URL=https://api.yourbackend.com
VITE_NODE_ENV=production
```

### Step 6: Build and Deploy Frontend

**Option A: Using the deployment script (recommended)**

```bash
# Update deploy-to-s3.sh with your values
nano deploy-to-s3.sh

# Set:
# - S3_BUCKET: your bucket name
# - CLOUDFRONT_DISTRIBUTION_ID: from CloudFront console
# - AWS_REGION: your region

# Make script executable
chmod +x deploy-to-s3.sh

# Run deployment
./deploy-to-s3.sh
```

**Option B: Manual deployment**

```bash
# Build the application
npm run build

# Deploy to S3
aws s3 sync dist/ s3://your-bucket-name/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

**Your frontend is now live at**: `https://your-cloudfront-domain.cloudfront.net`

---

## Post-Deployment Configuration

### 1. Update Backend CORS

Update your backend's `.env` file to include your CloudFront URL:

```bash
# SSH into EC2
ssh -i "your-key.pem" ubuntu@your-ec2-ip

# Edit .env
nano /var/www/peer-connect-backend/Peer-Connect-Backend/.env.production

# Add to CORS_ORIGINS:
CORS_ORIGINS=https://your-cloudfront-domain.cloudfront.net,https://your-custom-domain.com

# Restart backend
pm2 restart all
```

### 2. Test the Application

1. Open CloudFront URL in browser
2. Test user registration
3. Test login
4. Test real-time features (Socket.IO)
5. Check browser console for errors
6. Verify API calls are going to your backend

### 3. Set Up Custom Domain (Optional)

**For Frontend (CloudFront)**:

1. Register domain in Route 53 or your registrar
2. Request SSL certificate in ACM (us-east-1 region for CloudFront)
3. Add CNAME record pointing to CloudFront distribution
4. Update CloudFront distribution with custom domain

**For Backend (EC2)**:

1. Create A record pointing to EC2 IP
2. Update Nginx configuration with your domain
3. Get SSL certificate with Certbot (see Step 8 above)

---

## Monitoring and Maintenance

### Backend Monitoring

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs
pm2 logs peer-connect-backend --lines 100

# Monitor in real-time
pm2 monit

# Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Frontend Monitoring

- **CloudFront Console**: Monitor requests, data transfer, error rates
- **S3 Metrics**: Track bucket size and request metrics

### Set Up CloudWatch Alarms (Recommended)

1. EC2 CPU Utilization > 80%
2. EC2 Status Check Failed
3. CloudFront 4xx/5xx error rate

### Regular Maintenance

```bash
# Update backend dependencies monthly
npm audit
npm update

# Update system packages
sudo apt update && sudo apt upgrade -y

# Monitor disk space
df -h

# Clean up old PM2 logs
pm2 flush
```

---

## Troubleshooting

### Backend Issues

**App not starting**:

```bash
pm2 logs
# Check for errors in environment variables or database connection
```

**502 Bad Gateway**:

```bash
# Check if app is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart all
sudo systemctl restart nginx
```

**CORS errors**:

- Verify CloudFront URL is in CORS_ORIGINS
- Check Nginx proxy headers
- Restart PM2: `pm2 restart all`

### Frontend Issues

**404 errors on refresh**:

- Ensure CloudFront custom error responses are configured (403, 404 → /index.html)

**Assets not loading**:

```bash
# Clear CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_ID \
  --paths "/*"
```

**Old content showing**:

- Wait for CloudFront propagation (5-15 minutes)
- Clear browser cache
- Invalidate CloudFront cache

**API calls failing**:

- Check browser console for CORS errors
- Verify `.env.production` has correct backend URL
- Test backend health endpoint directly

### Database Connection Issues

```bash
# Test MongoDB connection
mongo "your-connection-string"

# Check if IP is whitelisted in MongoDB Atlas
# Add EC2 IP to MongoDB Atlas Network Access
```

---

## Cost Optimization Tips

1. **EC2**: Use t3.small instead of larger instances initially
2. **S3**: Enable lifecycle policies to clean up old versions
3. **CloudFront**: Use appropriate cache TTL to reduce origin requests
4. **Use CloudWatch** to monitor usage and optimize

---

## Security Checklist

- [ ] Strong JWT_SECRET and SESSION_SECRET generated
- [ ] MongoDB connection string uses credentials
- [ ] EC2 security group allows only necessary ports
- [ ] SSH access restricted to your IP
- [ ] SSL/HTTPS enabled (Let's Encrypt)
- [ ] Environment variables stored securely (not in git)
- [ ] Regular security updates applied
- [ ] CloudFront HTTPS enforced
- [ ] S3 bucket policy is restrictive

---

## Quick Reference

### Useful Commands

```bash
# Backend
pm2 restart all          # Restart backend
pm2 logs                 # View logs
pm2 monit                # Monitor processes
sudo systemctl restart nginx  # Restart Nginx

# Frontend
./deploy-to-s3.sh        # Deploy updates
aws cloudfront create-invalidation --distribution-id ID --paths "/*"

# System
df -h                    # Check disk space
htop                     # Monitor system resources
sudo ufw status          # Check firewall
```

### Important URLs

- EC2 Health Check: `http://your-ec2-ip/health`
- Backend API: `http://your-ec2-ip/api/v1`
- Frontend: `https://your-cloudfront-domain.cloudfront.net`

---

## Support

For issues or questions:

1. Check logs first (PM2, Nginx, CloudWatch)
2. Review this guide's troubleshooting section
3. Check AWS documentation
4. Review application error logs

---

## Next Steps

1. Set up CI/CD pipeline with GitHub Actions
2. Configure automated backups for MongoDB
3. Set up log aggregation (e.g., CloudWatch Logs)
4. Implement rate limiting
5. Add monitoring and alerting
6. Set up staging environment

---

**Congratulations! Your Peer Connect application is now deployed on AWS! 🎉**
