import IntegrationCard from './IntegrationCard'

export default function IntegrationSelector({
  integrations,
  selectedIntegrations,
  onToggle,
}) {
  return (
    <section id="integrations" className="mt-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-sm font-extrabold text-teal">
            ٢
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-ink">اختر أدواتك</h2>
            <p className="mt-1 text-sm text-ink-soft/70">
              حدّد التكاملات التي تريد تضمينها في المخطط
            </p>
          </div>
        </div>

        {selectedIntegrations.length > 0 && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-teal/10 px-4 py-1.5 text-sm font-bold text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            {selectedIntegrations.length} محدّد
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            isSelected={selectedIntegrations.includes(integration.name)}
            onToggle={() => onToggle(integration.name)}
          />
        ))}
      </div>
    </section>
  )
}
