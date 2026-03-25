import { useState, useEffect, useRef } from "react"
import { supabase } from "../lib/supabaseClient"

const CATEGORIES = ["全部", "クレイえほん", "サイレント", "シリーズ絵本"]
const CATEGORY_EMOJI = {
  "全部": "🌳", "クレイえほん": "🍄", "サイレント": "🦉", "シリーズ絵本": "🍏",
}

const IS_DEV = import.meta.env.DEV

const SLIDES = [
  {
    bg: "linear-gradient(135deg,#d4ead4 0%,#b8d8c0 50%,#f4e8d0 100%)",
    emoji: "🌿",
    badge: "✨ NEW ✨",
    title: "新作のお知らせ",
    sub: "もうすぐ　あたらしい絵本が　やってくるよ 🐰",
  },
  {
    bg: "linear-gradient(135deg,#e8d4c0 0%,#d4b89a 50%,#f4e8d0 100%)",
    emoji: "🍄",
    badge: "クレイえほん",
    title: "クレイえほん",
    sub: "ねんどで　つくった　ふしぎな　せかい 🍄",
  },
  {
    bg: "linear-gradient(135deg,#1a2a3a 0%,#2d4a6a 50%,#3a5c7a 100%)",
    emoji: "🦉",
    badge: "サイレント",
    title: "サイレント",
    sub: "ことばなしで　つたわる　ものがたり 🌙",
    dark: true,
  },
  {
    bg: "linear-gradient(135deg,#f4e8d0 0%,#e8c88a 50%,#d4a84a 100%)",
    emoji: "🌰",
    badge: "シリーズ絵本",
    title: "シリーズ絵本",
    sub: "つながる　ものがたりの　せかい 🌰",
  },
]

const isVideo = (url) => url && (url.includes(".mp4") || url.includes(".webm") || url.includes(".mov"))

