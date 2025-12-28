import { useState } from "react";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Check, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppointments } from '@/hooks/useAppointments';

declare global {
  interface Calendly {
    initPopupWidget(options: { url: string; [key: string]: unknown }): void;
  }
  interface Window {
    Calendly: Calendly;
  }
}
import pedicure from "@/assets/pedicure.jpg";

const pedicureServices = [
  {
    id: "pedicure-medicale",
    title: "Pédicure Médicale",
    description: "Traitement complet des durillons, cors, œils-de-perdrix, ongles incarnés, mycose. Chaque soin est conclu par un massage relaxant des pieds.",
    image: pedicure,
    features: [
      "Traitement des durillons et cors",
      "Soins des œils-de-perdrix et mycose",
      "Traitement des ongles incarnés",
      "Massage relaxant des pieds",
      "Conseils personnalisés",
    ],
    duration: "45 min à 1h",
    price: "À partir de 35€",
  },
  {
    id: "pedicure-simple",
    title: "Pédicure Simple",
    description: "Soin classique avec soin des pieds et pose de vernis semi-permanent.",
    image: pedicure,
    features: [
      "Soin classique des pieds",
      "Pose de vernis semi-permanent",
      "Hydratation légère",
      "Finition impeccable",
    ],
    duration: "30 min à 45 min",
    price: "À partir de 25€",
  },
  {
    id: "manucure",
    title: "Manucure",
    description: "Pose de vernis semi-permanent sur vos ongles pour un look soigné.",
    image: pedicure,
    features: [
      "Préparation des ongles",
      "Pose de vernis semi-permanent",
      "Soin des cuticules",
      "Durée longue tenue",
    ],
    duration: "30 min à 45 min",
    price: "À partir de 20€",
  },
];

const Pedicure = () => {
  const { settings } = useAppointments();
  const [tooltipOpen, setTooltipOpen] = useState(true);

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* Floating Appointment Button */}
      <TooltipProvider>
        <Tooltip open={tooltipOpen}>
          <TooltipTrigger asChild>
            <Button
              className="fixed bottom-20 right-8 z-50 p-3 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 animate-vibrate hover:animate-none"
              size="icon"
              onMouseEnter={() => setTooltipOpen(false)}
              onMouseLeave={() => setTooltipOpen(true)}
              onClick={() => {
                if (window.Calendly) {
                  window.Calendly.initPopupWidget({
                    url: settings.calendlyUrl,
                  });
                }
              }}
              aria-label="Prendre rendez-vous"
            >
              <Calendar size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Prendre rendez-vous</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Nos Services de Pédicure
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Découvrez Nos Soins de Pédicure et Manucure
            </h1>
            <p className="text-lg text-muted-foreground">
              Explorez notre gamme complète de soins de pédicure et manucure, réalisée dans un cadre hygiénique et professionnel.
            </p>
          </div>

          {/* Pedicure Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {pedicureServices.map((service, index) => (
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
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
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
                      <Clock size={16} />
                      {service.duration}
                    </div>
                    <span className="font-display text-xl font-bold text-primary">
                      {service.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Pedicure;