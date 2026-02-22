# GitHub Actions CI/CD Setup

This repository includes automated deployment workflows for both frontend and backend.

## Required GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions → New repository secret

### Frontend Deployment Secrets

| Secret Name                  | Description                  | Example Value                              |
| ---------------------------- | ---------------------------- | ------------------------------------------ |
| `AWS_ACCESS_KEY_ID`          | AWS IAM access key           | `AKIAIOSFODNN7EXAMPLE`                     |
| `AWS_SECRET_ACCESS_KEY`      | AWS IAM secret key           | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `S3_BUCKET_NAME`             | S3 bucket name               | `peer-connect-frontend`                    |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID   | `E1234567890ABC`                           |
| `CLOUDFRONT_DOMAIN`          | CloudFront domain (optional) | `d123.cloudfront.net`                      |
| `VITE_API_BASE_URL`          | Backend API URL              | `https://api.yourbackend.com`              |
| `VITE_PROD_API_BASE_URL`     | Production backend URL       | `https://api.yourbackend.com`              |
| `VITE_SOCKET_URL`            | Socket.IO URL                | `https://api.yourbackend.com`              |
| `VITE_PROD_SOCKET_URL`       | Production socket URL        | `https://api.yourbackend.com`              |

### Backend Deployment Secrets

| Secret Name    | Description                     | Example Value                 |
| -------------- | ------------------------------- | ----------------------------- |
| `EC2_HOST`     | EC2 public IP or domain         | `3.123.45.67`                 |
| `EC2_USERNAME` | SSH username                    | `ubuntu`                      |
| `EC2_SSH_KEY`  | Private key content (.pem file) | Copy entire .pem file content |

## Setting Up EC2 SSH Key Secret

1. Open your `.pem` file in a text editor
2. Copy the entire content including:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   ...
   -----END RSA PRIVATE KEY-----
   ```
3. Paste in GitHub Secrets → `EC2_SSH_KEY`

## IAM User Setup for Frontend Deployment

1. Go to AWS Console → IAM → Users → Add User
2. User name: `github-actions-deploy`
3. Attach policies:
   - `AmazonS3FullAccess` (or create custom policy with only necessary permissions)
   - Custom CloudFront policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "arn:aws:cloudfront::*:distribution/*"
    }
  ]
}
```

4. Create access key → Save credentials as GitHub Secrets

## Workflows

### Frontend Deployment (.github/workflows/deploy-frontend.yml)

- **Triggers**: Push to main branch (Peer-Connect-Frontend changes) or manual dispatch
- **Actions**:
  1. Checkout code
  2. Install dependencies
  3. Build with environment variables
  4. Deploy to S3
  5. Invalidate CloudFront cache

### Backend Deployment (.github/workflows/deploy-backend.yml)

- **Triggers**: Push to main branch (Peer-Connect-Backend changes) or manual dispatch
- **Actions**:
  1. SSH into EC2
  2. Pull latest code
  3. Install dependencies
  4. Restart PM2
  5. Health check

## Manual Trigger

You can manually trigger deployments:

1. Go to Actions tab
2. Select workflow (Deploy Frontend or Deploy Backend)
3. Click "Run workflow"
4. Select branch
5. Click "Run workflow"

## Monitoring Deployments

- GitHub Actions tab shows deployment status
- Click on workflow run to see detailed logs
- Failed deployments will send notifications (configure in repository settings)

## Best Practices

1. **Test locally** before pushing to main
2. **Create feature branches** for development
3. **Use pull requests** for code review before merging to main
4. **Monitor deployments** in Actions tab
5. **Check application** after deployment

## Troubleshooting

**Frontend deployment fails**:

- Check AWS credentials are correct
- Verify S3 bucket and CloudFront ID
- Check IAM permissions

**Backend deployment fails**:

- Verify EC2 SSH key is correct (including headers)
- Check EC2 host is accessible
- Ensure application path on EC2 is correct

**Build fails**:

- Check all environment variables are set
- Review build logs in Actions tab
- Test build locally: `npm run build`

## Alternative: Deploy Branches

To deploy feature branches to staging, modify workflows:

```yaml
on:
  push:
    branches:
      - main
      - staging
```

Then use different secrets for staging environment.

---

**Your deployments are now automated! 🚀**
