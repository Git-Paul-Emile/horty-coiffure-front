import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { usePartners } from "@/hooks/usePartners";

const PartnersSection = () => {
  const { partners } = usePartners();

  if (partners.length === 0) {
    return null;
  }

  return (
    <section id="partenaires" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Nos Partenaires
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Les marques que nous recommandons
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les marques partenaires de qualité que nous utilisons et recommandons
            pour vos soins capillaires et de beauté.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <Card
              key={partner.id}
              variant="elevated"
              className={`overflow-hidden group animate-fade-in-up animation-delay-${(index + 1) * 100}`}
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
          ))}
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