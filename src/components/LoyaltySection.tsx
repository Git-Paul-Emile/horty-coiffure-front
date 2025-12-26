import { Card, CardContent } from "@/components/ui/card";
import { Gift, Percent, Heart, Crown } from "lucide-react";

const benefits = [
  {
    icon: Gift,
    title: "Carte Gratuite",
    description: "Recevez votre carte de fidélité gratuitement dès votre première visite.",
  },
  {
    icon: Percent,
    title: "-10% Offerts",
    description: "Après 5 prestations coiffure, bénéficiez de 10% de réduction sur la suivante.",
  },
  {
    icon: Heart,
    title: "Avantages Exclusifs",
    description: "Accédez à des offres spéciales et des promotions réservées aux membres.",
  },
  {
    icon: Crown,
    title: "Priorité RDV",
    description: "Les membres fidèles bénéficient d'une priorité sur les créneaux de rendez-vous.",
  },
];

const LoyaltySection = () => {
  return (
    <section id="fidelite" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Programme Fidélité
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Votre fidélité récompensée
          </h2>
          <p className="text-lg text-muted-foreground">
            Rejoignez notre programme de fidélité et profitez d'avantages 
            exclusifs à chaque visite.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              variant="interactive"
              className={`text-center animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                  <benefit.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it Works */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card variant="soft" className="overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    Comment ça marche ?
                  </h3>
                  <ol className="space-y-4">
                    {[
                      "Demandez votre carte lors de votre prochaine visite",
                      "Cumulez un tampon par prestation coiffure",
                      "Au 5ème tampon, profitez de -10% sur votre prochaine coiffure",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </span>
                        <span className="text-foreground pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground shadow-elevated">
                    <div className="text-center">
                      <Crown size={48} className="mx-auto mb-4 opacity-80" />
                      <p className="font-display text-3xl font-bold mb-2">
                        Carte VIP
                      </p>
                      <p className="text-primary-foreground/80">
                        Horty Coiffure
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-10 h-10 rounded-full border-2 border-primary-foreground/50 flex items-center justify-center ${
                            i <= 3 ? "bg-primary-foreground/20" : ""
                          }`}
                        >
                          {i <= 3 && (
                            <Gift size={16} className="text-primary-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/30 rounded-full blur-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;
