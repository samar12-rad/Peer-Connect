# Quick Start - AWS Deployment

**Time Required**: 1-2 hours for initial setup

## 🚀 Ultra-Quick Deployment Path

### 1. Prerequisites (15 min)

```bash
# Install AWS CLI
# Windows: https://awscli.amazonaws.com/AWSCLIV2.msi
# Mac: brew install awscli
# Linux: sudo apt install awscli

# Configure AWS
aws configure
```

### 2. Backend on EC2 (30 min)

**Launch EC2**:

- Ubuntu 22.04, t2.small
- Security: SSH(22), HTTP(80), HTTPS(443)
- Save .pem key

**Setup**:

```bash
ssh -i key.pem ubuntu@EC2_IP
sudo apt update && sudo apt install -y nodejs npm nginx git
sudo npm i -g pm2
sudo mkdir -p /var/www/peer-connect-backend
sudo chown ubuntu:ubuntu /var/www/peer-connect-backend
cd /var/www/peer-connect-backend
git clone YOUR_REPO .
cd Peer-Connect-Backend
npm ci --only=production
```

**Configure**:

```bash
# Edit .env.production with actual values
nano .env.production

# Setup Nginx (copy from nginx.conf file)
sudo nano /etc/nginx/sites-available/peer-connect
sudo ln -s /etc/nginx/sites-available/peer-connect /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Start app
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

**Test**: `curl http://EC2_IP/health`

### 3. Frontend on S3 + CloudFront (30 min)

**Create S3 Bucket**:

- Name: `peer-connect-frontend-YOUR-NAME`
- Uncheck "Block all public access"
- Enable static hosting (index: index.html, error: index.html)
- Add bucket policy from `s3-bucket-policy.json`

**Create CloudFront**:

- Origin: S3 bucket website endpoint
- Redirect HTTP → HTTPS
- Custom errors: 403→/index.html(200), 404→/index.html(200)
- Wait 10 minutes
- Copy CloudFront domain

**Deploy Frontend**:

```bash
cd Peer-Connect-Frontend
# Update .env.production with EC2 URL
nano .env.production

# Build & deploy
npm run build
aws s3 sync dist/ s3://YOUR-BUCKET/
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### 4. Final Steps (15 min)

**Update CORS**:

```bash
ssh -i key.pem ubuntu@EC2_IP
nano /var/www/peer-connect-backend/Peer-Connect-Backend/.env.production
# Add CloudFront URL to CORS_ORIGINS
pm2 restart all
```

**Test Everything**:

- Open CloudFront URL
- Create account
- Test chat features

## ✅ Success Checklist

- [ ] Backend health check responds
- [ ] Frontend loads from CloudFront
- [ ] User registration works
- [ ] Login works
- [ ] Socket.IO connects
- [ ] No CORS errors in console

## 📊 Deployment URLs

Add these to your notes:

```
Backend:
- Health: http://EC2_IP/health
- API: http://EC2_IP/api/v1

Frontend:
- CloudFront: https://XXX.cloudfront.net

Monitoring:
- PM2: `pm2 monit`
- Logs: `pm2 logs`
```

## 🔧 Common Issues

**502 Bad Gateway**:

```bash
pm2 restart all
sudo systemctl restart nginx
```

**CORS errors**:

```bash
# Add CloudFront URL to backend .env
pm2 restart all
```

**Frontend not updating**:

```bash
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

## 📚 Full Documentation

- **Complete Guide**: [AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **Security**: [SECURITY_GUIDE.md](SECURITY_GUIDE.md)
- **CI/CD**: [.github/CICD_SETUP.md](.github/CICD_SETUP.md)

## 💡 Pro Tips

1. Use **t2.small** minimum for EC2 (t2.micro too small)
2. Set up **SSL** immediately (Let's Encrypt is free)
3. Enable **CloudWatch alarms** for monitoring
4. Use **GitHub Actions** for auto-deployment
5. Keep **.env** files backed up securely

## 💰 Cost Estimate

- EC2 t2.small: ~$17/mo
- S3 + CloudFront: ~$8-10/mo
- **Total: ~$25-30/mo**

Reduce costs:

- Reserved Instance (save 40%)
- Turn off EC2 when not needed (dev)

## 🆘 Need Help?

1. Check logs: `pm2 logs`
2. Review documentation links above
3. Check AWS service health dashboard

---

**You're ready to deploy! Follow the steps above. 🚀**
