import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import galleryBraids from "@/assets/gallery-braids.jpg";
import galleryTwists from "@/assets/gallery-twists.jpg";
import galleryExtensions from "@/assets/gallery-extensions.jpg";
import heroImage from "@/assets/hero-image.jpg";

const categories = ["Toutes", "Nattes", "Tresses", "Twists", "Extensions"];

const galleryImages = [
  {
    src: galleryBraids,
    alt: "Nattes africaines traditionnelles",
    category: "Nattes",
  },
  {
    src: galleryTwists,
    alt: "Twists élégants",
    category: "Twists",
  },
  {
    src: galleryExtensions,
    alt: "Extensions tressées",
    category: "Extensions",
  },
  {
    src: heroImage,
    alt: "Coiffure sophistiquée",
    category: "Tresses",
  },
];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const filteredImages =
    activeCategory === "Toutes"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "soft"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              } animate-scale-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  index === 0 ? "h-full min-h-[400px]" : "h-48 md:h-64"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/hortycoiffure/"
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