function HeroSection({ selectedIndex }) {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [images, setImages] = useState([null, null, null, null])
  const [focused, setFocused] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const fileInputRef = useRef(null)
  const wrapRef = useRef(null)
  const total = SLIDES.length

  const prev = () => setCurrent(c => (c - 1 + total) % total)
  const next = () => setCurrent(c => (c + 1) % total)

  const onPointerDown = (e) => { setDragging(true); setStartX(e.clientX) }
  const onPointerUp = (e) => {
    if (!dragging) return
    setDragging(false)
    const diff = e.clientX - startX
    if (diff < -40) next()
    else if (diff > 40) prev()
  }

  // デプロイ版でも画像を取得
  useEffect(() => {
    async function fetchHeroImages() {
      const { data } = await supabase.from("hero_slides").select("*")
      if (!data) return
      setImages(imgs => {
        const next = [...imgs]
        data.forEach(row => { if (row.slide_index >= 0 && row.slide_index < next.length) next[row.slide_index] = row.image_url })
        return next
      })
    }
    fetchHeroImages()
  }, [])

  // ローカル版のみペースト機能
  useEffect(() => {
    if (!IS_DEV) return
    const el = wrapRef.current
    if (!el) return
    const handler = (e) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const url = URL.createObjectURL(item.getAsFile())
          setImages(imgs => imgs.map((img, i) => i === current ? url : img))
          break
        }
      }
    }
    el.addEventListener("paste", handler)
    return () => el.removeEventListener("paste", handler)
  }, [current])

  const clearImage = (e) => {
    e.stopPropagation()
    setImages(imgs => imgs.map((img, i) => i === current ? null : img))
  }

  const deleteImage = async (e) => {
    e.stopPropagation()
    if (!confirm(`スライド${current + 1}のメディアを削除しますか？`)) return
    try {
      await supabase.storage.from("hiro-images").remove([
        `slide_${current}.png`, `slide_${current}.jpg`,
        `slide_${current}.mp4`, `slide_${current}.webm`, `slide_${current}.mov`
      ])
      await supabase.from("hero_slides").delete().eq("slide_index", current)
      setImages(imgs => imgs.map((img, i) => i === current ? null : img))
    } catch (err) {
      alert("削除エラー: " + err.message)
    }
  }

  const selectVideo = (e) => {
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const onVideoSelected = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImages(imgs => imgs.map((img, i) => i === current ? url : img))
    e.target.value = ""
  }

  const publishImage = async (e) => {
    e.stopPropagation()
    const blobUrl = images[current]
    if (!blobUrl || !blobUrl.startsWith("blob:")) return
    setPublishing(true)
    try {
      const res = await fetch(blobUrl)
      const blob = await res.blob()
      let ext = "jpg"
      if (blob.type.includes("png")) ext = "png"
      else if (blob.type.includes("mp4")) ext = "mp4"
      else if (blob.type.includes("webm")) ext = "webm"
      else if (blob.type.includes("mov") || blob.type.includes("quicktime")) ext = "mov"
      const path = `slide_${current}.${ext}`
      const { error: upErr } = await supabase.storage.from("hiro-images").upload(path, blob, { upsert: true, contentType: blob.type })
      if (upErr) { alert("アップロードエラー: " + upErr.message); setPublishing(false); return }
      const { data: { publicUrl } } = supabase.storage.from("hiro-images").getPublicUrl(path)
      const { error: dbErr } = await supabase.from("hero_slides").upsert({ slide_index: current, image_url: publicUrl }, { onConflict: "slide_index" })
      if (dbErr) { alert("保存エラー: " + dbErr.message); setPublishing(false); return }
      alert("公開しました！")
    } catch (err) {
      alert("エラー: " + err.message)
    }
    setPublishing(false)
  }

  return (
    <div
      ref={wrapRef}
      tabIndex={IS_DEV ? 0 : undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => IS_DEV && wrapRef.current?.focus()}
      style={{
        width: "100%",
        maxWidth: 900,
        height: "clamp(180px, 28vw, 380px)",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        borderBottom: "2px solid #e1eee4",
        cursor: "grab",
        userSelect: "none",
        outline: "none",
        boxShadow: IS_DEV && focused ? "inset 0 0 0 3px #6daa7a" : "none",
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={() => setDragging(false)}
    >
      {/* スライド */}
      <div style={{
        display: "flex",
        width: `${total * 100}%`,
        height: "100%",
        transform: `translateX(-${current * (100 / total)}%)`,
        transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            width: `${100 / total}%`,
            height: "100%",
            background: images[i] ? "none" : s.bg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            fontFamily: "'Zen Maru Gothic','Hiragino Maru Gothic Pro',sans-serif",
            flexShrink: 0,
            position: "relative",
          }}>
            {images[i] ? (
              isVideo(images[i]) ? (
                <video src={images[i]} autoPlay muted loop playsInline style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
              ) : (
                <img src={images[i]} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
              )
            ) : (
              <>
                <div style={{fontSize:"clamp(28px,4vw,44px)"}}>{s.emoji}</div>
                <div style={{
                  background: s.dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.75)",
                  borderRadius: 24,
                  padding: "clamp(14px,2vw,22px) clamp(24px,4vw,52px)",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                  backdropFilter: "blur(6px)",
                  border: s.dark ? "2px solid rgba(255,255,255,0.15)" : "2px solid rgba(200,224,202,0.7)",
                }}>
                  <p style={{margin:"0 0 6px",fontSize:"clamp(10px,1.2vw,13px)",fontWeight:800,color: s.dark?"#aad4ff":"#6daa7a",letterSpacing:"0.2em"}}>{s.badge}</p>
                  <p style={{margin:0,fontSize:"clamp(18px,2.4vw,26px)",fontWeight:800,color: s.dark?"#fff":"#3d5c46",letterSpacing:"0.05em"}}>{s.title}</p>
                  <p style={{margin:"8px 0 0",fontSize:"clamp(11px,1.2vw,14px)",color: s.dark?"rgba(255,255,255,0.7)":"#8aab94",fontWeight:700}}>{s.sub}</p>
                </div>
                {IS_DEV && i === current && (
                  <p style={{position:"absolute",bottom:16,fontSize:11,color: s.dark?"rgba(255,255,255,0.5)":"rgba(100,140,110,0.6)",fontWeight:700}}>
                    クリックして Ctrl+V で画像をペースト
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* 動画ファイル選択（非表示） */}
      {IS_DEV && (
        <input ref={fileInputRef} type="file" accept="video/mp4,video/webm,video/quicktime" style={{display:"none"}} onChange={onVideoSelected} />
      )}

      {/* ローカル版ボタン群 */}
      {IS_DEV && (
        <div style={{position:"absolute",top:10,right:10,zIndex:20,display:"flex",gap:8}}>
          {images[current]?.startsWith("blob:") && (
            <button onClick={publishImage} disabled={publishing} style={{
              background: publishing ? "rgba(109,170,122,0.6)" : "linear-gradient(135deg,#6daa7a,#4a8c5a)",
              color:"white",border:"none",borderRadius:8,padding:"6px 14px",
              cursor: publishing ? "default" : "pointer",fontSize:12,fontWeight:700,
              boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
            }}>{publishing ? "公開中..." : "🌿 公開する"}</button>
          )}
          {images[current] && !images[current].startsWith("blob:") && (
            <button onClick={deleteImage} style={{
              background:"linear-gradient(135deg,#e57373,#c0392b)",color:"white",border:"none",
              borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:700,
              boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
            }}>🗑 削除</button>
          )}
          {!images[current] && (
            <button onClick={selectVideo} style={{
              background:"linear-gradient(135deg,#7a6daa,#5a4a8c)",color:"white",border:"none",
              borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:700,
              boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
            }}>🎬 動画</button>
          )}
          {images[current] && (
            <button onClick={clearImage} style={{
              background:"rgba(0,0,0,0.45)",color:"white",border:"none",
              borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:700,
            }}>✕ クリア</button>
          )}
        </div>
      )}

      {/* 左右ボタン */}
      {[{pos:{left:12},label:"‹",fn:prev},{pos:{right:12},label:"›",fn:next}].map(({pos,label,fn}) => (
        <button key={label} onClick={fn} style={{
          position:"absolute",top:"50%",transform:"translateY(-50%)",
          ...pos,
          width:"clamp(32px,4vw,44px)",height:"clamp(32px,4vw,44px)",
          borderRadius:"50%",border:"none",
          background:"rgba(255,255,255,0.82)",
          color:"#4a8c5a",fontSize:"clamp(18px,2.5vw,28px)",fontWeight:900,
          cursor:"pointer",
          boxShadow:"0 2px 10px rgba(0,0,0,0.12)",
          display:"flex",alignItems:"center",justifyContent:"center",
          lineHeight:1, zIndex:10,
        }}>{label}</button>
      ))}

      {/* ドット */}
      <div style={{position:"absolute",bottom:14,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:10}}>
        {SLIDES.map((_,i) => (
          <div key={i} onClick={()=>setCurrent(i)} style={{
            width:i===current?20:8,height:8,borderRadius:4,
            background:i===current?"#6daa7a":"rgba(109,170,122,0.35)",
            cursor:"pointer",transition:"all 0.3s",
          }} />
        ))}
      </div>
    </div>
  )
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
      {/* ヒーローセクション 1920×1006 */}
      <HeroSection selectedIndex={CATEGORIES.indexOf(selectedCategory)} />
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 24px 28px",position:"relative",zIndex:10}}>
        <p style={{textAlign:"center",color:"#8aab94",fontWeight:700,fontSize:12,marginBottom:14}}>カテゴリーでさがす</p>
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
                  <button className="cta-btn" style={{fontFamily:"inherit"}} onClick={(e) => {
                    const btn = e.currentTarget
                    const circle = document.createElement("span")
                    const diameter = Math.max(btn.clientWidth, btn.clientHeight)
                    const rect = btn.getBoundingClientRect()
                    circle.style.width = circle.style.height = `${diameter}px`
                    circle.style.left = `${e.clientX - rect.left - diameter / 2}px`
                    circle.style.top = `${e.clientY - rect.top - diameter / 2}px`
                    circle.classList.add("ripple")
                    btn.querySelector(".ripple")?.remove()
                    btn.appendChild(circle)
                    onSelectBook(book.id)
                  }}>
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