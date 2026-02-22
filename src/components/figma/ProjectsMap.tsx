import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { LocationListItem } from '@/lib/locations';

// Leaflet imports - will be loaded dynamically
type LatLngExpression = [number, number];

interface Project {
  id: number;
  coords: LatLngExpression;
  address: string;
  title: string;
  name: string;
  description: string;
  date: string;
  participants: number;
  images: string[];
}

interface ProjectsMapProps {
  locations?: LocationListItem[];
}

// Projects data embedded directly
const projectsData: Project[] = [
  {
    id: 1,
    coords: [52.4064, 16.9252],
    address: "ul. Poznańska 45, Poznań",
    title: "Szkoła Podstawowa nr 28",
    name: "Komputery dla Szkół - Poznań Wilda",
    description: "Przekazanie 45 komputerów dla szkół podstawowych w dzielnicy Wilda. Sprzęt przekazany przez partnerów z Hanoweru. Uczniowie zyskali dostęp do nowoczesnej pracowni komputerowej.",
    date: "15 grudnia 2023",
    participants: 120,
    images: [
      "https://images.unsplash.com/photo-1759646827278-27c5733e0cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjb21wdXRlcnMlMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDQ1NzI0OHww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 2,
    coords: [52.5200, 13.4050],
    address: "Berliner Straße 100, Berlin",
    title: "Wymiana Młodzieży",
    name: "Program Poznań-Berlin 2023",
    description: "Dwutygodniowy program wymiany dla 30 uczniów szkół średnich. Warsztaty językowe, kulturalne i zwiedzanie stolicy Niemiec. Budowanie mostów między młodymi Polakami i Niemcami.",
    date: "10 października 2023",
    participants: 30,
    images: [
      "https://images.unsplash.com/photo-1760267973986-5370a55550f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjaGlsZHJlbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MDQ1NzI1MHww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 3,
    coords: [52.7368, 15.2288],
    address: "ul. Szkolna 12, Gorzów Wielkopolski",
    title: "Szkoły w Gorzowie",
    name: "Komputery dla Szkół - Gorzów",
    description: "Wyposażenie pracowni komputerowych w 3 szkołach podstawowych. 38 zestawów komputerowych wraz z oprogramowaniem edukacyjnym. Szkolenie dla nauczycieli w zakresie nowoczesnych technologii.",
    date: "5 września 2023",
    participants: 95,
    images: [
      "https://images.unsplash.com/photo-1759646827278-27c5733e0cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjb21wdXRlcnMlMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDQ1NzI0OHww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 4,
    coords: [52.4089, 16.9325],
    address: "Centrum Konferencyjne, Poznań",
    title: "Warsztaty NGO",
    name: "Warsztaty Polsko-Niemieckie",
    description: "Seria warsztatów na temat współpracy transgranicznej dla przedstawicieli organizacji pozarządowych. Wymiana doświadczeń i najlepszych praktyk w zakresie projektów europejskich.",
    date: "20 czerwca 2023",
    participants: 45,
    images: [
      "https://images.unsplash.com/photo-1673515336414-0db19994707f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvb3BlcmF0aW9uJTIwaGFuZHMlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzA0NTcyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 5,
    coords: [53.4285, 14.5528],
    address: "ul. Edukacyjna 8, Szczecin",
    title: "Szkoły Szczecińskie",
    name: "Komputery dla Szkół - Szczecin",
    description: "Przekazanie sprzętu komputerowego dla szkół w województwie zachodniopomorskim. Łącznie 52 komputery dla 5 placówek edukacyjnych. Wsparcie cyfryzacji edukacji w regionie.",
    date: "3 kwietnia 2023",
    participants: 140,
    images: [
      "https://images.unsplash.com/photo-1759646827278-27c5733e0cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjb21wdXRlcnMlMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDQ1NzI0OHww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 6,
    coords: [52.2297, 21.0122],
    address: "ul. Warszawska 50, Warszawa",
    title: "Konferencja Edukacyjna",
    name: "Forum Edukacji Cyfrowej",
    description: "Ogólnopolska konferencja poświęcona cyfryzacji edukacji i współpracy międzynarodowej. Udział ekspertów z Polski, Niemiec i innych krajów UE. Wymiana doświadczeń i planowanie przyszłych projektów.",
    date: "15 marca 2023",
    participants: 180,
    images: [
      "https://images.unsplash.com/photo-1673515336414-0db19994707f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvb3BlcmF0aW9uJTIwaGFuZHMlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzA0NTcyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  }
];

export function ProjectsMap({ locations = [] }: ProjectsMapProps) {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  const projectsFromCms: Project[] = locations.map((location, index) => ({
    id: index + 1,
    coords: [location.coordinates.lat, location.coordinates.lng],
    address: `${location.coordinates.lat.toFixed(5)}, ${location.coordinates.lng.toFixed(5)}`,
    title: location.slug,
    name: location.name,
    description: location.summary || t('map.noDescription'),
    date: t('map.dateUnfilled'),
    participants: 0,
    images: [],
  }))

  const projects = projectsFromCms.length > 0 ? projectsFromCms : projectsData

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
      const L = await import('https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js');

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

      // Add markers for each project
      const markers: any[] = [];

      projects.forEach((project) => {
        const marker = L.marker(project.coords).addTo(map);

        // Create popup content
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${project.name}</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${project.title}</p>
            <p style="margin: 0; font-size: 12px; color: #999;">${project.address}</p>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Add click event to show project details
        marker.on('click', () => {
          setSelectedProject(project);
          setCurrentImageIndex(0);
        });

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
  }, [projects]);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);

    // Fly to marker on map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(project.coords, 12, {
        duration: 1.5,
      });
    }
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="py-20 pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">{t('map.heading')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('map.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project List Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="mb-4 px-1">{t('map.projectList')}</h3>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {projects.map((project) => (
                    <Card
                      key={project.id}
                      className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                        selectedProject?.id === project.id
                          ? 'ring-2 ring-primary shadow-lg'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleProjectSelect(project)}
                    >
                      <CardHeader className="p-4 pb-3">
                        <CardTitle className="text-base flex items-start gap-2 leading-tight">
                          <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span className="line-clamp-2">{project.name}</span>
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {project.title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {project.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {project.participants} {t('map.people')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="pr-8">{selectedProject.name}</DialogTitle>
              </DialogHeader>

              <ScrollArea className="max-h-[calc(90vh-8rem)]">
                <div className="space-y-4 pr-4">
                  {/* Image Gallery */}
                  {selectedProject.images.length > 0 && (
                    <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedProject.images[currentImageIndex]}
                        alt={selectedProject.name}
                        className="w-full h-full object-cover"
                      />

                      {selectedProject.images.length > 1 && (
                        <>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                            onClick={nextImage}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>

                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-xs rounded-full">
                            {currentImageIndex + 1} / {selectedProject.images.length}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Project Info */}
                  <div>
                    <Badge className="mb-3">{selectedProject.title}</Badge>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">{t('map.date')}</div>
                        <div className="text-sm">{selectedProject.date}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">{t('map.location')}</div>
                        <div className="text-sm">{selectedProject.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground">{t('map.participants')}</div>
                        <div className="text-sm">{selectedProject.participants} {t('map.people')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
