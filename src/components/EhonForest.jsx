import React, { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import { Bird, Apple, Sparkles } from "lucide-react"

const CATEGORIES = ["全部", "クレイえほん", "サイレントストーリー", "えほん", "シリーズ絵本"]

const CATEGORY_EMOJI = {
  "全部": "🌿",
  "クレイえほん": "🎨",
  "サイレントストーリー": "🔇",
  "えほん": "📖",
}

export default function EhonForest({ onSelectBook }) {
  const [books, setBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [loading, setLoading] = useState(true)
  const [dragOverCat, setDragOverCat] = useState(null)
  const [toast, setToast] = useState(null)
  const [toastType, setToastType] = useState("ok")

  const filteredBooks = selectedCategory === "全部"
    ? books
    : books.filter((book) => book.category === selectedCategory)

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false })
      if (!error && data) setBooks(data)
      setLoading(false)
    }
    fetchBooks()
  }, [])

  const showToast = (msg, type = "ok") => {
    setToast(msg)
    setToastType(type)
    setTimeout(() => setToast(null), 3000)
  }

  // ---- Drag handlers on card ----
  const handleDragStart = (e, bookId) => {
    e.dataTransfer.setData("bookId", String(bookId))
    e.dataTransfer.effectAllowed = "move"
  }

  // ---- Drag handlers on tab ----
  const handleTabDragOver = (e, cat) => {
    if (cat === "全部") return
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverCat(cat)
  }

  const handleTabDragLeave = (e) => {
    // Only clear if truly leaving the tab (not entering a child element)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverCat(null)
    }
  }

  const handleTabDrop = async (e, cat) => {
    e.preventDefault()
    setDragOverCat(null)

    const bookId = e.dataTransfer.getData("bookId")
    if (!bookId || cat === "全部") return

    const book = books.find(b => String(b.id) === bookId)
    if (!book) return
    if (book.category === cat) {
      showToast(`すでに「${cat}」です`, "info")
      return
    }

    // Optimistic update
    const prevBooks = books
    setBooks(prev => prev.map(b => String(b.id) === bookId ? { ...b, category: cat } : b))

    const { error } = await supabase
      .from("books")
      .update({ category: cat })
      .eq("id", bookId)

    if (error) {
      console.error("Supabase update error:", error)
      setBooks(prevBooks) // rollback
      if (error.code === "42703") {
        showToast("⚠️ DBにcategoryカラムがありません。Supabaseで追加してください", "error")
      } else if (error.code === "42501") {
        showToast("⚠️ 権限エラー。ログインが必要です", "error")
      } else {
        showToast(`⚠️ エラー: ${error.message}`, "error")
      }
    } else {
      showToast(`✅ 「${book.title}」→「${cat}」に移動しました！`)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7fff0] text-[#2d4a22] font-sans overflow-x-hidden relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-[5%] w-64 h-64 bg-[#ccff00] rounded-full blur-[100px]"></div>
        <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-[#a3ff33] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[15%] w-72 h-72 bg-[#66ff66] rounded-full blur-[110px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[160px]"></div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] font-black text-xl px-10 py-5 rounded-full shadow-2xl border-4 transition-all
            ${toastType === "error"
              ? "bg-red-600 text-white border-red-800"
              : toastType === "info"
              ? "bg-white text-[#2d4a22] border-[#ccff00]"
              : "bg-[#2d4a22] text-[#ccff00] border-[#ccff00]"
            }`}
        >
          {toast}
        </div>
      )}

      {/* Hero Section */}
      <header className="relative pt-24 pb-16 px-6 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 gap-6">
            <div className="bg-[#ccff00] p-4 rounded-[2.5rem] rotate-6 shadow-[0_10px_20px_rgba(204,255,0,0.3)] animate-bounce border-4 border-white">
              <Apple className="text-[#2d4a22] w-10 h-10" />
            </div>
            <div className="bg-white p-4 rounded-[2.5rem] -rotate-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] animate-pulse border-4 border-[#ccff00]">
              <Sparkles className="text-[#99cc00] w-10 h-10" />
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            <span className="text-[#2d4a22] drop-shadow-[0_4px_0_#ccff00]">えほん</span>
            <span className="text-[#99cc00]">の</span>
            <span className="text-[#ccff00] drop-shadow-[0_4px_0_#2d4a22]">森</span>
          </h1>

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#ccff00] blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/80 backdrop-blur-md rounded-[3rem] px-12 py-6 border-4 border-[#ccff00] shadow-xl">
              <h2 className="text-3xl font-black text-[#2d4a22]">みずみずしい絵本の世界へ</h2>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="px-10 py-4 bg-[#2d4a22] rounded-full text-[#ccff00] font-black text-xl shadow-[0_8px_0_#1a2e14]">
              {books.length} さつの フレッシュな作品
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-6">
        <p className="text-center text-[#4a6b3d] font-black text-lg mb-5 opacity-70">
          📚 本カードをカテゴリーにドラッグ＆ドロップして振り分けよう！
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            const isDragTarget = dragOverCat === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                onDragOver={(e) => handleTabDragOver(e, cat)}
                onDragLeave={(e) => handleTabDragLeave(e)}
                onDrop={(e) => handleTabDrop(e, cat)}
                aria-label={cat}
                className={`flex items-center gap-2 px-8 py-4 rounded-full border-4 font-black text-xl transition-all duration-200 shadow-md
                  ${isDragTarget
                    ? "bg-[#ccff00] text-[#2d4a22] border-[#2d4a22] scale-110 shadow-[0_0_30px_rgba(204,255,0,0.9)] ring-4 ring-[#2d4a22]"
                    : isActive
                      ? "bg-[#2d4a22] text-[#ccff00] border-[#2d4a22] shadow-[0_6px_0_#1a2e14] scale-105"
                      : "bg-white text-[#2d4a22] border-[#ccff00] hover:bg-[#f0ffcc] hover:scale-105"
                  }`}
              >
                <span className="text-2xl">{CATEGORY_EMOJI[cat]}</span>
                {cat}
                {isActive && (
                  <span className="ml-1 bg-[#ccff00] text-[#2d4a22] rounded-full px-3 py-0.5 text-base font-black shadow">
                    {filteredBooks.length}
                  </span>
                )}
                {isDragTarget && (
                  <span className="ml-1 animate-bounce text-2xl">⬇️</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Gallery Section */}
      <main className="max-w-7xl mx-auto px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
          {loading ? (
            <div className="col-span-full text-center py-32 bg-white/40 backdrop-blur-xl rounded-[5rem] border-4 border-white shadow-2xl">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 bg-[#ccff00] rounded-full animate-ping opacity-20"></div>
                <div className="relative animate-spin rounded-full h-24 w-24 border-t-8 border-[#ccff00] border-r-8 border-transparent"></div>
              </div>
              <p className="mt-10 text-3xl font-black text-[#2d4a22] animate-pulse">りんごを収穫中...</p>
            </div>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, book.id)}
                className="group cursor-grab active:cursor-grabbing relative select-none"
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-[#ccff00] rounded-[4rem] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none"></div>
                {/* Drag hint badge */}
                <div className="absolute top-3 right-3 z-20 bg-[#ccff00] text-[#2d4a22] text-xs font-black rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity shadow pointer-events-none">
                  ✋ ドラッグ
                </div>
                <div
                  className="relative bg-white/90 backdrop-blur-sm rounded-[4rem] border-[6px] border-[#ccff00] p-10 h-full transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-1 shadow-[0_20px_50px_rgba(204,255,0,0.1)] group-hover:shadow-[0_40px_80px_rgba(204,255,0,0.2)]"
                >
                  <div className="flex flex-col h-full items-center text-center">
                    <div className="w-28 h-28 bg-[#f0ffcc] rounded-[2.5rem] flex items-center justify-center mb-8 relative">
                      <Apple className="w-14 h-14 text-[#99cc00] group-hover:scale-110 transition-transform" />
                      <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md">
                        <Sparkles className="w-6 h-6 text-[#ccff00]" />
                      </div>
                    </div>

                    {book.category ? (
                      <span className="mb-4 px-5 py-2 bg-[#f0ffcc] text-[#2d4a22] text-base font-black rounded-full border-2 border-[#ccff00]">
                        {CATEGORY_EMOJI[book.category] || "📚"} {book.category}
                      </span>
                    ) : (
                      <span className="mb-4 px-5 py-2 bg-gray-100 text-gray-400 text-base font-black rounded-full border-2 border-gray-200">
                        未分類
                      </span>
                    )}

                    <h3 className="text-3xl font-black mb-4 text-[#2d4a22] line-clamp-2 leading-tight tracking-tight">
                      {book.title}
                    </h3>

                    <div className="w-16 h-2 bg-[#ccff00] rounded-full my-6"></div>

                    <div className="flex items-center gap-2 mb-10">
                      <span className="text-base font-black text-[#99cc00] bg-white border-2 border-[#ccff00] px-6 py-2 rounded-full shadow-sm">
                        {book.author || "森の作者"}
                      </span>
                    </div>

                    <button
                      className="mt-auto w-full py-5 bg-[#ccff00] text-[#2d4a22] font-black text-2xl rounded-[2rem] shadow-[0_10px_0_#99cc00] group-hover:shadow-[0_4px_0_#99cc00] group-hover:translate-y-1 transition-all"
                      onClick={() => onSelectBook(book.id)}
                    >
                      ひらく！
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-32 bg-white/60 backdrop-blur-xl rounded-[6rem] border-8 border-white shadow-3xl">
              <div className="bg-[#ccff00]/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
                <Apple className="w-16 h-16 text-[#99cc00]" />
              </div>
              <h3 className="text-5xl font-black mb-6 text-[#2d4a22]">
                {selectedCategory === "全部" ? "まだりんごがなっていないよ"
                  : `「${selectedCategory}」はまだないよ`}
              </h3>
              <p className="text-2xl font-bold text-[#4a6b3d] mb-12">きみの物語で、この森をいっぱいにしよう！</p>
              <div className="w-2 h-40 bg-gradient-to-b from-[#ccff00] to-transparent mx-auto rounded-full"></div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-32 text-center mt-32 relative overflow-hidden bg-white/60 backdrop-blur-md border-t-8 border-[#ccff00]">
        <div className="flex justify-center gap-12 mb-12 relative z-10">
          <Apple className="text-[#99cc00] w-16 h-16 animate-pulse" />
          <Sparkles className="text-[#ccff00] w-16 h-16 rotate-45" />
          <Bird className="text-[#2d4a22] w-16 h-16 opacity-20" />
        </div>
        <p className="text-6xl font-black text-[#2d4a22] tracking-tighter relative z-10">
          えほんの<span className="text-[#99cc00]">森</span>
        </p>
        <p className="text-xl font-black text-[#99cc00] mt-6 tracking-[0.2em] relative z-10 uppercase"> Fresh Apple Stories </p>
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ccff00] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#99ff33] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-20"></div>
      </footer>
    </div>
  )
}
