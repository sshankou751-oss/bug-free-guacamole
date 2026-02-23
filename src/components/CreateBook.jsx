import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './CreateBook.css'

export default function CreateBook({ onCancel, onComplete }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length === 0) return

    const validFiles = selectedFiles.filter(file => file.type.startsWith('image/'))
    if (validFiles.length !== selectedFiles.length) {
      setError('画像ファイルのみ選択してください。')
      return
    }

    setFiles(validFiles)
    setError('')

    const newPreviews = validFiles.map(file => URL.createObjectURL(file))
    previews.forEach(url => URL.revokeObjectURL(url))
    setPreviews(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('タイトルを入力してください。')
      return
    }
    if (files.length === 0) {
      setError('少なくとも1枚の画像を選択してください。')
      return
    }

    setLoading(true)
    setMessage('')
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('ユーザーが見つかりません。再ログインしてください。')

      // Insert with user_id
      const { data: book, error: bookError } = await supabase
        .from('books')
        .insert({
          title,
          description,
          user_id: user.id 
        })
        .select()
        .single()

      if (bookError) throw bookError

      const pagePromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${book.id}/${index + 1}_${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('picture-books')
          .upload(filePath, file)

        if (uploadError) throw new Error(`画像のアップロードに失敗しました: ${uploadError.message}`)

        return {
          book_id: book.id,
          page_number: index + 1,
          image_path: filePath
        }
      })

      const pagesData = await Promise.all(pagePromises)

      const { error: pagesError } = await supabase
        .from('book_pages')
        .insert(pagesData)

      if (pagesError) throw pagesError

      setMessage('絵本を作成しました！')
      previews.forEach(url => URL.revokeObjectURL(url))
      
      setTimeout(() => {
        onComplete()
      }, 1000)

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
              rows={4}
              disabled={loading}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='images' className='form-label'>ページ画像 <span className='required'>*</span></label>
            <div className='file-input-wrapper'>
              <input
                id='images'
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileChange}
                className='file-input'
                disabled={loading}
              />
              <div className='file-input-helper'>
                クリックして画像を選択（複数可、選択順がページ順になります）
              </div>
            </div>
            
            {previews.length > 0 && (
              <div className='image-previews'>
                {previews.map((src, index) => (
                  <div key={index} className='preview-item'>
                    <img src={src} alt={`Page ${index + 1}`} />
                    <span className='page-badge'>{index + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div className='error-message'>{error}</div>}
          {message && <div className='success-message'>{message}</div>}

          <div className='form-actions'>
            <button 
              type='button' 
              className='btn btn-secondary' 
              onClick={onCancel}
              disabled={loading}
            >
              キャンセル
            </button>
            <button 
              type='submit' 
              className='btn btn-primary'
              disabled={loading}
            >
              {loading ? '作成中...' : '絵本を公開する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
