import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import './BookList.css'

export default function BookList({ onSelectBook }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)

      // RLSポリシーにより、認証済みユーザーのみがデータを取得可能
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='book-list-loading'>
        <div className='loading-spinner'></div>
        <p>絵本を読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='book-list-error'>
        <p>エラーが発生しました: {error}</p>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className='book-list-empty'>
        <h2>絵本がまだありません</h2>
        <p>最初の絵本を作成してください</p>
      </div>
    )
  }

  return (
    <div className='book-list'>
      <h2 className='book-list-title'>絵本ギャラリー</h2>
      <div className='book-grid'>
        {books.map((book) => (
          <div
            key={book.id}
            className='book-card card'
            onClick={() => onSelectBook(book.id)}
          >
            <div className='book-card-content'>
              <h3 className='book-title'>{book.title}</h3>
              {book.description && (
                <p className='book-description'>{book.description}</p>
              )}
              <div className='book-meta'>
                <span className='book-date'>
                  {new Date(book.created_at).toLocaleDateString('ja-JP')}
                </span>
              </div>
            </div>
            <div className='book-card-footer'>
              <button className='btn btn-primary btn-sm'>
                読む
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
