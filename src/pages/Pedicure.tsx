import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Check } from "lucide-react";
import pedicure from "@/assets/pedicure.jpg";

const pedicureServices = [
  {
    id: "cors-durillons",
    title: "Traitement des Cors et Durillons",
    description: "Élimination douce et professionnelle des cors et durillons pour des pieds sains et confortables.",
    image: pedicure,
    features: [
      "Exfoliation en profondeur",
      "Application de crèmes apaisantes",
      "Prévention des récidives",
      "Conseils d'entretien à domicile",
    ],
    duration: "30 min à 45 min",
    price: "À partir de 25€",
  },
  {
    id: "ongles-incarnes",
    title: "Soins des Ongles Incarnés",
    description: "Traitement spécialisé pour les ongles incarnés avec des techniques douces et efficaces.",
    image: pedicure,
    features: [
      "Désincarcération sans douleur",
      "Application d'antiseptiques",
      "Bandage protecteur",
      "Suivi post-traitement",
    ],
    duration: "45 min à 1h",
    price: "À partir de 40€",
  },
  {
    id: "hydratation",
    title: "Hydratation Profonde",
    description: "Soins intensifs d'hydratation pour nourrir et revitaliser la peau de vos pieds.",
    image: pedicure,
    features: [
      "Masque hydratant nourrissant",
      "Massage relaxant",
      "Protection longue durée",
      "Résultats visibles dès la première séance",
    ],
    duration: "30 min à 45 min",
    price: "À partir de 30€",
  },
  {
    id: "conseils",
    title: "Conseils Personnalisés",
    description: "Accompagnement personnalisé pour le bien-être quotidien de vos pieds.",
    image: pedicure,
    features: [
      "Évaluation de votre situation",
      "Recommandations adaptées",
      "Prévention des problèmes",
      "Suivi régulier conseillé",
    ],
    duration: "15 min à 30 min",
    price: "Inclus dans les soins",
  },
];

const Pedicure = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Nos Services de Pédicure
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Découvrez Nos Soins de Pédicure Médicale
            </h1>
            <p className="text-lg text-muted-foreground">
              Explorez notre gamme complète de soins de pédicure médicale, réalisée dans un cadre hygiénique et professionnel.
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

                  {/* CTA */}
                  <a href="#contact">
                    <Button variant="soft" className="w-full group/btn">
                      Réserver ce soin
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Pedicure;