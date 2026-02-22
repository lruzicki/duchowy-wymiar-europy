import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Start', to: '/' as const },
  { label: 'Os czasu', to: '/timeline' as const },
  { label: 'CMS', to: '/keystatic/' as const },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            DWE
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Fundacja</p>
            <p className="text-sm font-semibold text-slate-900">Duchowy Wymiar Europy</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
              activeProps={{ className: 'rounded-md bg-slate-900 px-3 py-2 text-sm text-white' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white p-3 md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                activeProps={{ className: 'block rounded-md bg-slate-900 px-3 py-2 text-sm text-white' }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
