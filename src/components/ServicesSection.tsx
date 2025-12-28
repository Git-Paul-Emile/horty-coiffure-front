import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Hand, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import galleryBraids from "@/assets/gallery-braids.jpg";
import pedicure from "@/assets/pedicure.jpg";

const services = [
  {
    id: "coiffure",
    icon: Scissors,
    title: "Coiffure Africaine et Européenne",
    description:
      "Nattes, tresses, twists, extensions, coupes, brushings, balayages, colorations. Experte en coiffures de mariage et pose de faux cils.",
    image: galleryBraids,
    features: [
      "Nattes simples et collées",
      "Tresses de toutes tailles",
      "Twists naturels",
      "Extensions avec ou sans mèches",
      "Coupes et brushings",
      "Balayages et colorations",
      "Coiffures de mariage",
      "Pose de faux cils",
    ]
  },
  {
    id: "pedicure",
    icon: Hand,
    title: "Pédicure et Manucure",
    description:
      "Pédicure médicale complète avec traitement des durillons, cors, œils-de-perdrix, ongles incarnés, mycose. Pédicure simple et manucure avec pose de vernis semi-permanent.",
    image: pedicure,
    features: [
      "Traitement complet des durillons, cors, œils-de-perdrix",
      "Soins des ongles incarnés et mycose",
      "Pédicure simple avec soin classique",
      "Manucure et pose de vernis semi-permanent",
      "Massage relaxant des pieds",
    ]
  },
];

const ServicesSection = () => {
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.id}
              variant="elevated"
              className={`overflow-hidden group animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                      <service.icon size={24} className="text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
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
                {service.id === "coiffure" ? (
                  <Link to="/coiffure">
                    <Button variant="soft" className="w-full group/btn">
                      En savoir plus
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </Button>
                  </Link>
                ) : service.id === "pedicure" ? (
                  <Link to="/pedicure">
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
                      Réserver ce service
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
