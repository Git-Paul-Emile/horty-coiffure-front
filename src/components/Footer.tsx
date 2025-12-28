import { Phone, Mail, MapPin, Instagram, Facebook, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-bold text-primary">
                Horty
              </span>
              <span className="font-display text-2xl font-light">
                Coiffure
              </span>
            </div>
            <p className="text-background/70 leading-relaxed mb-6 max-w-md">
              Plus de 30 ans d'expertise en coiffure africaine et pédicure 
              médicale. Votre beauté, notre passion.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/hortycoiffure/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100064151135256"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#accueil", label: "Accueil" },
                { href: "#services", label: "Services" },
                { href: "/produits", label: "Produits" },
                { href: "#realisations", label: "Réalisations" },
                { href: "#fidelite", label: "Fidélité" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-background/70">
                  Leuvensestraat 55
                  <br />
                  3300 Tienen, Belgique
                </span>
              </li>
              <li>
                <a
                  href="tel:+32487126363"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone size={18} className="text-primary" />
                  +32 487 12 63 63
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hortycoiffure.be"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail size={18} className="text-primary" />
                  info@hortycoiffure.be
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} Horty Coiffure. Tous droits réservés.
            </p>
            <p className="text-background/50 text-sm flex items-center gap-1">
              Fait par Paul Emile
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
