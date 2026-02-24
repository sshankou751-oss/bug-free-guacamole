import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import './BookList.css' // Re-use styles

export default function MyBooks({ onSelectBook }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchMyBooks()
  }, [])

  const fetchMyBooks = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (bookId, e) => {
    e.stopPropagation() // Prevent card click
    if (!window.confirm('本当にこの絵本を削除しますか？\n（アップロードされた画像も削除されます）')) return

    try {
      setDeletingId(bookId)
      
      // 1. Delete images from Storage
      // We need to know the paths. Complex?
      // Simpler: Just delete the row. Supabase doesn't auto-delete storage files on cascade though.
      // Ideally we should list files in the folder `bookId/` and delete them.
      
      const { data: pages } = await supabase
        .from('book_pages')
        .select('image_path')
        .eq('book_id', bookId)

      if (pages && pages.length > 0) {
        const paths = pages.map(p => p.image_path)
        await supabase.storage.from('picture-books').remove(paths)
      }
      
      // 2. book_pages を削除
      await supabase
        .from('book_pages')
        .delete()
        .eq('book_id', bookId)

      // 3. books を削除
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', bookId)

      if (error) throw error

      setBooks(prev => prev.filter(b => b.id !== bookId))

    } catch (err) {
      alert('削除に失敗しました: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <div className='book-list-loading'><div className='loading-spinner'></div></div>
  if (error) return <div className='book-list-error'>{error}</div>

  if (books.length === 0) {
    return (
      <div className='book-list-empty'>
        <h2>まだ絵本を作っていません</h2>
        <p>「絵本を作る」ボタンから作成してみましょう！</p>
      </div>
    )
  }

  return (
    <div className='book-list'>
      <h2 className='book-list-title'>自分の絵本</h2>
      <div className='book-grid'>
        {books.map((book) => (
          <div
            key={book.id}
            className='book-card card'
            onClick={() => onSelectBook(book.id)}
          >
            <div className='book-card-content'>
              <h3 className='book-title'>{book.title}</h3>
              <p className='book-description'>{book.description}</p>
              <div className='book-meta'>
                {new Date(book.created_at).toLocaleDateString('ja-JP')}
              </div>
            </div>
            <div className='book-card-footer' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button 
                className='btn btn-danger btn-sm'
                onClick={(e) => handleDelete(book.id, e)}
                disabled={deletingId === book.id}
                style={{ backgroundColor: '#e74c3c', color: 'white' }}
              >
                {deletingId === book.id ? '削除中...' : '削除'}
              </button>
              <button className='btn btn-primary btn-sm'>読む</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
