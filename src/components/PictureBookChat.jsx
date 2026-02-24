import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Sparkles, ArrowLeft } from 'lucide-react'
import './PictureBookChat.css'

export default function PictureBookChat({ onCancel }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'こんにちは！好きな言葉をひとつ入れてみて！（例：りんご、星、冒険、猫）',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getProposal = (input) => {
    const keywords = {
      'りんご': {
        title: '空とぶ魔法のりんご',
        description: 'ある日、森で見つけた真っ赤なりんご。一口かじると、ふわふわと空に浮かび上がって...？空の上で見つけた秘密の国の物語。',
      },
      '冒険': {
        title: 'ちいさな勇者の大冒険',
        description: 'わすれものを取りに夜の森へ。勇気を出して一歩踏み出せば、そこにはキラキラ輝くクリスタルの洞窟が待っていた！',
      },
      '猫': {
        title: '夜のパン屋さんと三毛猫',
        description: '夜にだけ開く不思議なパン屋さん。看板猫のミケが案内してくれるのは、とびきり甘くて不思議なパンの世界。',
      },
      '星': {
        title: '星くずを集める女の子',
        description: '夜空からこぼれ落ちた星のかけら。それを集めてランプを作る女の子。ある夜、大きな流れ星が庭に落ちてきて...？',
      }
    }

    const match = Object.keys(keywords).find(k => input.includes(k))
    if (match) {
      return { ...keywords[match], isProposal: true }
    }

    return {
      title: input + 'の不思議な物語',
      description: '「' + input + '」をテーマにした、世界にひとつだけの特別な絵本。どんなワクワクが待っているかな？',
      isProposal: true
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const capturedInput = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    setTimeout(() => {
      const proposal = getProposal(capturedInput)
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: '「' + capturedInput + '」だね！こんな物語はどうかな？',
        proposal: proposal,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className='chat-container fade-in'>
      <div className='chat-header'>
        <button onClick={() => onCancel(null)} className='chat-back-btn'>
          <ArrowLeft size={24} />
        </button>
        <div className='chat-title-group'>
          <div className='chat-icon-bg'>
            <Sparkles className='chat-icon' />
          </div>
          <div>
            <h2 className='chat-title'>チャットで作る</h2>
            <p className='chat-subtitle'>キーワードから物語を提案するよ！</p>
          </div>
        </div>
      </div>

      <div className='chat-messages'>
        {messages.map((msg) => (
          <div key={msg.id} className={'message-wrapper ' + msg.type}>
            <div className='message-avatar'>
              {msg.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className='message-bubble-group'>
              <div className='message-bubble'>
                {msg.text}
                {msg.proposal && (
                  <div className='proposal-card'>
                    <div className='proposal-icon'>📖</div>
                    <h3 className='proposal-title'>{msg.proposal.title}</h3>
                    <p className='proposal-description'>{msg.proposal.description}</p>
                    <button
                      className='proposal-btn'
                      onClick={() => onCancel({
                        title: msg.proposal.title,
                        description: msg.proposal.description
                      })}
                    >
                      これでつくる！
                    </button>
                  </div>
                )}
              </div>
              <span className='message-time'>{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className='chat-input-area'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='キーワードを入れてね（例：りんご、星、冒険）'
          className='chat-input'
        />
        <button type='submit' className='chat-send-btn' disabled={!inputValue.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}
