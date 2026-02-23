import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import './BookViewer.css'

export default function BookViewer({ bookId }) {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // currentSpreadIndex: 0 (Cover), 1 (Pages 1-2), etc.
  // Actually, let's treat pages as individual items in an array.
  // We will display them as sheets.
  // Sheet 0: Front=Page0(Cover?), Back=Page1
  // Sheet 1: Front=Page2, Back=Page3
  // ...
  // But our 'pages' array from DB is just a list of images.
  // Let's assume Page 0 is standalone right (Title page), then 1-2, 3-4.
  // Simplification: Just mapped array.
  // Sheet i represents pages[2*i] and pages[2*i+1].
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0)

  useEffect(() => {
    fetchBookPages()
  }, [bookId])

  const fetchBookPages = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('book_pages')
        .select('*')
        .eq('book_id', bookId)
        .order('page_number', { ascending: true })

      if (error) throw error

      const pagesWithUrls = data.map(page => {
        const { data: urlData } = supabase
          .storage
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

  // Calculate total sheets needed
  // If we have N pages.
  // We need Math.ceil(N / 2) + 1 (for cover/back)?
  // Let's simplify:
  // We render ALL sheets stacked.
  // The 'flipping' is controlled by classes.
  // Page i (0-indexed logic for sheets):
  //   Front Image: pages[2*i]
  //   Back Image: pages[2*i+1]
  
  const totalSheets = Math.ceil(pages.length / 2)

  const nextPage = () => {
    if (currentSheetIndex < totalSheets) {
      setCurrentSheetIndex(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentSheetIndex > 0) {
      setCurrentSheetIndex(prev => prev - 1)
    }
  }

  if (loading) return <div className='book-viewer-loading'><div className='loading-spinner'></div></div>
  if (error) return <div className='book-viewer-error'>{error}</div>
  if (pages.length === 0) return <div className='book-viewer-empty'>ページがありません</div>

  return (
    <div className='book-viewer'>
      <div className='book-wrapper'>
        {/* Render sheets in reverse order so first is on top (z-index handled by index) */}
        {Array.from({ length: totalSheets }).map((_, i) => {
          // Sheet i
          // If CurrentSheet > i, this sheet is flipped (on the left side)
          // If CurrentSheet <= i, this sheet is not flipped (on the right side)
          // Z-Index:
          //   Right side: Higher index is lower (0 is top).
          //   Left side: Higher index is higher (0 is bottom).
          // Logic:
          //   i < currentSheetIndex: Flipped (Left). zIndex = i
          //   i >= currentSheetIndex: Open (Right). zIndex = totalSheets - i

          const isFlipped = i < currentSheetIndex
          const zIndex = isFlipped ? i : totalSheets - i

          const frontPage = pages[2 * i]
          const backPage = pages[2 * i + 1]

          return (
            <div
              key={i}
              className={`book-page-sheet ${isFlipped ? 'flipped' : ''}`}
              style={{ zIndex }}
              onClick={() => {
                if (isFlipped) prevPage()
                else nextPage()
              }}
            >
              {/* Front of the sheet (Right Page) */}
              <div className='page-front'>
                {frontPage ? (
                  <>
                    <img src={frontPage.imageUrl} alt={`Page ${2*i+1}`} className='page-image' />
                    <div className='page-number'>{2*i + 1}</div>
                  </>
                ) : (
                  <div className='page-empty'></div>
                )}
              </div>

              {/* Back of the sheet (Left Page) */}
              <div className='page-back'>
                {backPage ? (
                  <>
                    <img src={backPage.imageUrl} alt={`Page ${2*i+2}`} className='page-image' />
                    <div className='page-number'>{2*i + 2}</div>
                  </>
                ) : (
                  <div className='page-empty'></div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className='book-controls'>
        <button className='btn btn-control' onClick={prevPage} disabled={currentSheetIndex === 0}>
          ← 前へ
        </button>
        <div className='page-indicator'>
          {currentSheetIndex} / {totalSheets}
        </div>
        <button className='btn btn-control' onClick={nextPage} disabled={currentSheetIndex === totalSheets}>
          次へ →
        </button>
      </div>
    </div>
  )
}
