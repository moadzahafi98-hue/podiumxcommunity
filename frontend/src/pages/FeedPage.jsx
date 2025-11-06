import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, fetchFeed } from '../features/feed/feedSlice'

const FeedPage = () => {
  const dispatch = useDispatch()
  const { posts, status } = useSelector((state) => state.feed)
  const { user } = useSelector((state) => state.auth)
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('motivation')

  useEffect(() => {
    dispatch(fetchFeed())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    await dispatch(createPost({ content, tag, authorName: user?.name || user?.displayName || user?.email }))
    setContent('')
  }

  return (
    <div className="space-y-6">
      <form className="bg-surface/80 p-6 rounded-3xl space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">Share with the community</h1>
        <textarea
          className="w-full px-4 py-2 rounded-2xl text-black"
          placeholder="What&apos;s on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select
          className="px-4 py-2 rounded-2xl text-black"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="motivation">Motivation</option>
          <option value="nutrition">Nutrition</option>
          <option value="mobility">Mobility</option>
          <option value="recovery">Recovery</option>
        </select>
        <button type="submit">Post</button>
      </form>
      <section className="space-y-4">
        {status === 'loading' && <p>Loading feed...</p>}
        {posts.map((post) => (
          <article key={post.id} className="bg-surface/80 p-6 rounded-3xl space-y-2 border border-electric/20">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{post.author?.name || 'PodiumX Athlete'}</p>
              <span className="text-electric/80 text-sm">#{post.tag}</span>
            </div>
            <p className="text-sm leading-relaxed">{post.content}</p>
            <div className="flex gap-4 text-sm text-electric/70">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
              <span>🔁 {post.shares}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default FeedPage
