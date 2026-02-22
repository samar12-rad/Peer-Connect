# Quick Deployment Checklist

## Pre-Deployment Preparation

### Backend Setup

- [ ] Copy `.env.production` template and fill in actual values
- [ ] Generate strong JWT_SECRET and SESSION_SECRET
- [ ] Update MongoDB connection string
- [ ] Add Cloudinary credentials
- [ ] Install PM2: `npm install -g pm2`

### Frontend Setup

- [ ] Update `.env.production` with backend EC2 URL
- [ ] Update `deploy-to-s3.sh` with S3 bucket name and CloudFront ID
- [ ] Install AWS CLI and configure credentials

---

## Backend Deployment (EC2)

### 1. Launch EC2 Instance

- [ ] Ubuntu 22.04 LTS
- [ ] t2.small or t3.small
- [ ] Security Groups: SSH (22), HTTP (80), HTTPS (443)
- [ ] Download key pair (.pem file)

### 2. Connect & Install Software

```bash
ssh -i "key.pem" ubuntu@EC2_IP
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

### 3. Deploy Application

```bash
sudo mkdir -p /var/www/peer-connect-backend
sudo chown -R ubuntu:ubuntu /var/www/peer-connect-backend
cd /var/www/peer-connect-backend
git clone YOUR_REPO_URL .
cd Peer-Connect-Backend
npm ci --only=production
# Upload .env file
chmod +x deploy.sh
./deploy.sh
```

### 4. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/peer-connect
# Paste nginx.conf content
sudo ln -s /etc/nginx/sites-available/peer-connect /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Verify

- [ ] `pm2 status` shows running app
- [ ] `curl http://localhost:3000/health` returns success
- [ ] `curl http://EC2_IP/health` returns success

---

## Frontend Deployment (S3 + CloudFront)

### 1. Create S3 Bucket

- [ ] Unique bucket name
- [ ] Uncheck "Block all public access"
- [ ] Enable static website hosting
- [ ] Index: `index.html`, Error: `index.html`
- [ ] Apply bucket policy from `s3-bucket-policy.json`

### 2. Create CloudFront Distribution

- [ ] Origin: S3 bucket website endpoint
- [ ] Viewer protocol: Redirect HTTP to HTTPS
- [ ] Custom error responses: 403→/index.html (200), 404→/index.html (200)
- [ ] Wait for deployment (5-15 min)
- [ ] Copy CloudFront domain

### 3. Update & Deploy

```bash
cd Peer-Connect-Frontend
# Update .env.production with EC2 backend URL
nano .env.production
# Update deploy script
nano deploy-to-s3.sh
chmod +x deploy-to-s3.sh
./deploy-to-s3.sh
```

### 4. Verify

- [ ] Open CloudFront URL in browser
- [ ] Check console for errors
- [ ] Test signup/login
- [ ] Verify Socket.IO connection

---

## Post-Deployment

### 1. Update Backend CORS

```bash
ssh -i "key.pem" ubuntu@EC2_IP
nano /var/www/peer-connect-backend/Peer-Connect-Backend/.env.production
# Add CloudFront URL to CORS_ORIGINS
pm2 restart all
```

### 2. SSL Setup (Optional but Recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 3. Testing

- [ ] User registration works
- [ ] Login works
- [ ] Real-time features work
- [ ] Image upload works (Cloudinary)
- [ ] No CORS errors in console

---

## Monitoring

```bash
# Backend
pm2 status
pm2 logs
pm2 monit

# System
df -h  # Disk space
htop   # Resources
```

---

## Quick Fixes

**502 Bad Gateway**:

```bash
pm2 restart all
sudo systemctl restart nginx
```

**CORS Errors**:

- Add CloudFront URL to backend .env CORS_ORIGINS
- Restart: `pm2 restart all`

**Old Frontend Content**:

```bash
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## Important URLs

- Backend Health: `http://EC2_IP/health`
- Backend API: `http://EC2_IP/api/v1`
- Frontend: `https://CLOUDFRONT_DOMAIN.cloudfront.net`

---

## Files Created/Modified

### Backend

- `ecosystem.config.js` - PM2 configuration
- `.env.production` - Production environment variables
- `deploy.sh` - Deployment script
- `nginx.conf` - Nginx reverse proxy config
- `package.json` - Added PM2 dependency

### Frontend

- `.env.production` - Production environment variables
- `deploy-to-s3.sh` - S3 deployment script
- `s3-bucket-policy.json` - S3 bucket policy
- `cloudfront-config-reference.json` - CloudFront setup reference

---

**Ready to deploy!** Follow the checklist step by step. 🚀
