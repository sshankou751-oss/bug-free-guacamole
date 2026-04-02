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
          <style>{`
            .header-banner {
              width: 100% !important;
              height: 800px !important;
              object-fit: contain !important;
              object-position: center 25% !important;
              display: block !important;
              cursor: pointer !important;
            }
          `}</style>
          <header style={{position:"relative",padding:0,boxShadow:"0 2px 16px rgba(109,170,122,0.12)"}}>
            <div style={{position:"relative",lineHeight:0}}>
              {/* バナー画像 */}
              <img src="/header-banner-v4.png" alt="絵本のもり"
                onClick={handleBackToList}
                className="header-banner" />
              {/* ボタン群：右上に重ねて表示 */}
              <div style={{position:"absolute",top:"50%",right:16,transform:"translateY(-50%)",display:"flex",alignItems:"center",gap:8,zIndex:1}}>
                {viewState !== "create" && viewState !== "mybooks" && viewState !== "auth" && !selectedBookId && (
                  <>
                    {session && (
                      <button onClick={handleShowMyBooks} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 14px",background:"rgba(255,255,255,0.85)",color:"#4a8c5a",fontWeight:700,borderRadius:100,border:"1.5px solid #c8e0ca",cursor:"pointer",fontSize:13,fontFamily:"inherit",backdropFilter:"blur(4px)"}}>
                        <Star style={{width:14,height:14}} />
                        きみの作品
                      </button>
                    )}
                    {import.meta.env.DEV && (
                      <button onClick={handleStartCreating} style={{display:"flex",alignItems:"center",gap:4,padding:"8px 18px",background:"linear-gradient(135deg,#6daa7a,#8dc49a)",color:"white",fontWeight:700,borderRadius:100,border:"none",cursor:"pointer",fontSize:13,fontFamily:"inherit",boxShadow:"0 3px 10px rgba(109,170,122,0.4)"}}>
                        <Plus style={{width:15,height:15}} />
                        つくる
                      </button>
                    )}
                  </>
                )}
                {(viewState === "create" || viewState === "mybooks" || viewState === "auth") && (
                  <button onClick={handleBackToList} style={{padding:"7px 18px",background:"rgba(255,255,255,0.85)",color:"#4a8c5a",fontWeight:700,borderRadius:100,border:"1.5px solid #c8e0ca",cursor:"pointer",fontFamily:"inherit",backdropFilter:"blur(4px)"}}>
                    もどる
                  </button>
                )}
                {session && (
                  <button onClick={handleSignOut} title="ログアウト" style={{padding:6,background:"rgba(255,255,255,0.7)",border:"none",cursor:"pointer",color:"#999",borderRadius:8,backdropFilter:"blur(4px)"}}>
                    <LogOut style={{width:20,height:20}} />
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
