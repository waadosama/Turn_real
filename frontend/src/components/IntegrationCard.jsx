export default function IntegrationCard({ integration, isSelected, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'إلغاء تحديد' : 'تحديد'} ${integration.name}`}
      className={`group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border p-4 text-start transition-all duration-300 ${
        isSelected
          ? 'border-teal/50 bg-gradient-to-br from-teal/10 to-teal/5 shadow-lg shadow-teal/10 ring-1 ring-teal/20'
          : 'border-sand bg-white/80 hover:border-teal/25 hover:bg-white hover:shadow-md hover:shadow-ink/5'
      }`}
    >
      {isSelected && (
        <span
          className="absolute top-3 end-3 flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-white shadow-sm"
          aria-hidden="true"
        >
          ✓
        </span>
      )}

      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-all duration-300 group-hover:scale-105 ${
          isSelected
            ? 'bg-gradient-to-br from-teal to-teal-light shadow-md shadow-teal/20'
            : 'bg-sand/80'
        }`}
        aria-hidden="true"
      >
        {integration.icon}
      </span>

      <div>
        <p className="text-sm font-bold text-ink">{integration.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft/70">
          {integration.description}
        </p>
      </div>
    </button>
  )
}
