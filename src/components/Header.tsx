import { useState, useEffect } from "react";
import { Menu, X, Phone, Instagram, Facebook, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "/produits", label: "Produits" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#fidelite", label: "Fidélité" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary">
              Horty
            </span>
            <span className="font-display text-2xl font-light text-foreground">
              Coiffure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.label === "Accueil") {
                return (
                  <Link
                    key={link.href}
                    to="/"
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              } else if (link.label === "Services") {
                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger asChild>
                      <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 relative group flex items-center gap-1">
                        {link.label}
                        <ChevronDown size={14} />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link to="/coiffure">Coiffures</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/pedicure">Pédicure et Manucure</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/beaute">Beauté</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              } else if (link.label === "Produits") {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={link.href}
                    to={`/#${link.href.substring(1)}`}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              }
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/hortycoiffure/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100064151135256"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
            <a href="tel:+32487126363">
              <Button variant="hero" size="default">
                <Phone size={16} />
                Appeler
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-y-auto overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? `max-h-[${isServicesOpen ? '500px' : '384px'}] opacity-100 mt-4` : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-card rounded-xl p-6 shadow-elevated space-y-4">
            {navLinks.map((link) => {
              if (link.label === "Accueil") {
                return (
                  <Link
                    key={link.href}
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                );
              } else if (link.label === "Services") {
                return (
                  <div key={link.href} className="space-y-2">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors py-2 w-full justify-between"
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isServicesOpen && (
                      <div className="space-y-2 pl-4">
                        <Link
                          to="/coiffure"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-foreground/80 hover:text-primary transition-colors py-2"
                        >
                          Coiffures
                        </Link>
                        <Link
                          to="/pedicure"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-foreground/80 hover:text-primary transition-colors py-2"
                        >
                          Pédicure et Manucure
                        </Link>
                        <Link
                          to="/beaute"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-foreground/80 hover:text-primary transition-colors py-2"
                        >
                          Beauté
                        </Link>
                      </div>
                    )}
                  </div>
                );
              } else if (link.label === "Produits") {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={link.href}
                    to={`/#${link.href.substring(1)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
            <div className="pt-4 border-t border-border">
              <a href="tel:+32487126363" className="block">
                <Button variant="hero" className="w-full">
                  <Phone size={16} />
                  Appeler
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
