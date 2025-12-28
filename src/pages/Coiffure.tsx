import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Check } from "lucide-react";
import galleryBraids from "@/assets/gallery-braids.jpg";
import galleryTwists from "@/assets/gallery-twists.jpg";
import galleryExtensions from "@/assets/gallery-extensions.jpg";

const coiffureTypes = [
  {
    id: "nattes",
    title: "Nattes Simples et Collées",
    description: "Des nattes classiques réalisées avec soin pour un look naturel et élégant.",
    image: galleryBraids,
    features: [
      "Nattes fines ou épaisses selon vos préférences",
      "Collées pour une tenue parfaite",
      "Durée de vie prolongée",
      "Adaptées à tous les types de cheveux",
    ],
    duration: "2h à 3h",
    price: "À partir de 45€",
  },
  {
    id: "tresses",
    title: "Tresses de Toutes Tailles",
    description: "Tresses africaines traditionnelles, disponibles en différentes tailles et styles.",
    image: galleryBraids, // Réutiliser pour l'instant
    features: [
      "Tresses fines pour un look délicat",
      "Tresses moyennes pour la polyvalence",
      "Tresses épaisses pour un style affirmé",
      "Personnalisation selon vos envies",
    ],
    duration: "3h à 5h",
    price: "À partir de 50€",
  },
  {
    id: "twists",
    title: "Twists Naturels",
    description: "Twists naturels pour un style bohème et facile à entretenir.",
    image: galleryTwists,
    features: [
      "Twists fins pour une texture douce",
      "Twists moyens pour plus de volume",
      "Tenue longue durée",
      "Idéal pour les cheveux naturels",
    ],
    duration: "1h30 à 2h30",
    price: "À partir de 40€",
  },
  {
    id: "extensions",
    title: "Extensions avec ou sans Mèches",
    description: "Ajoutez de la longueur et du volume avec nos extensions de qualité.",
    image: galleryExtensions,
    features: [
      "Extensions naturelles pour un rendu invisible",
      "Avec ou sans mèches colorées",
      "Installation professionnelle",
      "Conseils pour l'entretien",
    ],
    duration: "2h à 4h",
    price: "À partir de 60€",
  },
  {
    id: "coupes",
    title: "Coupes et Brushings",
    description: "Coupes modernes et brushings professionnels pour un style impeccable.",
    image: galleryBraids, // Réutiliser
    features: [
      "Coupes adaptées à votre forme de visage",
      "Brushings lissants ou volumisants",
      "Utilisation de produits de qualité",
      "Conseils personnalisés",
    ],
    duration: "45 min à 1h30",
    price: "À partir de 30€",
  },
  {
    id: "colorations",
    title: "Balayages et Colorations",
    description: "Techniques de coloration expertes pour sublimer votre couleur naturelle.",
    image: galleryBraids, // Réutiliser
    features: [
      "Balayages subtils ou audacieux",
      "Colorations complètes",
      "Produits respectueux des cheveux",
      "Entretien et conseils",
    ],
    duration: "2h à 3h",
    price: "À partir de 50€",
  },
  {
    id: "mariage",
    title: "Coiffures de Mariage",
    description: "Coiffures élégantes et sophistiquées pour votre jour spécial.",
    image: galleryBraids, // Réutiliser
    features: [
      "Styles classiques ou modernes",
      "Utilisation d'accessoires",
      "Tenue longue durée",
      "Essai préalable possible",
    ],
    duration: "1h à 2h",
    price: "À partir de 60€",
  },
  {
    id: "faux-cils",
    title: "Pose de Faux Cils",
    description: "Pose professionnelle de faux cils pour un regard intense.",
    image: galleryBraids, // Réutiliser
    features: [
      "Faux cils naturels ou dramatiques",
      "Application sans douleur",
      "Durée de vie prolongée",
      "Retouches possibles",
    ],
    duration: "30 min à 45 min",
    price: "À partir de 25€",
  },
];

const Coiffure = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Nos Services de Coiffure
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Découvrez Nos Types de Coiffure
            </h1>
            <p className="text-lg text-muted-foreground">
              Explorez notre gamme complète de services de coiffure africaine et européenne, chacun réalisé avec expertise et passion.
            </p>
          </div>

          {/* Coiffure Types Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {coiffureTypes.map((type, index) => (
              <Card
                key={type.id}
                variant="elevated"
                className={`overflow-hidden group animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {type.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {type.features.map((feature, i) => (
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
                      {type.duration}
                    </div>
                    <span className="font-display text-xl font-bold text-primary">
                      {type.price}
                    </span>
                  </div>

                  {/* CTA */}
                  <a href="#contact">
                    <Button variant="soft" className="w-full group/btn">
                      Réserver cette coiffure
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

export default Coiffure;