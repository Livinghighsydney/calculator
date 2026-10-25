const styles = {
  emerald: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]',
  amber:   'bg-[#fffbeb] border-[#fde68a] text-[#92400e]',
  rose:    'bg-[#fef2f2] border-[#fecaca] text-[#dc2626]',
  slate:   'bg-zinc-100 border-zinc-200 text-zinc-700',
  indigo:  'bg-zinc-900 border-zinc-700 text-zinc-100',
}

export default function Badge({ children, variant = 'slate', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
