import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StarRating from "@/components/StarRating";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFeedbacks } from "@/hooks/useFeedbacks";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const { addFeedback } = useFeedbacks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addFeedback({
        rating,
        comment,
      });
      toast({
        title: "Merci pour votre avis !",
        description: "Votre feedback a été envoyé avec succès.",
      });
      // Reset form
      setRating(0);
      setComment("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi du feedback.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="overflow-x-hidden">
      <Header />

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Feedback
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Partagez Votre Avis
            </h1>
            <p className="text-lg text-muted-foreground">
              Votre opinion compte pour nous. Aidez-nous à améliorer nos services en partageant votre expérience.
            </p>
          </div>

          {/* Feedback Form */}
          <div className="max-w-2xl mx-auto">
            <Card variant="elevated" className="animate-fade-in-up animation-delay-200">
              <CardHeader>
                <CardTitle className="text-center">Feedback</CardTitle>
                <p className="text-center text-muted-foreground text-sm">
                  Partagez votre avis en toute confidentialité. Aucun renseignement personnel n'est requis.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Note *</Label>
                    <StarRating rating={rating} onRatingChange={setRating} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Commentaire *</Label>
                    <Textarea
                      id="comment"
                      placeholder="Partagez votre expérience avec nous..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Envoyer le Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
};

export default Feedback;