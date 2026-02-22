import { createFileRoute } from '@tanstack/react-router'

import { Card, CardContent } from '@/components/ui/card'

const events = [
  {
    year: '1980-1989',
    title: 'Poczatki wspolpracy',
    description: 'Pierwsze polsko-niemieckie relacje zbudowane na solidarnej postawie.',
  },
  {
    year: '1989',
    title: 'Przelom',
    description: 'Zmiany w Europie i nowy etap wspolnego budowania przyszlosci.',
  },
  {
    year: '2010',
    title: 'Zalozenie fundacji',
    description: 'Formalny start Fundacji Duchowy Wymiar Europy.',
  },
  {
    year: '2015+',
    title: 'Komputery dla szkol',
    description: 'Programy wsparcia edukacji cyfrowej i wspolpracy miedzynarodowej.',
  },
  {
    year: 'Dzis',
    title: 'Ciagnosc misji',
    description: 'Realizacja projektow lokalnych i transgranicznych w nowych regionach.',
  },
]

export const Route = createFileRoute('/timeline')({
  component: TimelinePage,
})

function TimelinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/20 to-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <p className="inline-block rounded-full bg-cyan-800/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-900">
            Historia wspolpracy
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Os czasu</h1>
        </header>

        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.year} className="border-slate-200/70 bg-white/90 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-800">{event.year}</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">{event.title}</h2>
                <p className="mt-2 text-slate-600">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
