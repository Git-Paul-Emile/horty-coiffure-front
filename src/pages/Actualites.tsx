import Header from "@/layout/Header";
import ContactSection from "@/components/shared/ContactSection";
import Footer from "@/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useNews } from "@/features/news/hooks/useNews";
import { Calendar } from "lucide-react";

const Actualites = () => {
  const { news } = useNews();

  // Filter and sort published news by publishedAt descending
  const publishedNews = news
    .filter(item => item.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <main className="overflow-x-hidden">
      <Header />

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Actualités
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Restez Informés de Nos Nouvelles
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez les dernières nouvelles, promotions et événements de Horty Coiffure.
            </p>
          </div>

          {/* News Feed */}
          {publishedNews.length > 0 ? (
            <div className="max-w-5xl mx-auto space-y-8">
              {publishedNews.map((item, index) => (
                <Card
                  key={item.id}
                  variant="elevated"
                  className={`overflow-hidden group animate-fade-in-up animation-delay-${(index + 1) * 100} hover:shadow-xl transition-all duration-500`}
                >
                  <CardContent className="p-0">
                    <div className="md:flex">
                      {/* Image */}
                      {item.image && (
                        <div className="md:w-1/3 relative h-32 md:h-40 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                              Actualité
                            </div>
                          </div>
                        </div>
                      )}

                      <div className={`p-4 md:p-6 ${item.image ? 'md:w-2/3' : 'w-full'}`}>
                        {/* Date */}
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <Calendar size={14} />
                          {new Date(item.publishedAt).toLocaleString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>

                        {/* Content */}
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                          {item.content}
                        </p>

                        {/* Read More */}
                        <div className="pt-4 border-t border-border">
                          <button className="text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-300 flex items-center gap-2 group/btn">
                            Lire la suite
                            <svg
                              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune actualité disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
};

export default Actualites;
