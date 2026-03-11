import { useState, useEffect } from "react"
import { supabase } from "./lib/supabaseClient"
import Auth from "./components/Auth"
import EhonForest from "./components/EhonForest"
import BookViewer from "./components/BookViewer"
import CreateBook from "./components/CreateBook"
import CuteButton from "./components/CuteButton"
import MyBooks from "./components/MyBooks"
import { LogOut, Plus, Star } from "lucide-react"
import "./App.css"

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewState, setViewState] = useState("list")
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    }).catch((err) => {
      console.error('Supabase error:', err)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setViewState("list")
    setSelectedBookId(null)
  }

  const handleSelectBook = (bookId) => {
    setSelectedBookId(bookId)
    setViewState("viewer")
  }

  const handleBackToList = () => {
    setSelectedBookId(null)
    setViewState("list")
  }

  const handleStartCreating = () => {
    if (!session) { setViewState("auth") } else { setViewState("create") }
    setSelectedBookId(null)
  }

  const handleShowMyBooks = () => {
    if (!session) { setViewState("auth") } else { setViewState("mybooks") }
    setSelectedBookId(null)
  }

  const handleCreateComplete = () => { setViewState("mybooks") }

  if (loading) {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#fdf8ef"}}>
        <div style={{width:56,height:56,border:"5px solid #d4e8d4",borderTopColor:"#6daa7a",borderRadius:"50%",animation:"spin 0.8s linear infinite"}} />
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh",background:"#fdf8ef",fontFamily:"'Zen Maru Gothic','Hiragino Maru Gothic Pro','Rounded Mplus 1c',sans-serif"}}>
      {viewState === "viewer" && selectedBookId ? (
        <BookViewer bookId={selectedBookId} onClose={handleBackToList} />
      ) : (
        <>
          {/* ヘッダー */}
          <header style={{
            background:"rgba(255,255,255,0.92)",
            backdropFilter:"blur(12px)",
            borderBottom:"2px solid #d4e8d4",
            padding:"12px 24px",
            position:"sticky",
            top:0,
            zIndex:50,
            boxShadow:"0 2px 12px rgba(109,170,122,0.1)"
          }}>
            <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              {/* ヘッダーバナー */}
              <div onClick={handleBackToList} style={{cursor:"pointer"}}>
                <img src="/header-banner.png" alt="絵本のもり" style={{height:56,width:"auto",maxWidth:320,objectFit:"contain",display:"block"}} />
              </div>

              {/* ヘッダーボタン */}
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {session && viewState !== "create" && viewState !== "mybooks" && viewState !== "auth" && !selectedBookId && (
                  <>
                    <button onClick={handleShowMyBooks} style={{
                      display:"flex",alignItems:"center",gap:6,
                      padding:"8px 20px",background:"#f0f9f0",color:"#4a8c5a",
                      fontWeight:700,borderRadius:100,border:"2px solid #c8e0ca",
                      cursor:"pointer",fontSize:14,fontFamily:"inherit"
                    }}>
                      <Star style={{width:16,height:16}} />
                      きみの作品
                    </button>
                    <button onClick={handleStartCreating} style={{
                      display:"flex",alignItems:"center",gap:6,
                      padding:"10px 24px",
                      background:"linear-gradient(135deg,#6daa7a,#8dc49a)",
                      color:"white",fontWeight:700,borderRadius:100,border:"none",
                      cursor:"pointer",fontSize:15,fontFamily:"inherit",
                      boxShadow:"0 4px 12px rgba(109,170,122,0.35)"
                    }}>
                      <Plus style={{width:18,height:18}} />
                      つくる
                    </button>
                  </>
                )}
                {(viewState === "create" || viewState === "mybooks" || viewState === "auth") && (
                  <button onClick={handleBackToList} style={{
                    padding:"10px 24px",background:"white",color:"#4a8c5a",
                    fontWeight:700,borderRadius:100,border:"2px solid #c8e0ca",
                    cursor:"pointer",fontFamily:"inherit"
                  }}>
                    もどる
                  </button>
                )}
                {session && (
                  <button onClick={handleSignOut} title="ログアウト" style={{
                    padding:8,background:"transparent",border:"none",
                    cursor:"pointer",color:"#aaa",borderRadius:8
                  }}>
                    <LogOut style={{width:22,height:22}} />
                  </button>
                )}
              </div>
            </div>
          </header>

          <main>
            {viewState === "create" ? (
              <div style={{maxWidth:860,margin:"0 auto",padding:"40px 24px"}}>
                <div style={{background:"white",borderRadius:40,border:"2px solid #d4e8d4",padding:48,boxShadow:"0 8px 40px rgba(109,170,122,0.1)"}}>
                  <CreateBook onCancel={handleBackToList} onComplete={handleCreateComplete} />
                </div>
              </div>
            ) : viewState === "mybooks" ? (
              <div style={{maxWidth:860,margin:"0 auto",padding:"40px 24px"}}>
                <div style={{background:"white",borderRadius:40,border:"2px solid #d4e8d4",padding:48,boxShadow:"0 8px 40px rgba(109,170,122,0.1)"}}>
                  <MyBooks onSelectBook={handleSelectBook} />
                </div>
              </div>
            ) : viewState === "auth" ? (
              <Auth />
            ) : (
              <EhonForest onSelectBook={handleSelectBook} />
            )}
          </main>
        </>
      )}
    </div>
  )
}

export default App
