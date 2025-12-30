import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { slugify } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PublicProducts = () => {
  const location = useLocation();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');

  useEffect(() => {
    if (location.hash && products.length > 0) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location, products]);

  // Filtrer seulement les produits actifs
  const activeProducts = products.filter(product => product.status === 'active');

  // Filtrer selon la recherche et la catégorie
  const filteredProducts = activeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Grouper les produits filtrés par catégorie
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || 'Autres';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Obtenir toutes les catégories uniques
  const categories = Array.from(new Set(activeProducts.map(p => p.category || 'Autres')));

  const renderProductCard = (product: Product) => (
    <Card key={product.id} id={slugify(product.name)} className="group transition-all duration-300 hover:shadow-xl hover:scale-[1.03] overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 ${product.image ? 'hidden' : ''}`}>
          <span className="text-sm font-medium">Image à venir</span>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <CardHeader className="pb-3 px-6">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">{product.name}</CardTitle>
        </div>
        {product.brand && (
          <p className="text-sm text-primary font-semibold uppercase tracking-wide">{product.brand}</p>
        )}
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.description}</p>
      </CardHeader>
      <CardContent className="pt-0 px-6 pb-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {product.price}€
          </div>
          {product.category && (
            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors duration-200">
              {product.category}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Nos Produits
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Découvrez notre sélection
            </h1>
            <p className="text-lg text-muted-foreground">
              Des produits de qualité pour prendre soin de vos cheveux et de votre peau,
              disponibles directement à notre salon.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={(value: string) => setCategoryFilter(value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Produits par catégorie */}
          {Object.keys(groupedProducts).length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Aucun produit trouvé.
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category} id={slugify(category)} className="mb-16">
                <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                  {category}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryProducts.map(renderProductCard)}
                </div>
              </div>
            ))
          )}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Pour plus d'informations ou pour commander, contactez-nous directement.
            </p>
            <a href="#contact" className="inline-block">
              <Badge variant="secondary" className="px-4 py-2">
                Nous contacter
              </Badge>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicProducts;