import React, { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import { Book, Heart, Sprout, Bird, Star, Cloud, Sun, Apple, Sparkles } from "lucide-react"

export default function EhonForest({ onSelectBook }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (!error && data) {
        setBooks(data)
      }
      setLoading(false)
    }
    fetchBooks()
  }, [])

  return (
    <div className="min-h-screen bg-[#f7fff0] text-[#2d4a22] font-sans overflow-x-hidden relative">
      {/* Green Apple Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-[5%] w-64 h-64 bg-[#ccff00] rounded-full blur-[100px]"></div>
        <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-[#a3ff33] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[15%] w-72 h-72 bg-[#66ff66] rounded-full blur-[110px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[160px]"></div>
      </div>

      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-6 text-center">
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
          
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-[#ccff00] blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/80 backdrop-blur-md rounded-[3rem] px-12 py-6 border-4 border-[#ccff00] shadow-xl">
               <h2 className="text-3xl font-black text-[#2d4a22]">みずみずしい絵本の世界へ</h2>
            </div>
          </div>
          
          <p className="text-2xl font-bold leading-relaxed max-w-2xl mx-auto text-[#4a6b3d]">
            青りんごのような、フレッシュでキラキラした<br />
            すてきな物語がここにあるよ。
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="px-10 py-4 bg-[#2d4a22] rounded-full text-[#ccff00] font-black text-xl shadow-[0_8px_0_#1a2e14] transform transition-all hover:translate-y-1 hover:shadow-[0_2px_0_#1a2e14]">
              {books.length} さつの フレッシュな作品
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
          {loading ? (
             <div className="col-span-full text-center py-32 bg-white/40 backdrop-blur-xl rounded-[5rem] border-4 border-white shadow-2xl">
                <div className="relative w-24 h-24 mx-auto">
                   <div className="absolute inset-0 bg-[#ccff00] rounded-full animate-ping opacity-20"></div>
                   <div className="relative animate-spin rounded-full h-24 w-24 border-t-8 border-[#ccff00] border-r-8 border-transparent"></div>
                </div>
                <p className="mt-10 text-3xl font-black text-[#2d4a22] animate-pulse">りんごを収穫中...</p>
             </div>
          ) : books.length > 0 ? (
            books.map((book) => (
              <div 
                key={book.id} 
                className="group cursor-pointer relative"
                onClick={() => onSelectBook(book.id)}
              >
                {/* Visual Glow */}
                <div className="absolute -inset-4 bg-[#ccff00] rounded-[4rem] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm rounded-[4rem] border-[6px] border-[#ccff00] p-10 h-full transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-1 shadow-[0_20px_50px_rgba(204,255,0,0.1)] group-hover:shadow-[0_40px_80px_rgba(204,255,0,0.2)]">
                   <div className="flex flex-col h-full items-center text-center">
                      <div className="w-28 h-28 bg-[#f0ffcc] rounded-[2.5rem] flex items-center justify-center mb-8 relative">
                        <Apple className="w-14 h-14 text-[#99cc00] group-hover:scale-110 transition-transform" />
                        <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md">
                          <Sparkles className="w-6 h-6 text-[#ccff00]" />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black mb-4 text-[#2d4a22] line-clamp-2 leading-tight tracking-tight">
                        {book.title}
                      </h3>
                      
                      <div className="w-16 h-2 bg-[#ccff00] rounded-full my-6"></div>
                      
                      <div className="flex items-center gap-2 mb-10">
                        <span className="text-base font-black text-[#99cc00] bg-white border-2 border-[#ccff00] px-6 py-2 rounded-full shadow-sm">
                          {book.author || "森の作者"}
                        </span>
                      </div>
                      
                      <button className="mt-auto w-full py-5 bg-[#ccff00] text-[#2d4a22] font-black text-2xl rounded-[2rem] shadow-[0_10px_0_#99cc00] group-hover:shadow-[0_4px_0_#99cc00] group-hover:translate-y-1 transition-all">
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
                <h3 className="text-5xl font-black mb-6 text-[#2d4a22]">まだりんごがなっていないよ</h3>
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
        
        {/* Abstract decor */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ccff00] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#99ff33] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-20"></div>
      </footer>
    </div>
  )
}