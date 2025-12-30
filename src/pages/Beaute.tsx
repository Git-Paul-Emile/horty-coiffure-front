import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Clock, Check, Search } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { useCategories } from "@/hooks/useCategories";
import { useState, useMemo } from "react";

declare global {
  interface Calendly {
    initPopupWidget(options: { url: string; [key: string]: unknown }): void;
  }
  interface Window {
    Calendly: Calendly;
  }
}

const Beaute = () => {
  const { services } = useServices();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Get subcategories for beauty
  const beautySubcategories = categories.filter(cat => cat.parentId === 'beaute');

  // Filter services for beauty and apply filters
  const filteredServices = useMemo(() => {
    let filtered = services.filter(service =>
      beautySubcategories.some(sub => sub.id === service.category)
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [services, beautySubcategories, selectedCategory, searchTerm]);

  // Group services by category
  const groupedServices = useMemo(() => {
    const groups: { [key: string]: typeof filteredServices } = {};
    filteredServices.forEach(service => {
      const categoryName = categories.find(cat => cat.id === service.category)?.name || service.category;
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(service);
    });
    return groups;
  }, [filteredServices, categories]);

  return (
    <main className="overflow-x-hidden">
      <Header />

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Nos Services de Beauté
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Découvrez Nos Soins de Beauté
            </h1>
            <p className="text-lg text-muted-foreground">
              Explorez notre gamme de soins beauté pour sublimer votre apparence et prendre soin de vous.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto mb-12">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Rechercher un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {beautySubcategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Services by Category */}
          {Object.entries(groupedServices).map(([categoryName, categoryServices], categoryIndex) => (
            <div key={categoryName} className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                {categoryName}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {categoryServices.map((service, index) => (
                  <Card
                    key={service.id}
                    variant="elevated"
                    className={`overflow-hidden group animate-fade-in-up animation-delay-${(categoryIndex * 100 + index + 1) * 100}`}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image || '/gallery-braids.jpg'}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {service.name}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      {/* Included/Excluded */}
                      <div className="space-y-3">
                        {service.included && (
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Inclus :</h4>
                            <p className="text-sm text-muted-foreground">{service.included}</p>
                          </div>
                        )}
                        {service.excluded && (
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Non inclus :</h4>
                            <p className="text-sm text-muted-foreground">{service.excluded}</p>
                          </div>
                        )}
                      </div>

                      {/* Duration & Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Clock size={16} />
                          {Math.floor(service.duration / 60)}h{service.duration % 60 > 0 ? `${service.duration % 60}min` : ''}
                        </div>
                        <span className="font-display text-xl font-bold text-primary">
                          {service.price}€
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(groupedServices).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun service trouvé.</p>
            </div>
          )}
        </div>
      </section>
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Beaute;