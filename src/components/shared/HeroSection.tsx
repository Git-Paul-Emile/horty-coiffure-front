import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useAppointments } from '@/features/appointments/hooks/useAppointments';
import { useAdminSettings } from '@/hooks/useAdminSettings';

declare global {
  interface Calendly {
    initPopupWidget(options: { url: string; [key: string]: unknown }): void;
  }
  interface Window {
    Calendly: Calendly;
  }
}

const HeroSection = () => {
  const { settings } = useAppointments();
  const { settings: adminSettings } = useAdminSettings();
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Star size={16} className="fill-primary" />
              {adminSettings.heroSettings?.badge || "Plus de 30 ans d'expérience"}
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {adminSettings.heroSettings?.title ? (
                adminSettings.heroSettings.title
              ) : (
                <>
                  L'art de la <span className="text-primary">coiffure</span> africaine à Tirlemont
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {adminSettings.heroSettings?.subtitle || "Vous cherchez une coiffure africaine ou européenne réalisée par une professionnelle expérimentée ? Découvrez notre savoir-faire unique en nattes, tresses, twists, extensions et autres techniques de coiffure."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {settings.urgencyMode ? (
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-muted-foreground font-medium">{settings.urgencyMessage}</p>
                </div>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => {
                    if (window.Calendly) {
                      window.Calendly.initPopupWidget({
                        url: settings.calendlyUrl,
                      });
                    }
                  }}
                >
                  <Calendar size={20} />
                  Prendre rendez-vous
                </Button>
              )}
              <a href="#services">
                <Button variant="heroOutline" size="lg">
                  Découvrir nos services
                  <ArrowRight size={20} />
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-card flex items-center justify-center"
                    >
                      <span className="text-xs font-medium text-primary">
                        {["A", "M", "S", "L"][i - 1]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">500+</span>
                  <span className="text-muted-foreground"> clientes satisfaites</span>
                </div>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  4.9/5 sur Google
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={adminSettings.heroSettings?.image || heroImage}
                  alt="Coiffure africaine professionnelle chez Horty Coiffure"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-elevated animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Star size={28} className="text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-foreground">30+</p>
                    <p className="text-sm text-muted-foreground">Années d'expertise</p>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/30 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
