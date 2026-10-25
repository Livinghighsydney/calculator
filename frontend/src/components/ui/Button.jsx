const variants = {
  primary:   'bg-black text-white border border-black hover:bg-zinc-800 active:bg-zinc-900 shadow-sm',
  secondary: 'bg-zinc-100 text-black border border-zinc-200 hover:bg-zinc-200 active:bg-zinc-300',
  outline:   'bg-white text-black border border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100',
  indigo:    'bg-black text-white border border-black hover:bg-zinc-800',
}

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-5 text-sm font-semibold',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold tracking-tight rounded-xl transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] select-none
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
