function renderMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  const escaped = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const lines = escaped.split('\n')
  const html = []
  let listItems = []

  const flushList = (type = 'ul') => {
    if (!listItems.length) return

    html.push(`<${type}>${listItems.map((item) => `<li>${item}</li>`).join('')}</${type}>`)
    listItems = []
  }

  const formatInline = (value) => {
    return value
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      return
    }

    if (/^###\s+/.test(line)) {
      flushList()
      html.push(`<h3>${formatInline(line.replace(/^###\s+/, ''))}</h3>`)
      return
    }

    if (/^##\s+/.test(line)) {
      flushList()
      html.push(`<h2>${formatInline(line.replace(/^##\s+/, ''))}</h2>`)
      return
    }

    if (/^#\s+/.test(line)) {
      flushList()
      html.push(`<h1>${formatInline(line.replace(/^#\s+/, ''))}</h1>`)
      return
    }

    if (/^[-*]\s+/.test(line)) {
      listItems.push(formatInline(trimmed.replace(/^[-*]\s+/, '')))
      return
    }

    if (/^\d+\.\s+/.test(line)) {
      listItems.push(formatInline(trimmed.replace(/^\d+\.\s+/, '')))
      return
    }

    flushList()
    html.push(`<p>${formatInline(trimmed)}</p>`)
  })

  flushList()

  return html.join('')
}

export default function AIResponse({ response, isVisible, isLoading }) {
  if (isLoading) {
    return (
      <div className="mt-10 rounded-2xl border border-teal/15 bg-teal/5 px-5 py-6 text-center">
        <div className="inline-flex items-center gap-3">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal border-t-transparent" aria-hidden="true" />
          <p className="text-base font-bold text-teal">نُنشئ فكرتك...</p>
        </div>
      </div>
    )
  }

  if (!isVisible) {
    return (
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-dashed border-teal/20 bg-gradient-to-br from-sand/50 to-white/50 p-10 text-center">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px',
          }}
        />

        <div className="relative">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/15 bg-white shadow-sm">
            <svg
              className="h-7 w-7 text-teal/50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <p className="text-sm font-bold text-ink-soft">ستظهر خطة منتجك هنا</p>
          <p className="mt-2 text-xs text-ink-soft/50">صف فكرتك واضغط على إنشاء الخطة للبدأ.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 transition-all duration-700">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-light text-xs font-extrabold text-white shadow-md shadow-teal/20">
          M
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-ink">خطة منتجك</h2>
          <p className="text-xs text-ink-soft/60">تم استقبال الطلب بنجاح</p>
        </div>
      </div>

      <div className="gradient-border overflow-hidden rounded-2xl p-6 sm:p-8">
        <div
          className="markdown-body prose prose-sm max-w-none space-y-3 text-sm leading-[1.9] text-ink-soft"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(response) }}
        />
      </div>
    </div>
  )
}
