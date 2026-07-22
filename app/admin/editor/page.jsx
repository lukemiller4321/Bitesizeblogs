'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const CATEGORIES = ['Movies', 'Shows', 'Sports', 'Pop Culture']

export default function PostEditor() {
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Movies')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }
    setToken(storedToken)
  }, [router])

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          excerpt: excerpt || title,
          content,
          category,
          tags,
          published,
          featured,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save post')
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">New Post</h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
          >
            Back
          </button>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Excerpt (preview text)
            </label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-20"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="e.g. action, thriller, spoiler-free"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Content *
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your post here. Use markdown-style formatting:
# H1 Heading
## H2 Heading
> Blockquote
- Bullet point"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-96 font-mono text-sm"
            />
            <p className="text-xs text-slate-500 mt-2">
              Supports: # Headings, ## Subheadings, &gt; Quotes, - Lists
            </p>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={e => setPublished(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-slate-700">
                Publish immediately
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-slate-700">
                Feature on homepage
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleSave}
              disabled={saving || !title || !content}
              className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 font-semibold"
            >
              {saving ? 'Saving...' : 'Save Post'}
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
