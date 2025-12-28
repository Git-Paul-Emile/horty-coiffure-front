import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useProducts } from "@/hooks/useProducts";

const ProductsSection = () => {
  const { products } = useProducts();

  // Filtrer seulement les produits actifs
  const activeProducts = products.filter(product => product.status === 'active');

  // Obtenir les catégories uniques
  const categories = Array.from(new Set(activeProducts.map(product => product.category || 'Autres')));

  if (categories.length === 0) {
    return null; // Ne pas afficher la section si aucune catégorie
  }

  // Fonction pour obtenir une image représentative pour une catégorie
  const getCategoryImage = (category: string) => {
    const categoryProducts = activeProducts.filter(p => (p.category || 'Autres') === category);
    return categoryProducts.find(p => p.image)?.image || '/placeholder.svg';
  };

  // Fonction pour compter les produits dans une catégorie
  const getCategoryCount = (category: string) => {
    return activeProducts.filter(p => (p.category || 'Autres') === category).length;
  };

  return (
    <section id="produits" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Nos Produits
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Découvrez nos catégories
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez notre gamme de produits Babor® et de produits naturels à base d'extraits végétaux pour prendre soin de vos cheveux et de votre peau.
          </p>
        </div>

        {/* Categories Carousel */}
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {categories.map((category, index) => (
                <CarouselItem key={category} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden group animate-fade-in-up animation-delay-100">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={getCategoryImage(category)}
                        alt={`Catégorie ${category}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className={`w-full h-full flex items-center justify-center text-muted-foreground ${getCategoryImage(category) !== '/placeholder.svg' ? 'hidden' : ''}`}>
                        <Package size={48} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-foreground">
                          <span className="text-sm font-medium">
                            {getCategoryCount(category)} produit{getCategoryCount(category) > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        {category}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Découvrez notre sélection de produits {category.toLowerCase()} de qualité.
                      </p>
                      <Link to="/produits">
                        <Button variant="soft" className="w-full group/btn">
                          Voir les produits
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover/btn:translate-x-1"
                          />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to="/produits">
            <Button variant="hero" size="lg">
              <Package className="mr-2 h-5 w-5" />
              Voir tous nos produits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;