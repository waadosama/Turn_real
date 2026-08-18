export default function Hero() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
      <div className="fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-teal/15 bg-white/70 px-5 py-2 text-sm font-medium text-teal shadow-sm backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-teal/40"
            style={{ animation: 'pulse-ring 2s ease-in-out infinite' }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
        </span>
        مدعوم بالذكاء الاصطناعي
      </div>

      <h1 className="fade-up fade-up-delay-1 text-[2.75rem] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-6xl lg:text-7xl">
        <span className="block">اكتب فكرتك.</span>
        <span className="mt-1 block text-gradient">كوّن مشروعك.</span>
      </h1>

      <p className="fade-up fade-up-delay-2 mx-auto mt-7 max-w-xl text-lg leading-[1.8] text-ink-soft sm:text-xl">
        صف ما تريد بناءه، اختر الأدوات التي تحتاجها، يحوّل
        فكرتك إلى مخطط مشروع واضح.
      </p>

      <div className="fade-up fade-up-delay-3 mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-6 text-sm text-ink-soft/70">
        {[
          { value: '∞', label: 'أفكار لا محدودة' },
          { value: '3', label: 'خطوات بسيطة' },
          { value: '60ث', label: 'للحصول على المخطط' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5">
            <span className="text-xl font-extrabold text-teal">{stat.value}</span>
            <span className="text-xs">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
