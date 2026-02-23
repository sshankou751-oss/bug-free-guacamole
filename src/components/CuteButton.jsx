import { Sparkles } from 'lucide-react';

export default function CuteButton({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative px-6 py-3 font-bold text-white transition-all duration-300
        bg-gradient-to-r from-pink-400 to-rose-400
        rounded-full shadow-[0_4px_14px_0_rgba(244,114,182,0.39)]
        hover:shadow-[0_6px_20px_rgba(244,114,182,0.23)]
        hover:-translate-y-1 hover:scale-105
        active:translate-y-0 active:scale-95
        flex items-center gap-2
        ${className}
      `}
    >
      <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
      <span className="relative">{children}</span>
    </button>
  );
}
