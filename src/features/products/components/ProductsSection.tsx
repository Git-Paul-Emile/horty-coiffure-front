import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";

const ProductsSection = () => {
  const { products } = useProducts();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filtrer seulement les produits actifs
  const activeProducts = products.filter(product => product.status === 'active');

  // Obtenir les premiers produits actifs pour le carousel (par exemple 6 produits)
  const featuredProducts = activeProducts.slice(0, 6);

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

  if (featuredProducts.length === 0) {
    return null; // Ne pas afficher la section si aucun produit
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
            Découvrez nos produits
          </h2>
          <p className="text-lg text-muted-foreground">
            Notre gamme de produits pour prendre soin de vous.
          </p>
        </div>

        {/* Categories Carousel */}
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
              {featuredProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link to={`/produits#${slugify(product.name)}`}>
                    <Card className="overflow-hidden group animate-fade-in-up animation-delay-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className={`w-full h-full flex items-center justify-center text-muted-foreground ${product.image ? 'hidden' : ''}`}>
                          <Package size={48} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-foreground">
                            <span className="text-sm font-medium bg-black/20 px-2 py-1 rounded">
                              {product.price}€
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-bold text-foreground mb-3">
                          {product.name}
                        </h3>
                        {product.brand && (
                          <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                            {product.brand}
                          </p>
                        )}
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <Button variant="soft" className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-colors">
                          Voir le produit
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover/btn:translate-x-1"
                          />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
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
