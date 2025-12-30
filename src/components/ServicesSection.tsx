import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Hand, ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import galleryBraids from "@/assets/gallery-braids.jpg";
import pedicure from "@/assets/pedicure.jpg";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/lib/types";

const categoryConfig = {
  africaine: {
    id: "coiffure",
    icon: Scissors,
    title: "Coiffure Africaine",
    description: "Spécialiste en nattes, tresses et extensions capillaires.",
    image: galleryBraids,
    link: "/coiffure"
  },
  europeenne: {
    id: "coiffure-europeenne",
    icon: Scissors,
    title: "Coiffure Européenne",
    description: "Coupes, brushings, balayages et colorations professionnels.",
    image: galleryBraids,
    link: "/coiffure"
  },
  evenementiel: {
    id: "evenementiel",
    icon: Scissors,
    title: "Coiffures Événementielles",
    description: "Coiffures de mariage personnalisées pour événements spéciaux.",
    image: galleryBraids,
    link: "/coiffure"
  },
  regard: {
    id: "regard",
    icon: Hand,
    title: "Soins du Regard",
    description: "Pose de faux cils pour un regard intense.",
    image: galleryBraids,
    link: "#contact"
  },
  pedicure: {
    id: "pedicure",
    icon: Hand,
    title: "Pédicure",
    description: "Pédicure médicale et soin esthétique des pieds.",
    image: pedicure,
    link: "/pedicure"
  },
  manucure: {
    id: "manucure",
    icon: Hand,
    title: "Manucure",
    description: "Pose de vernis semi-permanent pour les ongles.",
    image: pedicure,
    link: "/pedicure"
  }
};

const ServicesSection = () => {
  const { categories } = useCategories();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);

  // Obtenir les catégories principales actives
  const mainCategories = categories.filter(category => !category.parentId && category.status === 'active');

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (!api || !isPlaying) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [api, isPlaying]);

  useEffect(() => {
    if (cardRefs.current.length > 0) {
      const heights = cardRefs.current.map(ref => ref?.getBoundingClientRect().height || 0);
      const max = Math.max(...heights);
      setMaxHeight(max);
    }
  }, [mainCategories]);

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Nos Expertises
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Des services sur mesure pour vous
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez notre gamme de services professionnels, alliant savoir-faire 
            traditionnel et techniques modernes.
          </p>
        </div>

        {/* Services Carousel */}
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
              {mainCategories.map((category, index) => (
                <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card
                    variant="elevated"
                    className={`overflow-hidden group animate-fade-in-up animation-delay-${(index + 1) * 100}`}
                    ref={(el) => cardRefs.current[index] = el}
                    style={maxHeight > 0 ? { height: `${maxHeight}px` } : {}}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                          {category.name.toLowerCase().includes('coiffure') ? (
                            <Scissors size={24} className="text-primary-foreground" />
                          ) : category.name.toLowerCase().includes('beauté') || category.name.toLowerCase().includes('regard') ? (
                            <Sparkles size={24} className="text-primary-foreground" />
                          ) : (
                            <Hand size={24} className="text-primary-foreground" />
                          )}
                        </div>
                          <h3 className="font-display text-2xl font-bold text-foreground">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>

                      {/* Features - lister les sous-catégories */}
                      <ul className="space-y-3">
                        {categories.filter(sub => sub.parentId === category.id && sub.status === 'active').map((sub, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm">
                            <Check size={16} className="text-primary flex-shrink-0" />
                            <span className="text-foreground">{sub.name}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Duration & Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">

                        </div>
                        <span className="font-display text-xl font-bold text-primary">

                        </span>
                      </div>

                      {/* CTA */}
                      {category.id === 'coiffure' ? (
                        <Link to="/coiffure">
                          <Button variant="soft" className="w-full group/btn">
                            En savoir plus
                            <ArrowRight
                              size={16}
                              className="transition-transform group-hover/btn:translate-x-1"
                            />
                          </Button>
                        </Link>
                      ) : category.id === 'pedicure-manucure' ? (
                        <Link to="/pedicure">
                          <Button variant="soft" className="w-full group/btn">
                            En savoir plus
                            <ArrowRight
                              size={16}
                              className="transition-transform group-hover/btn:translate-x-1"
                            />
                          </Button>
                        </Link>
                      ) : category.id === 'beaute' ? (
                        <Link to="/beaute">
                          <Button variant="soft" className="w-full group/btn">
                            En savoir plus
                            <ArrowRight
                              size={16}
                              className="transition-transform group-hover/btn:translate-x-1"
                            />
                          </Button>
                        </Link>
                      ) : (
                        <a href="#contact">
                          <Button variant="soft" className="w-full group/btn">
                          En savoir plus                           <ArrowRight
                              size={16}
                              className="transition-transform group-hover/btn:translate-x-1"
                            />
                          </Button>
                        </a>
                      )}
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
      </div>
    </section>
  );
};

export default ServicesSection;
