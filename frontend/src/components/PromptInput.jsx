export default function PromptInput({ value, onChange, placeholder }) {
  return (
    <div className="glow-focus group relative rounded-2xl transition-all duration-500">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-teal/20 via-transparent to-gold/15 opacity-0 transition-opacity duration-500 group-focus-within:opacity-100" />

      <div className="relative overflow-hidden rounded-2xl border border-sand bg-white/90">
        <div className="flex items-center gap-2 border-b border-sand/80 bg-sand/30 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal/50" />
          <span className="me-auto ms-2 text-xs font-medium text-ink-soft/50">فكرتك</span>
        </div>

        <textarea
          id="prompt"
          name="prompt"
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent px-5 py-5 text-base leading-[1.9] text-ink outline-none placeholder:text-ink-soft/40"
        />

        <div className="flex items-center justify-between border-t border-sand/60 px-5 py-3">
          <span className="text-xs text-ink-soft/50">
            {value.length > 0 ? `${value.length} حرف` : 'كن مفصّلاً كما تشاء'}
          </span>
          <span className="rounded-full bg-teal/8 px-3 py-1 text-xs font-medium text-teal">
            الخطوة ١
          </span>
        </div>
      </div>
    </div>
  )
}
