import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Star, Quote, Plus } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useServices } from "@/hooks/useServices";
import StarRating from "./StarRating";

const TestimonialsSection = () => {
  const { testimonials, addTestimonial } = useTestimonials();
  const { services } = useServices();
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    service: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial({ ...formData, status: 'pending' });
    setFormData({ name: '', text: '', rating: 5, service: '' });
    setIsDialogOpen(false);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

        {/* Add Testimonial Button */}
        <div className="text-center mt-12">
          <Button onClick={() => setIsDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un témoignage
          </Button>
        </div>

        {/* Add Testimonial Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter un témoignage</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Votre nom</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="text">Votre témoignage</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => handleChange('text', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Note</Label>
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={(rating) => handleChange('rating', rating)}
                  />
                </div>
                <div>
                  <Label htmlFor="service">Service reçu</Label>
                  <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Soumettre
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TestimonialsSection;
