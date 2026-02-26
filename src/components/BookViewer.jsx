import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import './BookViewer.css'

export default function BookViewer({ bookId, onClose }) {
  const [book, setBook] = useState(null)
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // currentPage: -1 = cover, 0..n = actual pages
  const [currentPage, setCurrentPage] = useState(-1)
  const [prevPage, setPrevPage] = useState(null)
  const [direction, setDirection] = useState('next')
  const [showHint, setShowHint] = useState(true)
  const touchStartX = useRef(0)
  const thumbStripRef = useRef(null)

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

  const totalSlides = pages.length + 1 // cover + pages

  const goTo = useCallback((nextIdx) => {
    if (nextIdx < -1 || nextIdx >= pages.length) return
    if (nextIdx === currentPage) return
    setDirection(nextIdx > currentPage ? 'next' : 'prev')
    setPrevPage(currentPage)
    setCurrentPage(nextIdx)
    setShowHint(false)
    // scroll thumb into view
    if (thumbStripRef.current) {
      const thumb = thumbStripRef.current.children[nextIdx + 1]
      if (thumb) thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [currentPage, pages.length])

  const goNext = useCallback(() => goTo(currentPage + 1), [goTo, currentPage])
  const goPrev = useCallback(() => goTo(currentPage - 1), [goTo, currentPage])

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
      if (e.key === 'Escape' && onClose) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, onClose])

  // Touch / swipe
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  // Progress bar click
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const targetIdx = Math.round(ratio * pages.length) - 1
    goTo(Math.max(-1, Math.min(targetIdx, pages.length - 1)))
  }

  // Slide class for a given index
  const slideClass = (idx) => {
    if (idx === currentPage) return 'ebv-slide ebv-active'
    if (idx === prevPage) return `ebv-slide ${direction === 'next' ? 'ebv-exit-left' : 'ebv-exit-right'}`
    return 'ebv-slide'
  }

  if (loading) return (
    <div className="ebv-loading">
      <div className="ebv-spinner" />
      <p>よみこみ中...</p>
    </div>
  )
  if (error) return <div className="ebv-error">{error}</div>
  if (pages.length === 0) return <div className="ebv-empty">ページがありません</div>

  const progressPercent = ((currentPage + 1) / pages.length) * 100

  return (
    <div className="ebv-container">
      {/* Top bar */}
      <div className="ebv-topbar">
        <span className="ebv-topbar-title">{book?.title || ''}</span>
        {onClose && (
          <button className="ebv-close-btn" onClick={onClose} aria-label="閉じる">✕</button>
        )}
      </div>

      {/* Stage */}
      <div
        className="ebv-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="ebv-track">
          {/* Cover slide (index -1) */}
          <div className={slideClass(-1)}>
            <div className="ebv-cover">
              {pages[0] && (
                <img src={pages[0].imageUrl} alt="表紙" className="ebv-cover-img" draggable={false} />
              )}
              <h2 className="ebv-cover-title">{book?.title}</h2>
              {book?.description && <p className="ebv-cover-desc">{book.description}</p>}
              <button className="ebv-cover-start" onClick={goNext}>よみはじめる →</button>
            </div>
          </div>

          {/* Page slides */}
          {pages.map((page, i) => (
            <div key={page.id || i} className={slideClass(i)}>
              <div className="ebv-page-frame">
                <img
                  src={page.imageUrl}
                  alt={`ページ ${i + 1}`}
                  className="ebv-page-img"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Nav click zones */}
        <div
          className={`ebv-click-prev ${currentPage <= -1 ? 'ebv-disabled' : ''}`}
          onClick={goPrev}
        >
          <div className="ebv-nav-arrow">‹</div>
        </div>
        <div
          className={`ebv-click-next ${currentPage >= pages.length - 1 ? 'ebv-disabled' : ''}`}
          onClick={goNext}
        >
          <div className="ebv-nav-arrow">›</div>
        </div>

        {showHint && <div className="ebv-swipe-hint">← スワイプまたはクリックでページ送り →</div>}
      </div>

      {/* Bottom bar */}
      <div className="ebv-bottombar">
        {/* Progress bar */}
        <div className="ebv-progress-track" onClick={handleProgressClick}>
          <div className="ebv-progress-fill" style={{ width: `${Math.max(0, progressPercent)}%` }} />
        </div>

        {/* Thumbnail strip */}
        <div className="ebv-thumbstrip" ref={thumbStripRef}>
          {pages.map((page, i) => (
            <div
              key={page.id || i}
              className={`ebv-thumb ${i === currentPage ? 'ebv-thumb-active' : ''}`}
              onClick={() => goTo(i)}
            >
              <img src={page.imageUrl} alt={`${i + 1}`} draggable={false} />
            </div>
          ))}
        </div>

        {/* Page info */}
        <div className="ebv-page-info">
          {currentPage >= 0 ? (
            <>
              <span className="ebv-page-current">{currentPage + 1}</span>
              <span> / {pages.length}</span>
            </>
          ) : (
            <span>ひょうし</span>
          )}
        </div>
      </div>
    </div>
  )
}
