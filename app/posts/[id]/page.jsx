'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PostPage({ params }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${params.id}`)
        if (!res.ok) throw new Error('Post not found')
        const data = await res.json()
        setPost(data)
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <nav className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" className="text-2xl font-bold">
            Bitesizeblogs
          </Link>
        </nav>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            href={`/category/${post.category.toLowerCase()}`}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 uppercase"
          >
            {post.category}
          </Link>
          <h1 className="text-5xl font-bold mt-3 mb-4">{post.title}</h1>
          <p className="text-xl text-slate-600">{post.excerpt}</p>
        </div>

        <div className="flex gap-4 text-sm text-slate-500 mb-12 pb-8 border-b">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          {post.tags && (
            <div className="flex gap-2">
              {post.tags.split(',').map(tag => (
                <span key={tag.trim()} className="text-slate-400">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, idx) => {
            if (!paragraph.trim()) return null
            if (paragraph.startsWith('# ')) {
              return (
                <h1 key={idx} className="text-4xl font-bold mt-8 mb-4">
                  {paragraph.replace('# ', '')}
                </h1>
              )
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold mt-4 mb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              )
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-4">
                  {paragraph.replace('> ', '')}
                </blockquote>
              )
            }
            if (paragraph.startsWith('- ')) {
              return (
                <li key={idx} className="ml-6 mb-2">
                  {paragraph.replace('- ', '')}
                </li>
              )
            }
            return (
              <p key={idx} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-center py-8 mt-16">
        <p className="text-slate-400">
          © 2024 Bitesizeblogs. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
