export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-32 start-[-10%] h-96 w-96 rounded-full bg-teal/10 blur-3xl float-slow" />
      <div className="absolute top-1/4 end-[-5%] h-80 w-80 rounded-full bg-gold/10 blur-3xl float-slower" />
      <div className="absolute bottom-20 start-1/4 h-64 w-64 rounded-full bg-teal/8 blur-3xl float-slower" />

      <svg
        className="absolute top-32 end-[8%] h-48 w-48 opacity-[0.07] spin-slow"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" className="text-teal" />
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" className="text-teal" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="10"
            x2="100"
            y2="190"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-teal"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </svg>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
    </div>
  )
}
