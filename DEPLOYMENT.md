# Deployment Guide

This guide walks you through deploying Bitesizeblogs to Vercel and connecting your custom domain.

## Prerequisites

- GitHub account
- Vercel account (free, sign up at vercel.com)
- Domain purchased (bitesizeblogs.com on NameCheap)

## Step 1: Push Code to GitHub

### Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `bitesizeblogs`
3. Description: "A blog about movies, shows, sports, and pop culture"
4. Make it **Public** (easier for Vercel)
5. Click "Create repository"

### Push Your Code

```bash
cd /path/to/bitesizeblogs
git init
git add .
git commit -m "Initial commit: Bitesizeblogs blog platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bitesizeblogs.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Deploy to Vercel

### Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub (or create account)
3. Click "Import Project"
4. Select your GitHub repository (`bitesizeblogs`)
5. Click "Import"

### Configure Project

On the import screen:
- **Project Name**: `bitesizeblogs`
- **Framework Preset**: Select "Next.js"
- **Root Directory**: Leave as `.`

Click "Continue"

### Add Environment Variables

You'll be prompted to add environment variables. Click "Add environment variable" for each:

1. `DATABASE_URL` = `file:./prisma/dev.db`
2. `ADMIN_PASSWORD` = `Pineapple2026!`
3. `NEXTAUTH_SECRET` = Generate a random string (use https://www.uuidgenerator.net/ or similar)

After adding all three, click "Deploy"

### Wait for Deployment

Vercel will:
1. Build your Next.js project
2. Run database migrations
3. Deploy to the cloud

This takes 2-3 minutes. You'll see a success message and a temporary URL like `bitesizeblogs-xyz.vercel.app`

## Step 3: Connect Your Domain

### Connect bitesizeblogs.com

1. In your Vercel project, go to **Settings → Domains**
2. Click "Add Domain"
3. Enter: `bitesizeblogs.com`
4. Click "Add"

Vercel will show you DNS records to add at NameCheap.

### Update DNS at NameCheap

1. Log into [NameCheap](https://www.namecheap.com)
2. Go to **My Domains → Manage**
3. Click on `bitesizeblogs.com`
4. Go to **DNS** section
5. Replace or add the following records:

**For Vercel's DNS:**
- Type: `CNAME`
- Host: `www` (or `@` if it's the root)
- Value: `cname.vercel-dns.com`

Or use Vercel's exact instructions (they vary based on your account).

**Alternative: Point to Vercel's Nameservers**
If Vercel shows nameserver records, use those instead:
- Delete the existing nameservers
- Add Vercel's nameservers

Save changes. DNS propagation takes 5-30 minutes.

### Verify in Vercel

After DNS updates:
1. Go back to Vercel Settings → Domains
2. You should see a checkmark next to `bitesizeblogs.com`
3. Click on the domain to see status

Once verified, your site is live at `bitesizeblogs.com`

## Step 4: First Login

1. Go to `https://bitesizeblogs.com/admin/login`
2. Enter password: `Pineapple2026!`
3. You're in the dashboard!

## Step 5: Create Your First Post

1. Click "New Post"
2. Add:
   - **Title**: "Welcome to Bitesizeblogs"
   - **Excerpt**: "Our first post!"
   - **Category**: Pick one
   - **Content**: Write something
3. Check "Publish immediately"
4. Check "Feature on homepage"
5. Click "Save Post"

Visit `https://bitesizeblogs.com` to see your post live!

## Updating Your Code

Any time you make changes locally:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel automatically detects the push and redeploys your site within seconds.

## Troubleshooting

### Domain not working
- Wait 15-30 minutes for DNS propagation
- Double-check DNS records in NameCheap
- Try viewing in a private/incognito browser window

### "Cannot GET /" or 404 errors
- Check Vercel build logs for errors
- Make sure environment variables are set correctly
- Verify database migrations ran (check Vercel logs)

### Admin login not working
- Clear browser cache
- Check that `ADMIN_PASSWORD` is set in Vercel environment variables
- Try the password again (case-sensitive)

### Posts not appearing
- Make sure they're marked "Published"
- Refresh the page (browser cache)
- Check Vercel logs for database errors

## Environment Variables Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | `file:./prisma/dev.db` | SQLite database location |
| `ADMIN_PASSWORD` | Your password | Admin login password |
| `NEXTAUTH_SECRET` | Random string | JWT secret for auth tokens |

## Monitoring

In Vercel dashboard:
- **Deployments**: See all your deployments
- **Analytics**: View traffic and performance
- **Logs**: See real-time errors
- **Settings**: Update environment variables anytime

To update the admin password in production:
1. Go to Vercel → Settings → Environment Variables
2. Edit `ADMIN_PASSWORD`
3. Save (automatic redeploy)

## Next Steps

1. **Create more posts** - Start building your audience
2. **Promote on Twitter** - Share posts using `@bitesizeblogs_`
3. **SEO** - Consider adding meta descriptions and keywords
4. **Email list** - Consider adding a newsletter signup later
5. **Analytics** - Install Google Analytics to track visitors

---

Questions? Check the README.md for more details or troubleshoot with your deployment logs.
