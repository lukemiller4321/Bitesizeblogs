import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

function verifyToken(request) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published') === 'true'
    const category = searchParams.get('category')

    const where = {}
    if (published) {
      where.published = true
    }
    if (category) {
      where.category = category.charAt(0).toUpperCase() + category.slice(1)
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        category: body.category,
        tags: body.tags,
        published: body.published || false,
        featured: body.featured || false,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
