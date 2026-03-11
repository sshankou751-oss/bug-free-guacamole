import React, { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

const CATEGORIES = ["全部", "クレイえほん", "サイレントストーリー", "えほん", "シリーズ絵本"]
const CATEGORY_EMOJI = {
  "全部": "🌳", "クレイえほん": "🍄", "サイレントストーリー": "🦉", "えほん": "🐰", "シリーズ絵本": "🌰",
}

export default function EhonForest({ onSelectBook }) {
  const [books, setBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [loading, setLoading] = useState(true)
  const [dragOverCat, setDragOverCat] = useState(null)
  const [toast, setToast] = useState(null)
  const [toastType, setToastType] = useState("ok")

  const filteredBooks = selectedCategory === "全部" ? books : books.filter((b) => b.category === selectedCategory)

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from("books").select("*").order("created_at", { ascending: false })
      if (!error && data) setBooks(data)
      setLoading(false)
    }
    fetchBooks()
  }, [])

  const showToast = (msg, type = "ok") => { setToast(msg); setToastType(type); setTimeout(() => setToast(null), 3000) }

  const handleDragStart = (e, bookId) => { e.dataTransfer.setData("bookId", String(bookId)); e.dataTransfer.effectAllowed = "move" }
  const handleTabDragOver = (e, cat) => { if (cat === "全部") return; e.preventDefault(); setDragOverCat(cat) }
  const handleTabDragLeave = (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverCat(null) }
  const handleTabDrop = async (e, cat) => {
    e.preventDefault(); setDragOverCat(null)
    const bookId = e.dataTransfer.getData("bookId")
    if (!bookId || cat === "全部") return
    const book = books.find(b => String(b.id) === bookId)
    if (!book || book.category === cat) return
    const prev = books
    setBooks(bs => bs.map(b => String(b.id) === bookId ? { ...b, category: cat } : b))
    const { error } = await supabase.from("books").update({ category: cat }).eq("id", bookId)
    if (error) { setBooks(prev); showToast("エラー: " + error.message, "error") }
    else showToast(book.title + " を " + cat + " に移動しました！")
  }

  return (
    <div style={{minHeight:"100vh",background:"#fdf8ef",fontFamily:"'Zen Maru Gothic','Hiragino Maru Gothic Pro',sans-serif",color:"#3d5c46"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",opacity:0.18}}>
        <div style={{position:"absolute",top:40,left:"5%",width:280,height:280,background:"#a8d8a0",borderRadius:"50%",filter:"blur(90px)"}} />
        <div style={{position:"absolute",top:"30%",right:"8%",width:320,height:320,background:"#f4c5d0",borderRadius:"50%",filter:"blur(110px)"}} />
        <div style={{position:"absolute",bottom:"12%",left:"12%",width:260,height:260,background:"#f9e384",borderRadius:"50%",filter:"blur(100px)"}} />
      </div>
      {toast && (
        <div style={{position:"fixed",top:24,left:"50%",transform:"translateX(-50%)",zIndex:100,fontWeight:700,fontSize:16,padding:"14px 32px",borderRadius:100,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",background:toastType==="error"?"#e57373":toastType==="info"?"white":"#6daa7a",color:toastType==="info"?"#3d5c46":"white"}}>
          {toast}
        </div>
      )}
      <header style={{textAlign:"center",padding:"48px 24px 28px",position:"relative",zIndex:10}}>
        <img src="/og-logo-v2.png" alt="絵本のもり" style={{height:148,width:"auto",margin:"0 auto 14px",display:"block",filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.08))"}} />
        <p style={{color:"#6daa7a",fontWeight:700,fontSize:17,margin:"0 0 16px"}}>みずみずしい絵本の世界へようこそ 🌿</p>
        <div style={{display:"inline-block",padding:"8px 24px",background:"rgba(255,255,255,0.8)",borderRadius:100,border:"2px solid #d4e8d4",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <span style={{color:"#4a8c5a",fontWeight:700,fontSize:14}}>{books.length} さつの絵本</span>
        </div>
      </header>
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 24px 28px",position:"relative",zIndex:10}}>
        <p style={{textAlign:"center",color:"#8aab94",fontWeight:700,fontSize:12,marginBottom:14}}>カテゴリーでさがす（ドラッグで振り分けもできます）</p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10}}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            const isDrag = dragOverCat === cat
            return (
              <button key={cat} onClick={() => setSelectedCategory(cat)} onDragOver={(e) => handleTabDragOver(e, cat)} onDragLeave={handleTabDragLeave} onDrop={(e) => handleTabDrop(e, cat)}
                style={{display:"flex",alignItems:"center",gap:6,padding:"9px 20px",borderRadius:100,fontWeight:700,fontSize:14,fontFamily:"inherit",cursor:"pointer",transition:"all 0.2s",border:isDrag?"2px solid #3d5c46":isActive?"2px solid transparent":"2px solid #c8e0ca",background:isDrag?"#ccf0d4":isActive?"#6daa7a":"white",color:isDrag?"#3d5c46":isActive?"white":"#4a8c5a",boxShadow:isActive?"0 4px 12px rgba(109,170,122,0.28)":"0 2px 6px rgba(0,0,0,0.05)",transform:isDrag?"scale(1.08)":isActive?"scale(1.04)":"scale(1)"}}>
                <span>{CATEGORY_EMOJI[cat]}</span>{cat}
                {isActive && <span style={{background:"rgba(255,255,255,0.3)",borderRadius:100,padding:"1px 8px",fontSize:12}}>{filteredBooks.length}</span>}
                {isDrag && <span>⬇️</span>}
              </button>
            )
          })}
        </div>
      </div>
      <main style={{maxWidth:1080,margin:"0 auto",padding:"0 24px 56px",position:"relative",zIndex:10}}>
        {loading ? (
          <div style={{textAlign:"center",padding:"80px 0"}}>
            <div style={{width:52,height:52,border:"5px solid #d4e8d4",borderTopColor:"#6daa7a",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 20px"}} />
            <p style={{color:"#6daa7a",fontWeight:700}}>よみこみ中...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(268px,1fr))",gap:24}}>
            {filteredBooks.map((book) => (
              <div key={book.id} draggable="true" onDragStart={(e) => handleDragStart(e, book.id)}>
                <div style={{background:"white",borderRadius:24,border:"2px solid #e4f0e4",boxShadow:"0 4px 20px rgba(0,0,0,0.055)",padding:"24px 20px",textAlign:"center",fontFamily:"inherit",transition:"all 0.2s",cursor:"pointer"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(109,170,122,0.15)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.055)"}}>
                  {book.category && (
                    <span style={{display:"inline-block",marginBottom:10,padding:"4px 12px",background:"#f0f9f0",color:"#4a8c5a",fontSize:12,fontWeight:700,borderRadius:100,border:"1.5px solid #c8e0ca"}}>
                      {CATEGORY_EMOJI[book.category] || "📚"} {book.category}
                    </span>
                  )}
                  <div style={{width:80,height:80,background:"linear-gradient(135deg,#d4ead4,#b8d8c0)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:36}}>
                    {CATEGORY_EMOJI[book.category] || "📚"}
                  </div>
                  <h3 style={{fontSize:17,fontWeight:700,color:"#3d5c46",margin:"0 0 8px",lineHeight:1.4,fontFamily:"inherit"}}>{book.title}</h3>
                  <p style={{fontSize:12,color:"#8aab94",margin:"0 0 18px",fontFamily:"inherit"}}>{book.author || "森の作者"}</p>
                  <button onClick={() => onSelectBook(book.id)} style={{width:"100%",padding:"11px 0",background:"linear-gradient(135deg,#f4895a,#f9ae7a)",color:"white",fontWeight:700,fontSize:15,fontFamily:"inherit",borderRadius:14,border:"none",cursor:"pointer",boxShadow:"0 4px 12px rgba(244,137,90,0.28)",transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 20px rgba(244,137,90,0.35)"}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 12px rgba(244,137,90,0.28)"}}>
                    ひらく！
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{textAlign:"center",padding:"60px 24px",background:"rgba(255,255,255,0.7)",borderRadius:24,border:"2px solid #e4f0e4"}}>
            <div style={{fontSize:56,marginBottom:14}}>🌱</div>
            <h3 style={{fontSize:20,fontWeight:700,color:"#6daa7a",margin:"0 0 8px",fontFamily:"inherit"}}>{selectedCategory === "全部" ? "まだ絵本がないよ" : `「${selectedCategory}」はまだないよ`}</h3>
            <p style={{color:"#8aab94",fontFamily:"inherit"}}>きみの物語で、この森をいっぱいにしよう！</p>
          </div>
        )}
      </main>
      <footer style={{textAlign:"center",padding:"40px 24px",background:"rgba(255,255,255,0.5)",borderTop:"2px solid #e4f0e4",position:"relative",zIndex:10}}>
        <img src="/og-logo-v2.png" alt="絵本のもり" style={{height:52,width:"auto",margin:"0 auto 10px",display:"block",opacity:0.45}} />
        <p style={{color:"#aac8aa",fontSize:12,margin:0,fontFamily:"inherit"}}>© 絵本のもり</p>
      </footer>
    </div>
  )
}