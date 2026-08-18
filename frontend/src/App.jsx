import { useState } from 'react'
import BackgroundDecor from './components/BackgroundDecor'
import Header from './components/Header'
import Hero from './components/Hero'
import PromptInput from './components/PromptInput'
import IntegrationSelector from './components/IntegrationSelector'
import GenerateButton from './components/GenerateButton'
import AIResponse from './components/AIResponse'
import { integrations } from './data/integrations'

const features = [
  {
    step: '01',
    title: 'صف فكرتك',
    description: 'شارك المشكلة، الجمهور، والعمل اليومي بلغة بسيطة وواضحة.',
    accent: 'from-teal/10 to-teal/5',
  },
  {
    step: '02',
    title: 'اختر الأدوات',
    description: 'حدد الأدوات التي تريد تضمينها في الخطة النهائية.',
    accent: 'from-gold/10 to-gold/5',
  },
  {
    step: '03',
    title: 'احصل على الخطة',
    description: 'استلم رؤية واضحة للمنتج سهلة المشاركة مع فريقك.',
    accent: 'from-teal/10 to-gold/5',
  },
]

function App() {
  const [prompt, setPrompt] = useState('')
  const [selectedIntegrations, setSelectedIntegrations] = useState([])
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')

  const toggleIntegration = (name) => {
    setSelectedIntegrations((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    )
  }

  const clearIdea = () => {
    setPrompt('')
    setSelectedIntegrations([])
    setResponse('')
    setError('')
  }

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim()

    if (!trimmedPrompt) {
      setError('أضف فكرة المنتج أولاً قبل إنشاء الخطة.')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const request = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          integrations: selectedIntegrations,
        }),
      })

      const rawText = await request.text()
      let payload = {}

      if (rawText) {
        try {
          payload = JSON.parse(rawText)
        } catch {
          throw new Error('الـ API أعاد استجابة غير صالحة. حاول مرة أخرى.')
        }
      }

      if (!request.ok || !payload.success) {
        throw new Error(payload.error || 'تعذّر إنشاء الخطة الآن. حاول مرة أخرى.')
      }

      setResponse(payload.response || '')
    } catch (requestError) {
      const errorMessage =
        requestError instanceof Error && requestError.message
          ? requestError.message
          : 'حدث خطأ أثناء إنشاء الخطة. حاول مرة أخرى.'

      setError(errorMessage)
      setResponse('')
      console.error(requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-bg grain relative min-h-screen">
      <BackgroundDecor />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-5xl px-4 pb-28 sm:px-6">
          <Hero />

          <div className="gradient-border relative overflow-hidden rounded-3xl p-6 sm:p-9">
            <div className="absolute -top-24 start-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-teal/5 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-l from-teal/20 to-transparent" />
                <span className="rounded-full border border-teal/15 bg-teal/5 px-4 py-1.5 text-xs font-bold text-teal">
                  استوديو الإنشاء
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-teal/20 to-transparent" />
              </div>

              <PromptInput
                value={prompt}
                onChange={setPrompt}
                placeholder="صف المنتج الذي تريد بناءه..."
              />

              <IntegrationSelector
                integrations={integrations}
                selectedIntegrations={selectedIntegrations}
                onToggle={toggleIntegration}
              />

              <div className="mt-10 flex flex-col items-center gap-3">
                <GenerateButton
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || loading}
                  isLoading={loading}
                />
                {!prompt.trim() && (
                  <p className="text-xs text-ink-soft/45">أضف فكرتك للمتابعة</p>
                )}
                {(response || error || prompt || selectedIntegrations.length > 0) && (
                  <button
                    type="button"
                    onClick={clearIdea}
                    className="text-sm font-semibold text-teal transition hover:text-teal-light"
                  >
                    تجربة فكرة أخرى
                  </button>
                )}
              </div>

              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <AIResponse response={response} isVisible={Boolean(response)} isLoading={loading} />
            </div>
          </div>

          <section id="features" className="mt-24">
            <div className="mb-12 text-center">
              <span className="text-xs font-bold tracking-widest text-teal uppercase">كيف يعمل</span>
              <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
                ثلاث خطوات إلى منتجك
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.step}
                  className={`group relative overflow-hidden rounded-2xl border border-sand bg-gradient-to-br ${feature.accent} p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/20 hover:shadow-xl hover:shadow-ink/5`}
                >
                  <span className="absolute -top-4 -start-2 text-7xl font-extrabold text-ink/[0.04] transition-colors duration-300 group-hover:text-teal/10">
                    {feature.step}
                  </span>
                  <div className="relative">
                    <span className="inline-flex rounded-xl bg-white/80 px-3 py-1 text-xs font-extrabold text-teal shadow-sm">
                      {feature.step}
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold text-ink">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-sand/80 bg-white/40 py-10 text-center backdrop-blur-sm">
          <p className="text-sm text-ink-soft/50">
            © {new Date().getFullYear()}{' '}
            <span className="font-extrabold text-ink">كون</span>
            {' '}— All rights reserved
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
