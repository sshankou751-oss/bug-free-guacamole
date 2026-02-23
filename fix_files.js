import fs from 'fs';
import path from 'path';

const files = {
  'src/App.jsx': \import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import Auth from './components/Auth'
import BookList from './components/BookList'
import BookViewer from './components/BookViewer'
import './App.css'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSelectedBookId(null)
  }

  const handleSelectBook = (bookId) => {
    setSelectedBookId(bookId)
  }

  const handleBackToList = () => {
    setSelectedBookId(null)
  }

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading-spinner'></div>
      </div>
    )
  }

  if (!session) {
    return <Auth />
  }

  return (
    <div className='app'>
      <header className='app-header'>
        <div className='container'>
          <h1 className='app-title' onClick={handleBackToList} style={{ cursor: 'pointer' }}>
            絵本ギャラリー
          </h1>
          <div className='header-actions'>
            {selectedBookId && (
              <button onClick={handleBackToList} className='btn btn-secondary'>
                一覧に戻る
              </button>
            )}
            <button onClick={handleSignOut} className='btn btn-secondary'>
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main className='app-main container'>
        {selectedBookId ? (
          <BookViewer bookId={selectedBookId} />
        ) : (
          <BookList onSelectBook={handleSelectBook} />
        )}
      </main>
    </div>
  )
}

export default App\,

  'src/components/Auth.jsx': \import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Auth.css'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setMessage('確認メールを送信しました。メールをご確認ください。')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card card fade-in'>
        <h1 className='auth-title'>絵本ギャラリー</h1>
        <p className='auth-subtitle'>
          {isSignUp ? 'アカウントを作成' : 'ログインして絵本を閲覧'}
        </p>

        <form onSubmit={handleAuth} className='auth-form'>
          <div className='form-group'>
            <label className='form-label' htmlFor='email'>
              メールアドレス
            </label>
            <input
              id='email'
              className='form-input'
              type='email'
              placeholder='your@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label' htmlFor='password'>
              パスワード
            </label>
            <input
              id='password'
              className='form-input'
              type='password'
              placeholder=''
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='btn btn-primary auth-submit'
            disabled={loading}
          >
            {loading ? '処理中...' : isSignUp ? '登録' : 'ログイン'}
          </button>
        </form>

        {message && (
          <div className={\uth-message \\}>
            {message}
          </div>
        )}

        <button
          className='auth-toggle'
          onClick={() => {
            setIsSignUp(!isSignUp)
            setMessage('')
          }}
        >
          {isSignUp ? 'すでにアカウントをお持ちですか？ログイン' : 'アカウントをお持ちでないですか？登録'}
        </button>
      </div>
    </div>
  )
}\
};

for (const [filePath, content] of Object.entries(files)) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  fs.writeFileSync(absolutePath, content, 'utf8');
  console.log(\Fixed \\);
}
