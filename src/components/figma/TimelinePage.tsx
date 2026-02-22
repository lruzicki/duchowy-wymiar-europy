import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  year: string;
  country: 'poland' | 'germany' | 'both';
  person: string;
  role: string;
  description: string;
  highlight?: boolean;
}

export function TimelinePage() {
  const events: TimelineEvent[] = [
    {
      year: "1980-1989",
      country: "both",
      person: "Początki współpracy",
      role: "Wspólna walka z komunizmem",
      description: "W czasach oporu przeciw komunizmowi nawiązały się pierwsze więzi między przyjaciółmi z Polski i Niemiec. Doświadczenie prawdziwej solidarności, w której kształtował się duch europejski.",
      highlight: true
    },
    {
      year: "1989",
      country: "poland",
      person: "Przełom",
      role: "Upadek muru berlińskiego",
      description: "Symboliczne wydarzenie, które otworzyło drogę do zjednoczonej Europy i pogłębiło polsko-niemiecką przyjaźń.",
      highlight: true
    },
    {
      year: "1990-2000",
      country: "both",
      person: "Budowanie mostów",
      role: "Pierwsze projekty współpracy",
      description: "Rozpoczęcie regularnej współpracy w dziedzinie edukacji i wymiany kulturalnej. Pierwsze wizyty studyjne i programy wymiany młodzieży.",
    },
    {
      year: "2005",
      country: "germany",
      person: "Partnerzy z Hanoweru",
      role: "Nawiązanie współpracy instytucjonalnej",
      description: "Formalne rozpoczęcie partnerstwa z organizacjami w Hanowerze, które zaowocowało wieloma wspólnymi projektami edukacyjnymi.",
    },
    {
      year: "2010",
      country: "poland",
      person: "Założenie Fundacji",
      role: "Duchowy Wymiar Europy",
      description: "Oficjalne założenie Fundacji Duchowy Wymiar Europy przez grono przyjaciół z Polski i Niemiec. Misja: wspieranie edukacji i współpracy transgranicznej.",
      highlight: true
    },
    {
      year: "2015",
      country: "both",
      person: "Rozszerzenie działalności",
      role: "Pierwsze dostawy komputerów",
      description: "Rozpoczęcie programu wyposażania szkół w sprzęt komputerowy. Przekazanie pierwszych 100 komputerów dla szkół w Polsce.",
    },
    {
      year: "2020",
      country: "poland",
      person: "Adaptacja cyfrowa",
      role: "Wsparcie podczas pandemii",
      description: "Intensyfikacja działań w zakresie cyfryzacji edukacji. Wsparcie szkół w przejściu na nauczanie zdalne poprzez dostawy sprzętu i szkolen ia.",
    },
    {
      year: "2023",
      country: "both",
      person: "Kontynuacja misji",
      role: "Nowe projekty i wyzwania",
      description: "Realizacja projektów w 6 miastach Polski i Niemiec. Przekazanie ponad 200 komputerów i organizacja programów wymiany dla młodzieży.",
    }
  ];

  const getCountryColors = (country: string) => {
    switch (country) {
      case 'poland':
        return 'bg-red-500';
      case 'germany':
        return 'bg-yellow-500';
      case 'both':
        return 'bg-gradient-to-r from-red-500 via-white to-yellow-500';
      default:
        return 'bg-primary';
    }
  };

  const getCountryLabel = (country: string) => {
    switch (country) {
      case 'poland':
        return '🇵🇱 Polska';
      case 'germany':
        return '🇩🇪 Niemcy';
      case 'both':
        return '🇵🇱 🇩🇪 Wspólnie';
      default:
        return '';
    }
  };

  return (
    <section className="min-h-screen py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
            Historia współpracy
          </div>
          <h1 className="mb-6">Oś Czasu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Podróż przez dekady polsko-niemieckiej przyjaźni i współpracy, od czasów walki o wolność po budowanie wspólnej przyszłości w zjednoczonej Europie.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 transform -translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-2 items-center justify-center z-10">
                    <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${getCountryColors(event.country)}`} />
                  </div>

                  {/* Content Card */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <Card className={`${event.highlight ? 'ring-2 ring-primary shadow-xl' : 'shadow-lg'} hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm`}>
                      <CardContent className="p-6">
                        {/* Year Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="outline" className="text-lg px-3 py-1 font-bold bg-primary text-primary-foreground border-none">
                            {event.year}
                          </Badge>
                          <span className="text-sm">{getCountryLabel(event.country)}</span>
                        </div>

                        {/* Event Details */}
                        <h3 className="mb-2">{event.person}</h3>
                        <p className="text-primary font-medium mb-3">{event.role}</p>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>

                        {event.highlight && (
                          <div className="mt-4 pt-4 border-t border-primary/20">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                              Wydarzenie kluczowe
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Mobile Timeline Indicator */}
                    <div className="md:hidden flex items-center gap-3 mt-4 ml-6">
                      <div className={`w-3 h-3 rounded-full ${getCountryColors(event.country)}`} />
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Quote */}
        <Card className="mt-20 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <p className="text-xl font-medium text-foreground mb-3">
              "Naszym udziałem w czasach oporu przeciw komunizmowi było doświadczenie prawdziwej solidarności, w której kształtował się duch europejski."
            </p>
            <p className="text-muted-foreground italic">
              Z manifestu Fundacji Duchowy Wymiar Europy
            </p>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Wydarzenia w Polsce</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Wydarzenia w Niemczech</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 via-white to-yellow-500" />
            <span>Współpraca polsko-niemiecka</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
