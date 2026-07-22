# Bitesizeblogs

A custom-built blog about movies, shows, sports, and pop culture. Built with Next.js, React, and Prisma.

## Features

- **Clean, minimal design** - Professional look for both public site and admin panel
- **Professional admin dashboard** - Create, edit, and delete posts with a polished interface
- **Categories** - Organize posts into Movies, Shows, Sports, Pop Culture
- **Tags** - Add tags to posts for better organization
- **Featured posts** - Highlight a post on the homepage
- **Drafts** - Save posts as drafts before publishing
- **Simple password login** - Secure admin access

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Hosting**: Vercel
- **Authentication**: JWT tokens

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/lukemiller4321/bitesizeblogs.git
cd bitesizeblogs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file:

```
DATABASE_URL="file:./prisma/dev.db"
ADMIN_PASSWORD="Pineapple2026!"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
```

### 4. Setup Database

```bash
npx prisma migrate dev --name init
```

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 6. Access Admin Panel

Go to `http://localhost:3000/admin/login`
- Password: `Pineapple2026!`

## Deployment to Vercel

### 1. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/lukemiller4321/bitesizeblogs.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your repository
5. Click "Import"

### 3. Add Environment Variables

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add the following:
   - `DATABASE_URL`: `file:./prisma/dev.db`
   - `ADMIN_PASSWORD`: `Pineapple2026!`
   - `NEXTAUTH_SECRET`: A long random string (generate one)

### 4. Connect Domain

1. Go to Settings → Domains
2. Add `bitesizeblogs.com`
3. Follow Vercel's instructions to point your domain DNS

### 5. Deploy

Click "Deploy" and Vercel will build and deploy your site automatically.

## Usage

### Creating a Post

1. Go to `https://bitesizeblogs.com/admin/login`
2. Enter your admin password
3. Click "New Post"
4. Fill in the details:
   - **Title**: Post title
   - **Excerpt**: Brief summary (shows on homepage)
   - **Category**: Movies, Shows, Sports, or Pop Culture
   - **Tags**: Comma-separated tags
   - **Content**: Your full post content
5. Choose if you want to publish now or save as draft
6. Check "Feature on homepage" to make it the featured post
7. Click "Save Post"

### Formatting Content

Use simple markdown-style formatting in the content:

```
# Main Heading
## Subheading
### Sub-subheading

Normal paragraph text goes here.

> This is a quote or blockquote

- This is a bullet point
- Another bullet point
```

### Editing a Post

1. Go to Dashboard
2. Click "Edit" on any post
3. Make your changes
4. Click "Save Changes"

### Deleting a Post

1. Go to Dashboard
2. Click "Edit" on the post
3. Click "Delete Post"
4. Confirm deletion

## Post Structure

Posts are stored with:
- **ID**: Unique identifier
- **Title**: Post title
- **Excerpt**: Preview text for homepage/category pages
- **Content**: Full post content
- **Category**: One of 4 categories
- **Tags**: Comma-separated tags
- **Published**: Whether the post is live
- **Featured**: Whether it's shown on the homepage
- **Created/Updated**: Timestamps

## Architecture

```
app/
├── admin/                    # Admin pages
│   ├── login/               # Login page
│   ├── dashboard/           # Dashboard with post list
│   └── editor/              # Create and edit posts
├── api/                      # API routes
│   ├── posts/               # Public post endpoints
│   ├── auth/login           # Authentication
│   └── admin/posts          # Admin endpoints
├── posts/[id]/              # Individual post pages
├── category/[slug]/         # Category pages
└── page.jsx                 # Homepage

prisma/
└── schema.prisma            # Database schema

pages are server/client rendered with Next.js 14 App Router
```

## Troubleshooting

### "Unauthorized" when trying to edit posts

Make sure you've logged in and the JWT token is stored in localStorage. Try logging out and logging back in.

### Database not working

```bash
# Reset the database
rm prisma/dev.db
npx prisma migrate dev --name init
```

### Posts not showing on the homepage

Make sure they're marked as "Published" in the editor.

## Support

For issues or questions, reach out to Lukas.

---

Made with ❤️ for Bitesizeblogs
