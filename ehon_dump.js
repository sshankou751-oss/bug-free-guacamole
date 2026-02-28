import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/EhonForest.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=070d292f"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=070d292f"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { supabase } from "/src/lib/supabaseClient.js";
import { Book, Heart, Sprout, Bird, Star, Cloud, Sun, Apple, Sparkles } from "/node_modules/.vite/deps/lucide-react.js?v=75daf376";
export default function EhonForest({ onSelectBook }) {
  _s();
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const categories = ["すべて", "むかしばなし", "サイレントストーリー", "えほん"];
  const filteredBooks = books.filter((book, index) => {
    if (selectedCategory === "すべて") return true;
    const cat = book.category || categories[index % (categories.length - 1) + 1];
    return cat === selectedCategory;
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from("books").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        setBooks(data);
      }
      setLoading(false);
    }
    fetchBooks();
  }, []);
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-[#f7fff0] text-[#2d4a22] font-sans overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 pointer-events-none overflow-hidden opacity-30", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-10 left-[5%] w-64 h-64 bg-[#ccff00] rounded-full blur-[100px]" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-[30%] right-[10%] w-80 h-80 bg-[#a3ff33] rounded-full blur-[120px]" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-[10%] left-[15%] w-72 h-72 bg-[#66ff66] rounded-full blur-[110px]" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[160px]" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("header", { className: "relative pt-24 pb-20 px-6 text-center", children: /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center mb-8 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-[#ccff00] p-4 rounded-[2.5rem] rotate-6 shadow-[0_10px_20px_rgba(204,255,0,0.3)] animate-bounce border-4 border-white", children: /* @__PURE__ */ jsxDEV(Apple, { className: "text-[#2d4a22] w-10 h-10" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 67,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 66,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-4 rounded-[2.5rem] -rotate-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] animate-pulse border-4 border-[#ccff00]", children: /* @__PURE__ */ jsxDEV(Sparkles, { className: "text-[#99cc00] w-10 h-10" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 70,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 69,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-none", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[#2d4a22] drop-shadow-[0_4px_0_#ccff00]", children: "えほん" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[#99cc00]", children: "の" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[#ccff00] drop-shadow-[0_4px_0_#2d4a22]", children: "森" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 74,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative inline-block mb-10", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[#ccff00] blur-2xl opacity-20 animate-pulse" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative bg-white/80 backdrop-blur-md rounded-[3rem] px-12 py-6 border-4 border-[#ccff00] shadow-xl", children: /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-black text-[#2d4a22]", children: "みずみずしい絵本の世界へ" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 83,
          columnNumber: 16
        }, this) }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 82,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "px-10 py-4 bg-[#2d4a22] rounded-full text-[#ccff00] font-black text-xl shadow-[0_8px_0_#1a2e14] transform transition-all hover:translate-y-1 hover:shadow-[0_2px_0_#1a2e14]", children: [
        books.length,
        " さつの フレッシュな作品"
      ] }, void 0, true, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 87,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 86,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("main", { className: "max-w-7xl mx-auto px-8 py-20 relative z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16", children: loading ? /* @__PURE__ */ jsxDEV("div", { className: "col-span-full text-center py-32 bg-white/40 backdrop-blur-xl rounded-[5rem] border-4 border-white shadow-2xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "relative w-24 h-24 mx-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[#ccff00] rounded-full animate-ping opacity-20" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 100,
          columnNumber: 20
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative animate-spin rounded-full h-24 w-24 border-t-8 border-[#ccff00] border-r-8 border-transparent" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 101,
          columnNumber: 20
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 99,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "mt-10 text-3xl font-black text-[#2d4a22] animate-pulse", children: "りんごを収穫中..." }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 103,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 98,
      columnNumber: 11
    }, this) : books.length > 0 ? filteredBooks.map(
      (book, index) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "group cursor-pointer relative",
          onClick: () => onSelectBook(book.id),
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-4 bg-[#ccff00] rounded-[4rem] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" }, void 0, false, {
              fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
              lineNumber: 113,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative bg-white/90 backdrop-blur-sm rounded-[4rem] border-[6px] border-[#ccff00] p-10 h-full transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-1 shadow-[0_20px_50px_rgba(204,255,0,0.1)] group-hover:shadow-[0_40px_80px_rgba(204,255,0,0.2)]", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col h-full items-center text-center", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-28 h-28 bg-[#f0ffcc] rounded-[2.5rem] flex items-center justify-center mb-8 relative", children: [
                /* @__PURE__ */ jsxDEV(Apple, { className: "w-14 h-14 text-[#99cc00] group-hover:scale-110 transition-transform" }, void 0, false, {
                  fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                  lineNumber: 118,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md", children: /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-6 h-6 text-[#ccff00]" }, void 0, false, {
                  fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                  lineNumber: 120,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                  lineNumber: 119,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                lineNumber: 117,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "text-3xl font-black mb-4 text-[#2d4a22] line-clamp-2 leading-tight tracking-tight", children: book.title }, void 0, false, {
                fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                lineNumber: 124,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-2 bg-[#ccff00] rounded-full my-6" }, void 0, false, {
                fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                lineNumber: 128,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-10", children: /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-[#99cc00] bg-white border-2 border-[#ccff00] px-6 py-2 rounded-full shadow-sm", children: book.author || "森の作者" }, void 0, false, {
                fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                lineNumber: 131,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                lineNumber: 130,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("button", { className: "mt-auto w-full py-5 bg-[#ccff00] text-[#2d4a22] font-black text-2xl rounded-[2rem] shadow-[0_10px_0_#99cc00] group-hover:shadow-[0_4px_0_#99cc00] group-hover:translate-y-1 transition-all", children: "ひらく！" }, void 0, false, {
                fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
                lineNumber: 136,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
              lineNumber: 116,
              columnNumber: 20
            }, this) }, void 0, false, {
              fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
              lineNumber: 115,
              columnNumber: 17
            }, this)
          ]
        },
        book.id,
        true,
        {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 107,
          columnNumber: 11
        },
        this
      )
    ) : /* @__PURE__ */ jsxDEV("div", { className: "col-span-full text-center py-32 bg-white/60 backdrop-blur-xl rounded-[6rem] border-8 border-white shadow-3xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-[#ccff00]/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce", children: /* @__PURE__ */ jsxDEV(Apple, { className: "w-16 h-16 text-[#99cc00]" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 146,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 145,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-5xl font-black mb-6 text-[#2d4a22]", children: "まだりんごがなっていないよ" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 148,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-[#4a6b3d] mb-12", children: "きみの物語で、この森をいっぱいにしよう！" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 149,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "w-2 h-40 bg-gradient-to-b from-[#ccff00] to-transparent mx-auto rounded-full" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 150,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 144,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 96,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 95,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("footer", { className: "py-32 text-center mt-32 relative overflow-hidden bg-white/60 backdrop-blur-md border-t-8 border-[#ccff00]", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center gap-12 mb-12 relative z-10", children: [
        /* @__PURE__ */ jsxDEV(Apple, { className: "text-[#99cc00] w-16 h-16 animate-pulse" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 159,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV(Sparkles, { className: "text-[#ccff00] w-16 h-16 rotate-45" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 160,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ jsxDEV(Bird, { className: "text-[#2d4a22] w-16 h-16 opacity-20" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 161,
          columnNumber: 12
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 158,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-6xl font-black text-[#2d4a22] tracking-tighter relative z-10", children: [
        "えほんの",
        /* @__PURE__ */ jsxDEV("span", { className: "text-[#99cc00]", children: "森" }, void 0, false, {
          fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
          lineNumber: 164,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 163,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xl font-black text-[#99cc00] mt-6 tracking-[0.2em] relative z-10 uppercase", children: " Fresh Apple Stories " }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 166,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-64 h-64 bg-[#ccff00] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 169,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 right-0 w-64 h-64 bg-[#99ff33] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-20" }, void 0, false, {
        fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
        lineNumber: 170,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
      lineNumber: 157,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
}
_s(EhonForest, "6nue5wAxyGq0giKYT/f3TsIZ2Kc=");
_c = EhonForest;
var _c;
$RefreshReg$(_c, "EhonForest");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/seiko/.gemini/antigravity/brain/7101522a-3441-4ca3-a07b-31bf44fe700d/picture-book-site/src/components/EhonForest.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBb0NROzs7Ozs7Ozs7Ozs7Ozs7OztBQXBDTixPQUFPQSxTQUFTQyxVQUFVQyxpQkFBaUI7QUFDN0MsU0FBU0MsZ0JBQWdCO0FBQ3pCLFNBQVNDLE1BQU1DLE9BQU9DLFFBQVFDLE1BQU1DLE1BQU1DLE9BQU9DLEtBQUtDLE9BQU9DLGdCQUFnQjtBQUU3RSx3QkFBd0JDLFdBQVcsRUFBRUMsYUFBYSxHQUFHO0FBQUFDLEtBQUE7QUFDbkQsUUFBTSxDQUFDQyxPQUFPQyxRQUFRLElBQUloQixTQUFTLEVBQUU7QUFDckMsUUFBTSxDQUFDaUIsa0JBQWtCQyxtQkFBbUIsSUFBSWxCLFNBQVMsS0FBSztBQUM5RCxRQUFNbUIsYUFBYSxDQUFDLE9BQU8sVUFBVSxjQUFjLEtBQUs7QUFFeEQsUUFBTUMsZ0JBQWdCTCxNQUFNTSxPQUFPLENBQUNDLE1BQU1DLFVBQVU7QUFDbEQsUUFBSU4scUJBQXFCLE1BQU8sUUFBTztBQUN2QyxVQUFNTyxNQUFNRixLQUFLRyxZQUFZTixXQUFZSSxTQUFTSixXQUFXTyxTQUFTLEtBQU0sQ0FBQztBQUM3RSxXQUFPRixRQUFRUDtBQUFBQSxFQUNqQixDQUFDO0FBRUQsUUFBTSxDQUFDVSxTQUFTQyxVQUFVLElBQUk1QixTQUFTLElBQUk7QUFFM0NDLFlBQVUsTUFBTTtBQUNkLG1CQUFlNEIsYUFBYTtBQUMxQixZQUFNLEVBQUVDLE1BQU1DLE1BQU0sSUFBSSxNQUFNN0IsU0FDM0I4QixLQUFLLE9BQU8sRUFDWkMsT0FBTyxHQUFHLEVBQ1ZDLE1BQU0sY0FBYyxFQUFFQyxXQUFXLE1BQU0sQ0FBQztBQUUzQyxVQUFJLENBQUNKLFNBQVNELE1BQU07QUFDbEJkLGlCQUFTYyxJQUFJO0FBQUEsTUFDZjtBQUNBRixpQkFBVyxLQUFLO0FBQUEsSUFDbEI7QUFDQUMsZUFBVztBQUFBLEVBQ2IsR0FBRyxFQUFFO0FBRUwsU0FDRSx1QkFBQyxTQUFJLFdBQVUsaUZBRWI7QUFBQSwyQkFBQyxTQUFJLFdBQVUsZ0VBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsZ0ZBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUE0RjtBQUFBLE1BQzVGLHVCQUFDLFNBQUksV0FBVSxxRkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWlHO0FBQUEsTUFDakcsdUJBQUMsU0FBSSxXQUFVLHVGQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBbUc7QUFBQSxNQUNuRyx1QkFBQyxTQUFJLFdBQVUsd0hBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFvSTtBQUFBLFNBSnRJO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FLQTtBQUFBLElBR0EsdUJBQUMsWUFBTyxXQUFVLHlDQUNoQixpQ0FBQyxTQUFJLFdBQVUsbUNBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsa0NBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsNEhBQ2IsaUNBQUMsU0FBTSxXQUFVLDhCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTJDLEtBRDdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLHlIQUNiLGlDQUFDLFlBQVMsV0FBVSw4QkFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE4QyxLQURoRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFPQTtBQUFBLE1BRUEsdUJBQUMsUUFBRyxXQUFVLHNFQUNaO0FBQUEsK0JBQUMsVUFBSyxXQUFVLGdEQUErQyxtQkFBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFrRTtBQUFBLFFBQ2xFLHVCQUFDLFVBQUssV0FBVSxrQkFBaUIsaUJBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBa0M7QUFBQSxRQUNsQyx1QkFBQyxVQUFLLFdBQVUsZ0RBQStDLGlCQUEvRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWdFO0FBQUEsV0FIbEU7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsK0JBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUscUVBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFpRjtBQUFBLFFBQ2pGLHVCQUFDLFNBQUksV0FBVSx1R0FDWixpQ0FBQyxRQUFHLFdBQVUsc0NBQXFDLDRCQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQStELEtBRGxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFdBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUtBO0FBQUEsTUFDQSx1QkFBQyxTQUFJLFdBQVUsNkJBQ2IsaUNBQUMsU0FBSSxXQUFVLCtLQUNaZDtBQUFBQSxjQUFNVztBQUFBQSxRQUFPO0FBQUEsV0FEaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsU0ExQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTJCQSxLQTVCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBNkJBO0FBQUEsSUFHQSx1QkFBQyxVQUFLLFdBQVUsOENBQ2QsaUNBQUMsU0FBSSxXQUFVLHlEQUNaQyxvQkFDRSx1QkFBQyxTQUFJLFdBQVUsZ0hBQ1o7QUFBQSw2QkFBQyxTQUFJLFdBQVUsOEJBQ1o7QUFBQSwrQkFBQyxTQUFJLFdBQVUsd0VBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFvRjtBQUFBLFFBQ3BGLHVCQUFDLFNBQUksV0FBVSw0R0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXdIO0FBQUEsV0FGM0g7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUEsTUFDQSx1QkFBQyxPQUFFLFdBQVUsMERBQXlELDBCQUF0RTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWdGO0FBQUEsU0FMbkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQU1BLElBQ0NaLE1BQU1XLFNBQVMsSUFDakJOLGNBQWNnQjtBQUFBQSxNQUFJLENBQUNkLE1BQU1DLFVBQ3ZCO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFFQyxXQUFVO0FBQUEsVUFDVixTQUFTLE1BQU1WLGFBQWFTLEtBQUtlLEVBQUU7QUFBQSxVQUduQztBQUFBLG1DQUFDLFNBQUksV0FBVSw2SEFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF5STtBQUFBLFlBRXpJLHVCQUFDLFNBQUksV0FBVSw0UUFDWixpQ0FBQyxTQUFJLFdBQVUsaURBQ1o7QUFBQSxxQ0FBQyxTQUFJLFdBQVUsMEZBQ2I7QUFBQSx1Q0FBQyxTQUFNLFdBQVUseUVBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXNGO0FBQUEsZ0JBQ3RGLHVCQUFDLFNBQUksV0FBVSxnRUFDYixpQ0FBQyxZQUFTLFdBQVUsNEJBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTRDLEtBRDlDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxtQkFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUtBO0FBQUEsY0FFQSx1QkFBQyxRQUFHLFdBQVUscUZBQ1hmLGVBQUtnQixTQURSO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUVBLHVCQUFDLFNBQUksV0FBVSw2Q0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF5RDtBQUFBLGNBRXpELHVCQUFDLFNBQUksV0FBVSxpQ0FDYixpQ0FBQyxVQUFLLFdBQVUsMkdBQ2JoQixlQUFLaUIsVUFBVSxVQURsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFJQTtBQUFBLGNBRUEsdUJBQUMsWUFBTyxXQUFVLDhMQUE2TCxvQkFBL007QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQTtBQUFBLGlCQXRCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQXVCQSxLQXhCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQXlCQTtBQUFBO0FBQUE7QUFBQSxRQWhDS2pCLEtBQUtlO0FBQUFBLFFBRFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWtDQTtBQUFBLElBQ0QsSUFFQSx1QkFBQyxTQUFJLFdBQVUsZ0hBQ1o7QUFBQSw2QkFBQyxTQUFJLFdBQVUsd0dBQ2IsaUNBQUMsU0FBTSxXQUFVLDhCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQTJDLEtBRDdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLE1BQ0EsdUJBQUMsUUFBRyxXQUFVLDJDQUEwQyw2QkFBeEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFxRTtBQUFBLE1BQ3JFLHVCQUFDLE9BQUUsV0FBVSwyQ0FBMEMsb0NBQXZEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBMkU7QUFBQSxNQUMzRSx1QkFBQyxTQUFJLFdBQVUsa0ZBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUE4RjtBQUFBLFNBTmpHO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FPQSxLQXZETDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBeURBLEtBMURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0EyREE7QUFBQSxJQUdBLHVCQUFDLFlBQU8sV0FBVSw2R0FDaEI7QUFBQSw2QkFBQyxTQUFJLFdBQVUsa0RBQ1o7QUFBQSwrQkFBQyxTQUFNLFdBQVUsNENBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBeUQ7QUFBQSxRQUN6RCx1QkFBQyxZQUFTLFdBQVUsd0NBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBd0Q7QUFBQSxRQUN4RCx1QkFBQyxRQUFLLFdBQVUseUNBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBcUQ7QUFBQSxXQUh4RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSUE7QUFBQSxNQUNBLHVCQUFDLE9BQUUsV0FBVSxxRUFBb0U7QUFBQTtBQUFBLFFBQzNFLHVCQUFDLFVBQUssV0FBVSxrQkFBaUIsaUJBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBa0M7QUFBQSxXQUR4QztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxNQUNBLHVCQUFDLE9BQUUsV0FBVSxtRkFBa0YscUNBQS9GO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBb0g7QUFBQSxNQUdwSCx1QkFBQyxTQUFJLFdBQVUscUhBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFpSTtBQUFBLE1BQ2pJLHVCQUFDLFNBQUksV0FBVSx1SEFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQW1JO0FBQUEsU0Fickk7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWNBO0FBQUEsT0F0SEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXVIQTtBQUVKO0FBQUN2QixHQXRKdUJGLFlBQVU7QUFBQSxLQUFWQTtBQUFVLElBQUE0QjtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0Iiwic3VwYWJhc2UiLCJCb29rIiwiSGVhcnQiLCJTcHJvdXQiLCJCaXJkIiwiU3RhciIsIkNsb3VkIiwiU3VuIiwiQXBwbGUiLCJTcGFya2xlcyIsIkVob25Gb3Jlc3QiLCJvblNlbGVjdEJvb2siLCJfcyIsImJvb2tzIiwic2V0Qm9va3MiLCJzZWxlY3RlZENhdGVnb3J5Iiwic2V0U2VsZWN0ZWRDYXRlZ29yeSIsImNhdGVnb3JpZXMiLCJmaWx0ZXJlZEJvb2tzIiwiZmlsdGVyIiwiYm9vayIsImluZGV4IiwiY2F0IiwiY2F0ZWdvcnkiLCJsZW5ndGgiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImZldGNoQm9va3MiLCJkYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0Iiwib3JkZXIiLCJhc2NlbmRpbmciLCJtYXAiLCJpZCIsInRpdGxlIiwiYXV0aG9yIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiRWhvbkZvcmVzdC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsi77u/77u/aW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuLi9saWIvc3VwYWJhc2VDbGllbnRcIlxyXG5pbXBvcnQgeyBCb29rLCBIZWFydCwgU3Byb3V0LCBCaXJkLCBTdGFyLCBDbG91ZCwgU3VuLCBBcHBsZSwgU3BhcmtsZXMgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVob25Gb3Jlc3QoeyBvblNlbGVjdEJvb2sgfSkge1xyXG4gIGNvbnN0IFtib29rcywgc2V0Qm9va3NdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VsZWN0ZWRDYXRlZ29yeSwgc2V0U2VsZWN0ZWRDYXRlZ29yeV0gPSB1c2VTdGF0ZShcIuOBmeOBueOBplwiKTtcbiAgY29uc3QgY2F0ZWdvcmllcyA9IFtcIuOBmeOBueOBplwiLCBcIuOCgOOBi+OBl+OBsOOBquOBl1wiLCBcIuOCteOCpOODrOODs+ODiOOCueODiOODvOODquODvFwiLCBcIuOBiOOBu+OCk1wiXTtcblxuICBjb25zdCBmaWx0ZXJlZEJvb2tzID0gYm9va3MuZmlsdGVyKChib29rLCBpbmRleCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSBcIuOBmeOBueOBplwiKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBjYXQgPSBib29rLmNhdGVnb3J5IHx8IGNhdGVnb3JpZXNbKGluZGV4ICUgKGNhdGVnb3JpZXMubGVuZ3RoIC0gMSkpICsgMV07XG4gICAgcmV0dXJuIGNhdCA9PT0gc2VsZWN0ZWRDYXRlZ29yeTtcbiAgfSk7XG5cclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hCb29rcygpIHtcclxuICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcImJvb2tzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcIipcIilcclxuICAgICAgICAub3JkZXIoXCJjcmVhdGVkX2F0XCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICBcclxuICAgICAgaWYgKCFlcnJvciAmJiBkYXRhKSB7XHJcbiAgICAgICAgc2V0Qm9va3MoZGF0YSlcclxuICAgICAgfVxyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKVxyXG4gICAgfVxyXG4gICAgZmV0Y2hCb29rcygpXHJcbiAgfSwgW10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1bI2Y3ZmZmMF0gdGV4dC1bIzJkNGEyMl0gZm9udC1zYW5zIG92ZXJmbG93LXgtaGlkZGVuIHJlbGF0aXZlXCI+XHJcbiAgICAgIHsvKiBHcmVlbiBBcHBsZSBCYWNrZ3JvdW5kIERlY29yYXRpb24gKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lIG92ZXJmbG93LWhpZGRlbiBvcGFjaXR5LTMwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMTAgbGVmdC1bNSVdIHctNjQgaC02NCBiZy1bI2NjZmYwMF0gcm91bmRlZC1mdWxsIGJsdXItWzEwMHB4XVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLVszMCVdIHJpZ2h0LVsxMCVdIHctODAgaC04MCBiZy1bI2EzZmYzM10gcm91bmRlZC1mdWxsIGJsdXItWzEyMHB4XVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLVsxMCVdIGxlZnQtWzE1JV0gdy03MiBoLTcyIGJnLVsjNjZmZjY2XSByb3VuZGVkLWZ1bGwgYmx1ci1bMTEwcHhdXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS8yIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LVs4MDBweF0gaC1bODAwcHhdIGJnLXdoaXRlIHJvdW5kZWQtZnVsbCBibHVyLVsxNjBweF1cIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogSGVybyBTZWN0aW9uICovfVxyXG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInJlbGF0aXZlIHB0LTI0IHBiLTIwIHB4LTYgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgbWF4LXctNHhsIG14LWF1dG9cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBtYi04IGdhcC02XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyNjY2ZmMDBdIHAtNCByb3VuZGVkLVsyLjVyZW1dIHJvdGF0ZS02IHNoYWRvdy1bMF8xMHB4XzIwcHhfcmdiYSgyMDQsMjU1LDAsMC4zKV0gYW5pbWF0ZS1ib3VuY2UgYm9yZGVyLTQgYm9yZGVyLXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgPEFwcGxlIGNsYXNzTmFtZT1cInRleHQtWyMyZDRhMjJdIHctMTAgaC0xMFwiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHAtNCByb3VuZGVkLVsyLjVyZW1dIC1yb3RhdGUtNiBzaGFkb3ctWzBfMTBweF8yMHB4X3JnYmEoMCwwLDAsMC4wNSldIGFuaW1hdGUtcHVsc2UgYm9yZGVyLTQgYm9yZGVyLVsjY2NmZjAwXVwiPlxyXG4gICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ0ZXh0LVsjOTljYzAwXSB3LTEwIGgtMTBcIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC03eGwgbWQ6dGV4dC04eGwgZm9udC1ibGFjayBtYi04IHRyYWNraW5nLXRpZ2h0ZXIgbGVhZGluZy1ub25lXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWyMyZDRhMjJdIGRyb3Atc2hhZG93LVswXzRweF8wXyNjY2ZmMDBdXCI+44GI44G744KTPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsjOTljYzAwXVwiPuOBrjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bI2NjZmYwMF0gZHJvcC1zaGFkb3ctWzBfNHB4XzBfIzJkNGEyMl1cIj7mo648L3NwYW4+XHJcbiAgICAgICAgICA8L2gxPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGlubGluZS1ibG9jayBtYi0xMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctWyNjY2ZmMDBdIGJsdXItMnhsIG9wYWNpdHktMjAgYW5pbWF0ZS1wdWxzZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGJnLXdoaXRlLzgwIGJhY2tkcm9wLWJsdXItbWQgcm91bmRlZC1bM3JlbV0gcHgtMTIgcHktNiBib3JkZXItNCBib3JkZXItWyNjY2ZmMDBdIHNoYWRvdy14bFwiPlxyXG4gICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ibGFjayB0ZXh0LVsjMmQ0YTIyXVwiPuOBv+OBmuOBv+OBmuOBl+OBhOe1teacrOOBruS4lueVjOOBuDwvaDI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEyIGZsZXgganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0xMCBweS00IGJnLVsjMmQ0YTIyXSByb3VuZGVkLWZ1bGwgdGV4dC1bI2NjZmYwMF0gZm9udC1ibGFjayB0ZXh0LXhsIHNoYWRvdy1bMF84cHhfMF8jMWEyZTE0XSB0cmFuc2Zvcm0gdHJhbnNpdGlvbi1hbGwgaG92ZXI6dHJhbnNsYXRlLXktMSBob3ZlcjpzaGFkb3ctWzBfMnB4XzBfIzFhMmUxNF1cIj5cclxuICAgICAgICAgICAgICB7Ym9va3MubGVuZ3RofSDjgZXjgaTjga4g44OV44Os44OD44K344Ol44Gq5L2c5ZOBXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvaGVhZGVyPlxyXG5cclxuICAgICAgey8qIEdhbGxlcnkgU2VjdGlvbiAqL31cclxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtOCBweS0yMCByZWxhdGl2ZSB6LTEwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIHhsOmdyaWQtY29scy0zIGdhcC0xNlwiPlxyXG4gICAgICAgICAge2xvYWRpbmcgPyAoXHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLWZ1bGwgdGV4dC1jZW50ZXIgcHktMzIgYmctd2hpdGUvNDAgYmFja2Ryb3AtYmx1ci14bCByb3VuZGVkLVs1cmVtXSBib3JkZXItNCBib3JkZXItd2hpdGUgc2hhZG93LTJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LTI0IGgtMjQgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVsjY2NmZjAwXSByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1waW5nIG9wYWNpdHktMjBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTI0IHctMjQgYm9yZGVyLXQtOCBib3JkZXItWyNjY2ZmMDBdIGJvcmRlci1yLTggYm9yZGVyLXRyYW5zcGFyZW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEwIHRleHQtM3hsIGZvbnQtYmxhY2sgdGV4dC1bIzJkNGEyMl0gYW5pbWF0ZS1wdWxzZVwiPuOCiuOCk+OBlOOCkuWPjuepq+S4rS4uLjwvcD5cclxuICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IGJvb2tzLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIGZpbHRlcmVkQm9va3MubWFwKChib29rLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgXHJcbiAgICAgICAgICAgICAgICBrZXk9e2Jvb2suaWR9IFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgY3Vyc29yLXBvaW50ZXIgcmVsYXRpdmVcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3RCb29rKGJvb2suaWQpfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHsvKiBWaXN1YWwgR2xvdyAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWluc2V0LTQgYmctWyNjY2ZmMDBdIHJvdW5kZWQtWzRyZW1dIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwIGJsdXItMnhsIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi01MDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBiZy13aGl0ZS85MCBiYWNrZHJvcC1ibHVyLXNtIHJvdW5kZWQtWzRyZW1dIGJvcmRlci1bNnB4XSBib3JkZXItWyNjY2ZmMDBdIHAtMTAgaC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBncm91cC1ob3ZlcjotdHJhbnNsYXRlLXktNCBncm91cC1ob3Zlcjpyb3RhdGUtMSBzaGFkb3ctWzBfMjBweF81MHB4X3JnYmEoMjA0LDI1NSwwLDAuMSldIGdyb3VwLWhvdmVyOnNoYWRvdy1bMF80MHB4XzgwcHhfcmdiYSgyMDQsMjU1LDAsMC4yKV1cIj5cclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBoLWZ1bGwgaXRlbXMtY2VudGVyIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMjggaC0yOCBiZy1bI2YwZmZjY10gcm91bmRlZC1bMi41cmVtXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi04IHJlbGF0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxBcHBsZSBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgdGV4dC1bIzk5Y2MwMF0gZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTIgLXJpZ2h0LTIgYmctd2hpdGUgcm91bmRlZC1mdWxsIHAtMiBzaGFkb3ctbWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LVsjY2NmZjAwXVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJsYWNrIG1iLTQgdGV4dC1bIzJkNGEyMl0gbGluZS1jbGFtcC0yIGxlYWRpbmctdGlnaHQgdHJhY2tpbmctdGlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2sudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTYgaC0yIGJnLVsjY2NmZjAwXSByb3VuZGVkLWZ1bGwgbXktNlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtWyM5OWNjMDBdIGJnLXdoaXRlIGJvcmRlci0yIGJvcmRlci1bI2NjZmYwMF0gcHgtNiBweS0yIHJvdW5kZWQtZnVsbCBzaGFkb3ctc21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9vay5hdXRob3IgfHwgXCLmo67jga7kvZzogIVcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwibXQtYXV0byB3LWZ1bGwgcHktNSBiZy1bI2NjZmYwMF0gdGV4dC1bIzJkNGEyMl0gZm9udC1ibGFjayB0ZXh0LTJ4bCByb3VuZGVkLVsycmVtXSBzaGFkb3ctWzBfMTBweF8wXyM5OWNjMDBdIGdyb3VwLWhvdmVyOnNoYWRvdy1bMF80cHhfMF8jOTljYzAwXSBncm91cC1ob3Zlcjp0cmFuc2xhdGUteS0xIHRyYW5zaXRpb24tYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOOBsuOCieOBj++8gVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tZnVsbCB0ZXh0LWNlbnRlciBweS0zMiBiZy13aGl0ZS82MCBiYWNrZHJvcC1ibHVyLXhsIHJvdW5kZWQtWzZyZW1dIGJvcmRlci04IGJvcmRlci13aGl0ZSBzaGFkb3ctM3hsXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjY2NmZjAwXS8yMCB3LTMyIGgtMzIgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG14LWF1dG8gbWItMTAgYW5pbWF0ZS1ib3VuY2VcIj5cclxuICAgICAgICAgICAgICAgICAgPEFwcGxlIGNsYXNzTmFtZT1cInctMTYgaC0xNiB0ZXh0LVsjOTljYzAwXVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBmb250LWJsYWNrIG1iLTYgdGV4dC1bIzJkNGEyMl1cIj7jgb7jgaDjgorjgpPjgZTjgYzjgarjgaPjgabjgYTjgarjgYTjgog8L2gzPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtWyM0YTZiM2RdIG1iLTEyXCI+44GN44G/44Gu54mp6Kqe44Gn44CB44GT44Gu5qOu44KS44GE44Gj44Gx44GE44Gr44GX44KI44GG77yBPC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIgaC00MCBiZy1ncmFkaWVudC10by1iIGZyb20tWyNjY2ZmMDBdIHRvLXRyYW5zcGFyZW50IG14LWF1dG8gcm91bmRlZC1mdWxsXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbWFpbj5cclxuXHJcbiAgICAgIHsvKiBGb290ZXIgKi99XHJcbiAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwicHktMzIgdGV4dC1jZW50ZXIgbXQtMzIgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGJnLXdoaXRlLzYwIGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyLXQtOCBib3JkZXItWyNjY2ZmMDBdXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIGdhcC0xMiBtYi0xMiByZWxhdGl2ZSB6LTEwXCI+XHJcbiAgICAgICAgICAgPEFwcGxlIGNsYXNzTmFtZT1cInRleHQtWyM5OWNjMDBdIHctMTYgaC0xNiBhbmltYXRlLXB1bHNlXCIgLz5cclxuICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidGV4dC1bI2NjZmYwMF0gdy0xNiBoLTE2IHJvdGF0ZS00NVwiIC8+XHJcbiAgICAgICAgICAgPEJpcmQgY2xhc3NOYW1lPVwidGV4dC1bIzJkNGEyMl0gdy0xNiBoLTE2IG9wYWNpdHktMjBcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtNnhsIGZvbnQtYmxhY2sgdGV4dC1bIzJkNGEyMl0gdHJhY2tpbmctdGlnaHRlciByZWxhdGl2ZSB6LTEwXCI+XHJcbiAgICAgICAgICDjgYjjgbvjgpPjga48c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsjOTljYzAwXVwiPuajrjwvc3Bhbj5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRleHQtWyM5OWNjMDBdIG10LTYgdHJhY2tpbmctWzAuMmVtXSByZWxhdGl2ZSB6LTEwIHVwcGVyY2FzZVwiPiBGcmVzaCBBcHBsZSBTdG9yaWVzIDwvcD5cclxuICAgICAgICBcclxuICAgICAgICB7LyogQWJzdHJhY3QgZGVjb3IgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgdy02NCBoLTY0IGJnLVsjY2NmZjAwXSByb3VuZGVkLWZ1bGwgLXRyYW5zbGF0ZS14LTEvMiAtdHJhbnNsYXRlLXktMS8yIGJsdXItM3hsIG9wYWNpdHktMjBcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0wIHJpZ2h0LTAgdy02NCBoLTY0IGJnLVsjOTlmZjMzXSByb3VuZGVkLWZ1bGwgdHJhbnNsYXRlLXgtMS8yIHRyYW5zbGF0ZS15LTEvMiBibHVyLTN4bCBvcGFjaXR5LTIwXCI+PC9kaXY+XHJcbiAgICAgIDwvZm9vdGVyPlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcbiJdLCJmaWxlIjoiQzovVXNlcnMvc2Vpa28vLmdlbWluaS9hbnRpZ3Jhdml0eS9icmFpbi83MTAxNTIyYS0zNDQxLTRjYTMtYTA3Yi0zMWJmNDRmZTcwMGQvcGljdHVyZS1ib29rLXNpdGUvc3JjL2NvbXBvbmVudHMvRWhvbkZvcmVzdC5qc3gifQ==