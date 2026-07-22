'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CategoryPage({ params }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const categoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `/api/posts?published=true&category=${params.slug}`
        )
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [params.slug])

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

      {/* Category Hero */}
      <section className="bg-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold">{categoryName}</h1>
          <p className="text-slate-600 mt-2">
            {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-slate-600">Loading...</p>
        ) : posts.length > 0 ? (
          <div className="grid gap-8">
            {posts.map(post => (
              <article key={post.id} className="border-b pb-8">
                <Link href={`/posts/${post.id}`}>
                  <h2 className="text-2xl font-bold mb-2 hover:text-slate-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-600 mb-4">{post.excerpt}</p>
                <div className="flex gap-4 text-sm text-slate-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.tags && (
                    <span>{post.tags.split(',').length} tags</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No posts in this category yet.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-center py-8 mt-16">
        <p className="text-slate-400">
          © 2024 Bitesizeblogs. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
