'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }
    setToken(storedToken)
    fetchPosts(storedToken)
  }, [router])

  async function fetchPosts(authToken) {
    try {
      const res = await fetch('/api/admin/posts', {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      if (!res.ok) throw new Error('Unauthorized')
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  function navigateToEditor(postId = null) {
    if (postId) {
      router.push(`/admin/editor/${postId}`)
    } else {
      router.push('/admin/editor')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Bitesizeblogs Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Posts</h2>
          <button
            onClick={() => navigateToEditor()}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold"
          >
            + New Post
          </button>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-lg shadow border border-slate-200 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-slate-600 mb-3">{post.excerpt}</p>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span className="font-semibold">{post.category}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={
                          post.published
                            ? 'text-green-600 font-semibold'
                            : 'text-yellow-600 font-semibold'
                        }
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      {post.featured && (
                        <span className="text-blue-600 font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => navigateToEditor(post.id)}
                    className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 ml-4"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg text-center">
            <p className="text-slate-600 mb-4">No posts yet. Create your first one!</p>
            <button
              onClick={() => navigateToEditor()}
              className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Create First Post
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
