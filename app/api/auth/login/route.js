import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Pineapple2026!'
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function POST(request) {
  try {
    const body = await request.json()
    const { password } = body

    // Simple password check (in production, use bcrypt)
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { role: 'admin' },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    return NextResponse.json({ token, success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
