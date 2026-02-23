import { useState, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'
import './CreateBook.css'

// ファイル名から末尾の数字を抽出してソート（Canvaのエクスポート形式に対応）
const extractNumber = (filename) => {
  const match = filename.match(/(\d+)(?=\.\w+$)/)
  return match ? parseInt(match[1], 10) : 0
}

const sortFilesByName = (files) => {
  return [...files].sort((a, b) => {
    const numA = extractNumber(a.name)
    const numB = extractNumber(b.name)
    if (numA !== numB) return numA - numB
    return a.name.localeCompare(b.name)
  })
}

export default function CreateBook({ onCancel, onComplete }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [pages, setPages] = useState([]) // { file, preview, id }
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const dragIndex = useRef(null)

  const addFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles)
    const validFiles = fileArray.filter(f => f.type.startsWith('image/'))
    if (validFiles.length === 0) {
      setError('画像ファイル（JPGPNG等）のみ選択できます。')
      return
    }
    if (validFiles.length !== fileArray.length) {
      setError('画像以外のファイルは除外しました。')
    } else {
      setError('')
    }

    const sorted = sortFilesByName(validFiles)
    const newPages = sorted.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random()}`
    }))

    setPages(prev => [...prev, ...newPages])
  }, [])

  const handleFileChange = (e) => {
    addFiles(e.target.files)
    e.target.value = ''
  }

  const handleDragOver = (e) => { e.preventDefault(); setIsDraggingOver(true) }
  const handleDragLeave = (e) => { e.preventDefault(); setIsDraggingOver(false) }
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDraggingOver(false)
    addFiles(e.dataTransfer.files)
  }

  const removePage = (id) => {
    setPages(prev => {
      const target = prev.find(p => p.id === id)
      if (target) URL.revokeObjectURL(target.preview)
      return prev.filter(p => p.id !== id)
    })
  }

  const handleDragStart = (index) => { dragIndex.current = index }
  const handleDragOverItem = (e, index) => {
    e.preventDefault()
    setPages(prev => {
      if (dragIndex.current === null || dragIndex.current === index) return prev
      const updated = [...prev]
      const [moved] = updated.splice(dragIndex.current, 1)
      updated.splice(index, 0, moved)
      dragIndex.current = index
      return updated
    })
  }
  const handleDragEnd = () => { dragIndex.current = null }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) { setError('タイトルを入力してください。'); return }
    if (pages.length === 0) { setError('少なくとも1枚の画像を選択してください。'); return }

    setLoading(true)
    setMessage('')
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('ユーザーが見つかりません。再ログインしてください。')

      const { data: book, error: bookError } = await supabase
        .from('books')
        .insert({ title, description, user_id: user.id })
        .select()
        .single()

      if (bookError) throw bookError

      const pagePromises = pages.map(async ({ file }, index) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${book.id}/${index + 1}_${Math.random().toString(36).substring(2)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('picture-books')
          .upload(fileName, file)

        if (uploadError) throw new Error(`画像のアップロードに失敗しました: ${uploadError.message}`)

        return { book_id: book.id, page_number: index + 1, image_path: fileName }
      })

      const pagesData = await Promise.all(pagePromises)
      const { error: pagesError } = await supabase.from('book_pages').insert(pagesData)
      if (pagesError) throw pagesError

      setMessage('絵本を作成しました！')
      pages.forEach(p => URL.revokeObjectURL(p.preview))
      setTimeout(() => onComplete(), 1000)

    } catch (err) {
      console.error('Error creating book:', err)
      setError(err.message || '絵本の作成に失敗しました。')
      setLoading(false)
    }
  }

  return (
    <div className='create-book-container fade-in'>
      <div className='create-book-card card'>
        <h2 className='create-book-title'>新しい絵本を作る</h2>

        <form onSubmit={handleSubmit} className='create-book-form'>
          <div className='form-group'>
            <label htmlFor='title' className='form-label'>タイトル <span className='required'>*</span></label>
            <input
              id='title'
              type='text'
              className='form-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='絵本のタイトル'
              disabled={loading}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description' className='form-label'>説明</label>
            <textarea
              id='description'
              className='form-textarea'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='どんなお話ですか？'
              rows={3}
              disabled={loading}
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>
              ページ画像 <span className='required'>*</span>
              <span className='label-hint'>（ファイル名の番号順に自動整列）</span>
            </label>

            <div
              className={`drop-zone ${isDraggingOver ? 'drop-zone--active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                id='images'
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileChange}
                className='file-input'
                disabled={loading}
              />
              <div className='drop-zone-content'>
                <span className='drop-zone-icon'></span>
                <p className='drop-zone-text'>Canvaからエクスポートした画像をここにドロップ</p>
                <p className='drop-zone-subtext'>または クリックして選択（複数可）</p>
              </div>
            </div>

            {pages.length > 0 && (
              <div className='pages-header'>
                <span className='pages-count'> {pages.length} ページ選択済み</span>
                <label htmlFor='add-more' className='add-more-btn'>
                  ＋ ページを追加
                  <input
                    id='add-more'
                    type='file'
                    accept='image/*'
                    multiple
                    className='file-input-hidden'
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                </label>
              </div>
            )}

            {pages.length > 0 && (
              <div className='image-previews'>
                {pages.map((page, index) => (
                  <div
                    key={page.id}
                    className='preview-item'
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOverItem(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <img src={page.preview} alt={`Page ${index + 1}`} />
                    <span className='page-badge'>{index + 1}</span>
                    <button
                      type='button'
                      className='page-delete-btn'
                      onClick={() => removePage(page.id)}
                      disabled={loading}
                      title='このページを削除'
                    ></button>
                    <div className='drag-hint'></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div className='error-message'>{error}</div>}
          {message && <div className='success-message'>{message}</div>}

          <div className='form-actions'>
            <button type='button' className='btn btn-secondary' onClick={onCancel} disabled={loading}>
              キャンセル
            </button>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {loading ? `アップロード中... (${pages.length}ページ)` : '絵本を公開する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
