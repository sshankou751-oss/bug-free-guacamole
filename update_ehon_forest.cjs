const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'components', 'EhonForest.jsx');
let content = fs.readFileSync(targetPath, 'utf-8');

const CATEGORY_LOGIC = `  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const categories = ["すべて", "むかしばなし", "サイレントストーリー", "えほん"];

  const filteredBooks = books.filter((book, index) => {
    if (selectedCategory === "すべて") return true;
    const cat = book.category || categories[(index % (categories.length - 1)) + 1];
    return cat === selectedCategory;
  });
`;

content = content.replace('  const [books, setBooks] = useState([])', CATEGORY_LOGIC);

const HEADER_END = `          <div className="mt-12 flex justify-center">
            <div className="px-10 py-4 bg-[#2d4a22] rounded-full text-[#ccff00] font-black text-xl shadow-[0_8px_0_#1a2e14] transform transition-all hover:translate-y-1 hover:shadow-[0_2px_0_#1a2e14]">
              {books.length} さつの フレッシュな作品
            </div>
          </div>
        </div>
      </header>`;

const TABS_CODE = `

      {/* Category Tabs */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-md \${
                selectedCategory === cat
                  ? "bg-[#2d4a22] text-white shadow-[0_4px_0_#1a2e14] translate-y-0"
                  : "bg-white text-[#2d4a22] border-2 border-[#ccff00] hover:bg-[#f0ffcc] hover:-translate-y-1"
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
`;

content = content.replace(HEADER_END, HEADER_END + TABS_CODE);

content = content.replace(
  '           ) : books.length > 0 ? (',
  '           ) : filteredBooks.length > 0 ? ('
);

content = content.replace(
  '            books.map((book) => (',
  '            filteredBooks.map((book, index) => ('
);

const OLD_CARD = `                <div className="relative bg-white/90 backdrop-blur-sm rounded-[4rem] border-[6px] border-[#ccff00] p-10 h-full transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-1 shadow-[0_20px_50px_rgba(204,255,0,0.1)] group-hover:shadow-[0_40px_80px_rgba(204,255,0,0.2)]">
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
                </div>`;

const NEW_CARD = `                <div className="relative bg-white/90 backdrop-blur-sm rounded-[3rem] border-4 border-[#ccff00] overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-3 shadow-md group-hover:shadow-[0_15px_30px_rgba(45,74,34,0.15)]">
                   {/* Card Image Area */}
                   <div className="relative aspect-[4/3] bg-[#f7fff0] border-b-4 border-[#ccff00] flex items-center justify-center overflow-hidden">
                      <Apple className="w-16 h-16 text-[#99cc00] group-hover:rotate-6 transition-transform duration-500 scale-125 group-hover:scale-150" />
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-sm backdrop-blur-sm">
                        <Sparkles className="w-5 h-5 text-[#ccff00]" />
                      </div>
                      <div className="absolute bottom-4 right-4">
                         <span className="text-xs font-bold text-white bg-[#2d4a22] px-3 py-1 rounded-full shadow-sm">
                           {book.category || categories[(index % (categories.length - 1)) + 1]}
                         </span>
                      </div>
                   </div>

                   {/* Card Content Area */}
                   <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black mb-4 text-[#2d4a22] line-clamp-2 leading-tight text-center">
                        {book.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-8 mt-auto mx-auto">
                        <span className="text-sm font-bold text-[#4a6b3d] bg-[#f0ffcc] px-4 py-1.5 rounded-full">
                          {book.author || "森の作者"}
                        </span>
                      </div>
                      
                      {/* Accent Button */}
                      <button className="w-full py-4 bg-[#ff6b35] text-white font-black text-xl rounded-[1.5rem] shadow-[0_6px_0_#cc5520] group-hover:shadow-[0_2px_0_#cc5520] group-hover:translate-y-1 transition-all active:translate-y-2">
                        ひらく！
                      </button>
                   </div>
                </div>`;

content = content.replace(OLD_CARD, NEW_CARD);

// Write using proper encoding
fs.writeFileSync(targetPath, "\uFEFF" + content, { encoding: 'utf8' });
console.log('Update Complete! With Encoding Fix.');
