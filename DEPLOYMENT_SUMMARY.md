# AWS Deployment - Changes Summary

## Files Created

### Backend (Peer-Connect-Backend/)

1. **ecosystem.config.js** - PM2 process manager configuration
2. **.env.production** - Production environment variables template
3. **deploy.sh** - Automated deployment script for EC2
4. **nginx.conf** - Nginx reverse proxy configuration

### Frontend (Peer-Connect-Frontend/)

1. **deploy-to-s3.sh** - Automated S3 deployment script
2. **s3-bucket-policy.json** - S3 bucket policy for public access
3. **cloudfront-config-reference.json** - CloudFront configuration reference

### GitHub Actions (.github/workflows/)

1. **deploy-frontend.yml** - Auto-deploy frontend to S3/CloudFront on push
2. **deploy-backend.yml** - Auto-deploy backend to EC2 on push

### Documentation

1. **AWS_DEPLOYMENT_GUIDE.md** - Complete step-by-step deployment guide
2. **DEPLOYMENT_CHECKLIST.md** - Quick reference checklist
3. **.github/CICD_SETUP.md** - GitHub Actions setup guide

## Files Modified

### Backend

1. **index.js**:

   - Added health check endpoint (`/health`)
   - Updated CORS to allow CloudFront domains (`*.cloudfront.net`)

2. **package.json**:
   - Added `pm2` dependency for process management
   - Added `start:prod` script

### Frontend

1. **.env.production**:
   - Updated with AWS-specific configuration template
   - Added placeholders for EC2 backend URL

## Key Changes Explained

### Backend Changes

#### 1. Health Check Endpoint

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});
```

- Used by load balancers and monitoring tools
- Nginx uses it for health checks
- Available at: `http://your-server/health`

#### 2. CloudFront CORS Support

```javascript
origin.includes('cloudfront.net'); // Added to CORS check
```

- Allows requests from any CloudFront distribution
- Essential for frontend hosted on CloudFront

#### 3. PM2 Integration

- **Ecosystem config**: Manages Node.js processes with clustering
- **Auto-restart**: Automatically restarts on crashes
- **Log management**: Centralized logging
- **Zero-downtime**: Graceful shutdowns and restarts

### Frontend Changes

#### 1. AWS-Optimized Build

- Build script creates optimized production bundle
- Assets are fingerprinted for cache busting
- HTML files set to no-cache for fresh updates

#### 2. S3 Deployment

- Sync build files to S3
- Different cache headers for static assets vs HTML
- Automatic CloudFront invalidation

## Deployment Architecture

```
┌─────────────────┐
│   Users         │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   CloudFront (CDN)      │  ← Frontend (React SPA)
│   Global Edge Locations │
└────────┬────────────────┘
         │
         ▼
┌─────────────────┐
│   S3 Bucket     │  ← Static Files (HTML, JS, CSS)
└─────────────────┘
         │
         │ API Requests
         ▼
┌─────────────────────┐
│   EC2 Instance      │  ← Backend (Node.js + Express)
│   ┌───────────────┐ │
│   │   Nginx       │ │  ← Reverse Proxy + SSL
│   └───────┬───────┘ │
│           │         │
│   ┌───────▼───────┐ │
│   │   PM2         │ │  ← Process Manager
│   │ ┌───────────┐ │ │
│   │ │  Node.js  │ │ │  ← Application
│   │ └─────┬─────┘ │ │
│   └───────┼───────┘ │
└───────────┼─────────┘
            │
            ▼
┌─────────────────────┐
│  MongoDB Atlas      │  ← Database (Cloud)
└─────────────────────┘
```

## What You Need to Do

### 1. Before Deployment

#### Backend:

- [ ] Fill in `.env.production` with actual values:
  - MongoDB connection string
  - Generate JWT secrets (use crypto.randomBytes)
  - Cloudinary credentials

#### Frontend:

- [ ] Update `.env.production` with EC2 backend URL
- [ ] Update `deploy-to-s3.sh` with S3 bucket name and CloudFront ID

### 2. AWS Setup

#### Create Resources:

- [ ] Launch EC2 instance (Ubuntu, t2.small minimum)
- [ ] Create S3 bucket
- [ ] Create CloudFront distribution
- [ ] Configure security groups and IAM

### 3. Deployment

#### Backend (One-time setup):

```bash
# On EC2 instance
git clone <repo>
cd Peer-Connect-Backend
npm ci --only=production
chmod +x deploy.sh
./deploy.sh
```

#### Frontend (Repeatable):

```bash
# From your local machine
cd Peer-Connect-Frontend
./deploy-to-s3.sh
```

### 4. Optional: CI/CD

Set up GitHub Actions to auto-deploy:

- Configure GitHub Secrets (see CICD_SETUP.md)
- Push to main branch triggers deployment

## Cost Estimate (AWS)

**Monthly costs (approximate)**:

- EC2 t2.small: ~$17/month
- S3 Storage (10GB): ~$0.23/month
- CloudFront (100GB transfer): ~$8.50/month
- Data Transfer: ~$1-5/month
- **Total: ~$27-31/month**

Tips to reduce costs:

- Use Reserved Instances for EC2 (save 40-60%)
- Enable S3 Intelligent-Tiering
- Optimize CloudFront caching
- Monitor with AWS Cost Explorer

## Testing Your Deployment

### Backend Tests:

```bash
# Health check
curl http://your-ec2-ip/health

# API test
curl http://your-ec2-ip/api/v1/user/signup -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Frontend Tests:

1. Open CloudFront URL in browser
2. Check browser console (no CORS errors)
3. Test user flows (signup, login, chat)
4. Verify real-time features work

## Rollback Procedure

### Backend:

```bash
ssh into EC2
cd /var/www/peer-connect-backend
git checkout <previous-commit>
pm2 restart all
```

### Frontend:

```bash
aws s3 sync <backup-folder> s3://your-bucket/ --delete
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

## Next Steps

1. **Security**: Set up SSL with Let's Encrypt (free)
2. **Monitoring**: Configure CloudWatch alarms
3. **Backups**: Set up MongoDB backups
4. **Domain**: Configure custom domain (optional)
5. **CI/CD**: Set up GitHub Actions for auto-deployment

## Support

- **Full guide**: See [AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md)
- **Quick reference**: See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **CI/CD setup**: See [.github/CICD_SETUP.md](.github/CICD_SETUP.md)

## Important Notes

1. **Security**: Never commit `.env` files with actual credentials
2. **CORS**: Update backend after CloudFront is created
3. **Caching**: CloudFront changes take 5-15 min to propagate
4. **Costs**: Monitor AWS billing dashboard regularly
5. **SSL**: Highly recommended for production (use Let's Encrypt)

---

**Your code is now AWS-ready! Follow the guides to deploy. 🚀**
