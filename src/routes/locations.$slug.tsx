import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, ArrowLeft, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getLocationBySlug } from '@/lib/locations'

export const Route = createFileRoute('/locations/$slug')({
  loader: async ({ params }) => {
    const location = await getLocationBySlug({ data: params.slug })
    if (!location) throw new Error('Location not found')
    return location
  },
  component: LocationPage,
  errorComponent: LocationNotFound,
})

function LocationPage() {
  const location = Route.useLoaderData()
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      prev === location.images.length - 1 ? 0 : prev + 1
    )
  }
  const prevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? location.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
        <Link to="/" hash="projekty">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            {t('location.backToMap')}
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Image carousel */}
        {location.images.length > 0 ? (
          <div className="relative aspect-video bg-slate-200 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <img
              src={location.images[currentImageIndex]}
              alt={location.name}
              className="w-full h-full object-cover"
            />
            {location.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-xs rounded-full">
                  {currentImageIndex + 1} / {location.images.length}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-video bg-slate-200 rounded-2xl mb-8 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">{t('location.noImages')}</p>
          </div>
        )}

        {/* Location info */}
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">{location.name}</h1>

        <div className="flex flex-wrap gap-3 mb-6">
          {(location.city || location.country) && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="w-3 h-3" />
              {[location.city, location.country].filter(Boolean).join(', ')}
            </Badge>
          )}
          {location.date && (
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" />
              {location.date}
            </Badge>
          )}
        </div>

        {location.summary && (
          <p className="text-base leading-relaxed text-slate-700 max-w-2xl">
            {location.summary}
          </p>
        )}
      </div>
    </div>
  )
}

function LocationNotFound() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">{t('location.notFound')}</h1>
        <Link to="/">
          <Button>{t('location.backToMap')}</Button>
        </Link>
      </div>
    </div>
  )
}
