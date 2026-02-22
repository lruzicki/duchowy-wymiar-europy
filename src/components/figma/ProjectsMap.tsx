import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { LocationListItem } from '@/lib/locations';

// Leaflet imports - will be loaded dynamically
type LatLngExpression = [number, number];

interface ProjectsMapProps {
  locations?: LocationListItem[]
}

export function ProjectsMap({ locations = [] }: ProjectsMapProps) {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Leaflet
    const loadLeaflet = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const L = await import('https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js' as any);

      // Fix for default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Initialize map centered on Poland
      const map = L.map(mapRef.current).setView([52.2297, 17.0122], 6);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add markers for each location from CMS
      const markers: any[] = [];

      locations.forEach((location) => {
        const marker = L.marker([location.coordinates.lat, location.coordinates.lng] as LatLngExpression).addTo(map);

        const popupContent = `
          <div style="min-width: 180px; padding: 4px;">
            <h3 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600;">${location.name}</h3>
            ${location.city || location.country ? `<p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">${[location.city, location.country].filter(Boolean).join(', ')}</p>` : ''}
            <a href="/locations/${location.slug}" style="display:inline-block;margin-top:4px;color:#0066cc;font-weight:600;font-size:13px;text-decoration:none;">&#8594; ${t('map.seeMore')}</a>
          </div>
        `;

        marker.bindPopup(popupContent);
        markers.push(marker);
      });

      markersRef.current = markers;
      setMapLoaded(true);
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations, t]);

  return (
    <section className="py-20 pt-32 bg-white" id="projekty">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">{t('map.heading')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('map.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Location List Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="mb-4 px-1">{t('map.projectList')}</h3>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {locations.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                      {t('map.noLocations')}
                    </div>
                  ) : (
                    locations.map((location) => (
                      <Card
                        key={location.slug}
                        className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 ${
                          selectedSlug === location.slug ? 'ring-2 ring-primary shadow-lg' : ''
                        }`}
                        onClick={() => {
                          setSelectedSlug(location.slug);
                          window.location.href = `/locations/${location.slug}`;
                        }}
                      >
                        <CardHeader className="p-4 pb-3">
                          <CardTitle className="text-base flex items-start gap-2 leading-tight">
                            <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                            <span className="line-clamp-2">{location.name}</span>
                          </CardTitle>
                          {(location.city || location.country) && (
                            <CardDescription className="text-sm mt-1">
                              {[location.city, location.country].filter(Boolean).join(', ')}
                            </CardDescription>
                          )}
                        </CardHeader>
                        {location.date && (
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {location.date}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <Card className="overflow-hidden shadow-lg">
                <div
                  ref={mapRef}
                  className="w-full h-[600px] bg-slate-100"
                  style={{ zIndex: 0 }}
                >
                  {!mapLoaded && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">{t('map.loading')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
