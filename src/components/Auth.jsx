import { useState } from 'react'
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
          <div className={`auth-message ${message.includes('確認') ? 'success' : 'error'}`}>
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
}
