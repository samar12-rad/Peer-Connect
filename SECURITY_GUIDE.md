# 🔒 Security & Configuration Guide

## Environment Files Strategy

### Files That SHOULD BE COMMITTED ✅

- `.env.production` (backend & frontend) - Templates with placeholder values
- `.envplate` (backend) - Template file

### Files That MUST NOT BE COMMITTED ❌

- `.env` - Your actual local development credentials
- `.env.local` - Local overrides
- Any file with real passwords, API keys, or secrets

### Current .gitignore Configuration

The `.gitignore` is already configured to:

- ✅ Ignore `.env` (actual credentials)
- ✅ Ignore `.env.local` variants
- ✅ Allow `.env.production` (templates only)

## Before Deployment Checklist

### 1. Environment Variables

- [ ] Backend `.env.production`: Replace ALL placeholders
  ```bash
  # Generate secure secrets
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Frontend `.env.production`: Update with actual EC2 URL
- [ ] Never commit files with real credentials

### 2. Secrets to Generate

```bash
# JWT Secret (64 characters hex)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Session Secret (64 characters hex)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Database Security

- [ ] Use strong MongoDB password
- [ ] Enable MongoDB network access only from EC2 IP
- [ ] Use MongoDB Atlas recommended settings
- [ ] Enable encryption at rest

### 4. AWS Security

- [ ] EC2 Security Group: Only allow necessary ports
- [ ] SSH (22): Only from your IP (not 0.0.0.0/0)
- [ ] Use strong EC2 key pair
- [ ] Never share or commit .pem files
- [ ] Rotate IAM access keys regularly

### 5. Application Security

- [ ] Enable HTTPS (Let's Encrypt SSL)
- [ ] Set secure cookies (httpOnly, secure, sameSite)
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Implement rate limiting
- [ ] Sanitize user inputs

## GitHub Secrets for CI/CD

If using GitHub Actions, configure these secrets (never commit them):

### Required Secrets

1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `S3_BUCKET_NAME`
4. `CLOUDFRONT_DISTRIBUTION_ID`
5. `EC2_HOST`
6. `EC2_USERNAME`
7. `EC2_SSH_KEY` (entire .pem file content)
8. `VITE_API_BASE_URL`
9. `VITE_SOCKET_URL`

## Credential Management Best Practices

### ✅ DO

- Use environment variables for all secrets
- Use different credentials for dev/staging/prod
- Rotate secrets regularly
- Use AWS Secrets Manager for production (advanced)
- Enable 2FA on all AWS accounts
- Review IAM policies regularly

### ❌ DON'T

- Commit `.env` files with real credentials
- Share credentials via email or chat
- Use same password across environments
- Hardcode secrets in source code
- Use weak/simple passwords

## EC2 Instance Security

### On First Login

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Enable firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

### Ongoing Maintenance

```bash
# Regular updates (run monthly)
sudo apt update && sudo apt upgrade -y

# Check for security updates
sudo unattended-upgrades --dry-run

# Monitor logs
sudo tail -f /var/log/auth.log  # SSH attempts
pm2 logs                         # App logs
```

## MongoDB Atlas Security

1. **Network Access**:

   - Add EC2 instance IP address
   - DON'T use 0.0.0.0/0 in production

2. **Database Access**:

   - Create dedicated user for application
   - Use strong password (20+ characters)
   - Limit privileges to necessary databases

3. **Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?options
   ```
   - Never commit this string
   - Store in `.env` only

## Cloudinary Security

1. **API Keys**:

   - Keep API secret confidential
   - Rotate keys if compromised
   - Use upload presets with restrictions

2. **Access Control**:
   - Configure allowed domains
   - Set upload limits
   - Enable signed uploads for sensitive content

## SSL/HTTPS Setup

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### After SSL Setup

Update backend `.env`:

```env
CORS_ORIGINS=https://your-cloudfront-domain.cloudfront.net
CLIENT_PATH=https://your-cloudfront-domain.cloudfront.net
```

## Incident Response

### If Credentials Are Compromised

**Immediate Actions**:

1. Rotate all affected credentials
2. Check access logs for unauthorized access
3. Update `.env` files
4. Restart services
5. Review recent deployments

**AWS**:

```bash
# Deactivate old access keys immediately
aws iam delete-access-key --access-key-id <old-key>

# Create new keys
aws iam create-access-key --user-name <username>
```

**MongoDB**:

1. Change database password
2. Update connection string
3. Restart application

**Application**:

```bash
# Generate new secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Update .env
nano .env.production

# Restart
pm2 restart all
```

## Monitoring & Alerts

### Set Up CloudWatch Alarms

- CPU utilization > 80%
- Disk space > 80%
- Memory usage > 80%
- HTTP 5xx errors

### Log Monitoring

```bash
# Backend logs
pm2 logs --lines 100

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

## Regular Security Audit Checklist

### Weekly

- [ ] Review PM2 logs for errors
- [ ] Check disk space
- [ ] Review access logs for suspicious activity

### Monthly

- [ ] Update system packages
- [ ] Update npm dependencies
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Review AWS CloudWatch metrics
- [ ] Check SSL certificate expiry

### Quarterly

- [ ] Rotate AWS access keys
- [ ] Update all passwords
- [ ] Review IAM policies
- [ ] Review security group rules
- [ ] Test backup restoration

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Emergency Contacts

- AWS Support: https://console.aws.amazon.com/support/
- MongoDB Atlas Support: https://support.mongodb.com/
- Cloudinary Support: https://support.cloudinary.com/

---

**Security is an ongoing process, not a one-time setup. Stay vigilant! 🔒**
