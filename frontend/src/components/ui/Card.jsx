export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-2xl shadow-card ${className}`}>
      {children}
    </div>
  )
}
