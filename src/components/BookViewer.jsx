import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import './BookViewer.css'

export default function BookViewer({ bookId }) {
  const [book, setBook] = useState(null)
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState('next')
  const [animating, setAnimating] = useState(false)
  const animTimerRef = useRef(null)

  useEffect(() => {
    fetchBook()
  }, [bookId])

  const fetchBook = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: bookData, error: bookError } = await supabase
        .from('books')
        .select('*')
        .eq('id', bookId)
        .single()
      if (bookError) throw bookError
      setBook(bookData)

      const { data, error } = await supabase
        .from('book_pages')
        .select('*')
        .eq('book_id', bookId)
        .order('page_number', { ascending: true })
      if (error) throw error

      const pagesWithUrls = data.map(page => {
        const { data: urlData } = supabase.storage
          .from('picture-books')
          .getPublicUrl(page.image_path)
        return { ...page, imageUrl: urlData.publicUrl }
      })
      setPages(pagesWithUrls)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ページ遷移の共通処理
  const changePage = useCallback((nextIndex, dir) => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    if (animTimerRef.current) clearTimeout(animTimerRef.current)
    animTimerRef.current = setTimeout(() => {
      setCurrentPage(nextIndex)
      // ページ変更後の次フレームでアニメフラグを解除
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimating(false)
        })
      })
    }, 280)
  }, [animating])

  const goNext = useCallback(() => {
    if (currentPage >= pages.length - 1) return
    changePage(currentPage + 1, 'next')
  }, [animating, currentPage, pages.length, changePage])

  const goPrev = useCallback(() => {
    if (currentPage <= 0) return
    changePage(currentPage - 1, 'prev')
  }, [animating, currentPage, changePage])

  const goToPage = useCallback((i) => {
    if (i === currentPage) return
    changePage(i, i > currentPage ? 'next' : 'prev')
  }, [animating, currentPage, changePage])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  useEffect(() => {
    return () => { if (animTimerRef.current) clearTimeout(animTimerRef.current) }
  }, [])

  if (loading) return (
    <div className="bv-loading">
      <div className="bv-spinner" />
      <p>よみこみ中...</p>
    </div>
  )
  if (error) return <div className="bv-error">{error}</div>
  if (pages.length === 0) return <div className="bv-empty">ページがありません</div>

  const page = pages[currentPage]

  return (
    <div className="bv-container">
      {book && <h2 className="bv-title">{book.title}</h2>}

      <div className="bv-book-area">
        <button
          className="bv-nav-btn bv-nav-prev"
          onClick={goPrev}
          disabled={currentPage === 0 || animating}
          aria-label="前のページ"
        >
          ‹
        </button>

        <div className="bv-page-wrapper">
          <div className="bv-book-shadow" />
          <div
            key={currentPage}
            className={`bv-page ${animating ? (direction === 'next' ? 'bv-slide-out-left' : 'bv-slide-out-right') : 'bv-slide-in'}`}
          >
            <img
              src={page.imageUrl}
              alt={`ページ ${currentPage + 1}`}
              className="bv-page-img"
              draggable={false}
            />
            <div className="bv-page-curl" />
          </div>
        </div>

        <button
          className="bv-nav-btn bv-nav-next"
          onClick={goNext}
          disabled={currentPage >= pages.length - 1 || animating}
          aria-label="次のページ"
        >
          ›
        </button>
      </div>

      <div className="bv-dots">
        {pages.map((_, i) => (
          <button
            key={i}
            className={`bv-dot ${i === currentPage ? 'bv-dot-active' : ''}`}
            onClick={() => goToPage(i)}
            aria-label={`${i + 1}ページ目`}
          />
        ))}
      </div>

      <div className="bv-counter">
        <span className="bv-counter-current">{currentPage + 1}</span>
        <span className="bv-counter-sep">/</span>
        <span className="bv-counter-total">{pages.length}</span>
      </div>
    </div>
  )
}
