import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRealizations } from "@/features/realizations/hooks/useRealizations";
import { useServices } from "@/features/services/hooks/useServices";
import { useAdminSettings } from "@/hooks/useAdminSettings";

const GallerySection = () => {
  const { realizations } = useRealizations();
  const { services } = useServices();
  const { settings } = useAdminSettings();
  const [activeCategory, setActiveCategory] = useState("Toutes");

  // Create categories from service names that have realizations
  const categoriesWithRealizations = services.filter(service =>
    realizations.some(realization => realization.serviceId === service.id)
  ).map(service => service.name);

  const categories = ["Toutes", ...categoriesWithRealizations];

  // Filter realizations based on selected service
  const filteredRealizations = activeCategory === "Toutes"
    ? realizations
    : realizations.filter(realization => {
        const service = services.find(s => s.id === realization.serviceId);
        return service && service.name === activeCategory;
      });

  return (
    <section id="realisations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Notre Galerie
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nos réalisations
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez notre savoir-faire à travers quelques-unes de nos plus 
            belles réalisations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-3 overflow-x-auto max-w-2xl scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "soft"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="transition-all duration-300 whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filteredRealizations.map((realization, index) => {
            const service = services.find(s => s.id === realization.serviceId);
            return (
              <div
                key={realization.id}
                className={`relative group overflow-hidden rounded-2xl ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                } animate-scale-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={realization.image}
                  alt={realization.caption}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    index === 0 ? "h-full min-h-[400px]" : "h-48 md:h-64"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-2">
                    {realization.title && (
                      <h3 className="text-primary-foreground font-semibold text-sm">
                        {realization.title}
                      </h3>
                    )}
                    <p className="text-primary-foreground/90 text-xs">
                      {realization.caption}
                    </p>
                    {service && (
                      <span className="inline-block bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        {service.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={settings.socialLinks?.instagram || "https://www.instagram.com/hortycoiffure/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="heroOutline" size="lg">
              Voir plus sur Instagram
              <ArrowRight size={18} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
