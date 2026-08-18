export default function GenerateButton({ onClick, disabled, isLoading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="shimmer group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-l from-teal via-teal-light to-teal px-10 py-4.5 text-base font-extrabold text-white shadow-xl shadow-teal/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-teal/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none sm:w-auto"
    >
      <span className="absolute inset-0 bg-gradient-to-l from-gold/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {isLoading ? (
        <>
          <svg
            className="relative h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="relative">نُنشئ فكرتك...</span>
        </>
      ) : (
        <>
          <svg
            className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          <span className="relative">إنشاء الخطة</span>
          <span className="relative hidden rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium sm:inline">
            الخطوة ٣
          </span>
        </>
      )}
    </button>
  )
}
