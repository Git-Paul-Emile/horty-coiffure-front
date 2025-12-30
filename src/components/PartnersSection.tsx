import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { usePartners } from "@/hooks/usePartners";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const PartnersSection = () => {
  const { partners } = usePartners();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!api || !isPlaying) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, isPlaying]);

  // Update current slide and count
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (partners.length === 0) {
    return null;
  }

  return (
    <section id="marques" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Nos Marques
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Les marques que nous recommandons
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les marques de qualité que nous utilisons et recommandons
            pour vos soins.
          </p>
        </div>

        {/* Partners Carousel */}
        <div
          className="max-w-5xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {partners.map((partner, index) => (
                <CarouselItem key={partner.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card
                    variant="elevated"
                    className="overflow-hidden group animate-fade-in-up animation-delay-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        {/* Logo */}
                        <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center overflow-hidden">
                          {partner.logo ? (
                            <img
                              src={partner.logo}
                              alt={`Logo ${partner.name}`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full flex items-center justify-center text-muted-foreground text-sm ${partner.logo ? 'hidden' : ''}`}>
                            Logo
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {partner.name}
                        </h3>

                        {/* Description */}
                        {partner.description && (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {partner.description}
                          </p>
                        )}

                        {/* Website Link */}
                        {partner.website && partner.website !== '#' && (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                          >
                            Visiter le site
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {count > 1 && <CarouselPrevious className="hidden md:flex" />}
            {count > 1 && <CarouselNext className="hidden md:flex" />}
          </Carousel>
          {/* Dots Indicator */}
          {count > 1 && (
            <div className="flex justify-center mt-6">
              {Array.from({ length: count }, (_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors ${i + 1 === current ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Aller à la slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ces produits sont disponibles dans notre salon.
          </p>
          <a href="#contact">
            <Badge variant="secondary" className="px-4 py-2">
              Nous contacter
            </Badge>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;