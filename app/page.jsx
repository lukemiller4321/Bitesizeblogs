'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts?published=true')
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const categories = ['Movies', 'Shows', 'Sports', 'Pop Culture']
  const featured = posts.find(p => p.featured)
  const recent = posts.filter(p => !p.featured).slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <nav className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Bitesizeblogs
            </Link>
            <a
              href="https://twitter.com/bitesizeblogs_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300"
            >
              Twitter
            </a>
          </div>
          <p className="text-slate-400 mt-4 text-lg">
            A blog from the mind of Miller and Friends
          </p>
        </nav>
      </header>

      {/* Featured Post */}
      {featured && (
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <span className="text-sm font-semibold text-slate-400 uppercase">
              Featured
            </span>
            <Link href={`/posts/${featured.id}`}>
              <h2 className="text-4xl font-bold mt-3 mb-4 hover:text-slate-300">
                {featured.title}
              </h2>
            </Link>
            <p className="text-slate-300 text-lg">{featured.excerpt}</p>
            <div className="flex gap-4 mt-6">
              <span className="bg-slate-800 px-4 py-2 rounded text-sm">
                {featured.category}
              </span>
              <span className="text-slate-400 text-sm">
                {new Date(featured.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="p-6 bg-slate-100 rounded-lg hover:bg-slate-200 text-center font-semibold"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8">Latest Articles</h3>
        {loading ? (
          <p className="text-slate-600">Loading...</p>
        ) : recent.length > 0 ? (
          <div className="grid gap-8">
            {recent.map(post => (
              <article key={post.id} className="border-b pb-8">
                <Link href={`/posts/${post.id}`}>
                  <h4 className="text-2xl font-bold mb-2 hover:text-slate-600">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-slate-600 mb-4">{post.excerpt}</p>
                <div className="flex gap-4 text-sm text-slate-500">
                  <span className="font-semibold">{post.category}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No posts yet. Check back soon!</p>
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
