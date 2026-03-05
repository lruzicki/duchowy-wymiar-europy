import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useTranslation } from 'react-i18next'

import {
  selectLocationLocalizedText,
  type LocationListItem,
} from '@/lib/locations'
import type { SupportedLocale } from '@/lib/detect-locale'

import 'leaflet/dist/leaflet.css'

const defaultCenter: [number, number] = [52.2297, 19.0122]

// Leaflet's default marker URLs need to be explicit in many bundlers.
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MapFocus({ activeLocation }: { activeLocation?: LocationListItem }) {
  const map = useMap()

  useEffect(() => {
    if (!activeLocation) return

    map.flyTo(
      [activeLocation.coordinates.lat, activeLocation.coordinates.lng],
      9,
      {
        duration: 1.1,
      },
    )
  }, [activeLocation, map])

  return null
}

type LocationsMapClientProps = {
  activeSlug?: string
  locations: Array<LocationListItem>
  onSelect: (slug: string) => void
}

export function LocationsMapClient({
  activeSlug,
  locations,
  onSelect,
}: LocationsMapClientProps) {
  const { i18n } = useTranslation()
  const baseLocale = (i18n.resolvedLanguage ?? i18n.language)
    .toLowerCase()
    .split('-')[0] as SupportedLocale
  const locale: SupportedLocale = ['pl', 'en', 'de', 'uk', 'ru', 'ar'].includes(
    baseLocale,
  )
    ? baseLocale
    : 'pl'
  const activeLocation = locations.find(
    (location) => location.slug === activeSlug,
  )
  const center = activeLocation
    ? ([activeLocation.coordinates.lat, activeLocation.coordinates.lng] as [
        number,
        number,
      ])
    : locations.length > 0
      ? ([locations[0].coordinates.lat, locations[0].coordinates.lng] as [
          number,
          number,
        ])
      : defaultCenter

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapFocus activeLocation={activeLocation} />

      {locations.map((location) => (
        <Marker
          key={location.slug}
          position={[location.coordinates.lat, location.coordinates.lng]}
          eventHandlers={{
            click: () => onSelect(location.slug),
          }}
        >
          <Popup>
            <p className="font-semibold">
              {selectLocationLocalizedText(location.name, locale)}
            </p>
            <p>{selectLocationLocalizedText(location.summary, locale)}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
