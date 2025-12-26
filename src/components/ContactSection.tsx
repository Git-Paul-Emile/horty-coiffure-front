import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Leuvensestraat 55, 3300 Tienen",
    href: "https://maps.google.com/?q=Leuvensestraat+55,+3300+Tienen,+Belgium",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+32 487 12 63 63",
    href: "tel:+32487126363",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@hortycoiffure.be",
    href: "mailto:info@hortycoiffure.be",
  },
];

const hours = [
  { day: "Lundi", hours: "Fermé" },
  { day: "Mardi - Vendredi", hours: "9h00 - 18h00" },
  { day: "Samedi", hours: "9h00 - 17h00" },
  { day: "Dimanche", hours: "Fermé" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message envoyé !", {
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Prenez rendez-vous
          </h2>
          <p className="text-lg text-muted-foreground">
            Contactez-nous pour réserver votre créneau ou pour toute question.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card variant="elevated" className="animate-slide-in-left">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Envoyez-nous un message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <Input
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      placeholder="+32 XXX XX XX XX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Décrivez votre demande..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>

              {/* Quick Contact */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Ou contactez-nous directement :
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+32487126363">
                    <Button variant="soft" size="sm">
                      <Phone size={16} />
                      Appeler
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/32487126363"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="soft" size="sm">
                      <MessageCircle size={16} />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Info Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <Card variant="interactive" className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {info.label}
                        </p>
                        <p className="font-medium text-foreground">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            {/* Opening Hours */}
            <Card variant="soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} className="text-primary" />
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-3">
                  {hours.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-foreground">{item.day}</span>
                      <span
                        className={`font-medium ${
                          item.hours === "Fermé"
                            ? "text-muted-foreground"
                            : "text-primary"
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card variant="glass">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Suivez-nous
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/hortycoiffure/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors flex-1"
                  >
                    <Instagram size={24} className="text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Instagram</p>
                      <p className="text-sm text-muted-foreground">
                        @hortycoiffure
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100064151135256"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors flex-1"
                  >
                    <Facebook size={24} className="text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Facebook</p>
                      <p className="text-sm text-muted-foreground">
                        Horty Coiffure
                      </p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card variant="elevated" className="overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2512.8635899611!2d4.932!3d50.805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c160d0d0d0d0d0%3A0x0!2sLeuvensestraat%2055%2C%203300%20Tienen!5e0!3m2!1sen!2sbe!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Horty Coiffure"
                className="w-full"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
