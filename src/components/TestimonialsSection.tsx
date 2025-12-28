import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const { testimonials } = useTestimonials();
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Témoignages
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ce que disent nos clientes
          </h2>
          <p className="text-lg text-muted-foreground">
            La satisfaction de nos clientes est notre plus belle récompense.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {approvedTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              variant="glass"
              className={`relative animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary/20">
                  <Quote size={40} />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="font-display text-lg font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
