import { useState, useEffect } from "react"
import { supabase } from "./lib/supabaseClient"
import Auth from "./components/Auth"
import EhonForest from "./components/EhonForest"
import BookViewer from "./components/BookViewer"
import CreateBook from "./components/CreateBook"
import CuteButton from "./components/CuteButton"
import MyBooks from "./components/MyBooks"
import { Apple } from "lucide-react"
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
      <div className="loading-container bg-[#f7fff0]">
        <div className="relative">
          <div className="absolute inset-0 bg-[#ccff00] rounded-full blur-xl animate-pulse"></div>
          <div className="loading-spinner !border-[#2d4a22] !border-t-transparent !w-20 !h-20 !border-8"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="app bg-[#f7fff0] font-sans selection:bg-[#ccff00] selection:text-[#2d4a22]">
      {viewState === "viewer" && selectedBookId ? (
        <BookViewer bookId={selectedBookId} onClose={handleBackToList} />
      ) : (
        <>
          <header className="app-header !bg-white/90 sticky top-0 z-50 backdrop-blur-2xl border-b-8 border-[#ccff00] !shadow-2xl py-6 transition-all">
            <div className="container px-8 flex justify-between items-center">
              <div className="flex items-center gap-4 cursor-pointer group" onClick={handleBackToList}>
                <div className="bg-[#ccff00] p-3 rounded-3xl group-hover:rotate-[15deg] transition-all shadow-lg border-2 border-white">
                  <Apple className="text-[#2d4a22] w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-[#2d4a22]">
                  えほんの<span className="text-[#99cc00]">森</span>
                </h1>
              </div>

              <div className="header-actions flex items-center gap-6">
                {(viewState === "create" || viewState === "mybooks" || viewState === "auth") && (
                  <button onClick={handleBackToList} className="px-10 py-3 bg-white text-[#2d4a22] font-black rounded-full border-[6px] border-[#ccff00] hover:bg-[#f7fff0] transition-colors shadow-lg active:translate-y-1">
                    もどる
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="app-main min-h-[calc(100vh-120px)]">
            {viewState === "create" ? (
              <div className="container py-20 px-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-[4rem] border-8 border-[#ccff00] p-12 shadow-[0_40px_100px_rgba(204,255,0,0.15)] animate-in fade-in zoom-in duration-500">
                  <CreateBook onCancel={handleBackToList} onComplete={handleCreateComplete} />
                </div>
              </div>
            ) : viewState === "mybooks" ? (
              <div className="container py-20 px-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-[4rem] border-8 border-[#ccff00] p-12 shadow-[0_40px_100px_rgba(204,255,0,0.15)] animate-in fade-in zoom-in duration-500">
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
