export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/60 bg-white/55 px-5 py-3 shadow-[0_8px_32px_rgba(20,18,31,0.06)] backdrop-blur-2xl">
        <a href="/" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal to-teal-light opacity-90 shadow-lg shadow-teal/25 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3" />
            <span className="relative text-base font-extrabold text-white">ك</span>
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-ink">كوّن</span>
            <span className="text-[10px] font-medium text-ink-soft/60">من فكرة إلى مشروع</span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: '#features', label: 'الميزات' },
            { href: '#integrations', label: 'التكاملات' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft transition-all duration-200 hover:bg-sand/80 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink sm:block"
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-cream shadow-lg shadow-ink/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-xl"
          >
            ابدأ الآن
          </button>
        </div>
      </div>
    </header>
  )
}
