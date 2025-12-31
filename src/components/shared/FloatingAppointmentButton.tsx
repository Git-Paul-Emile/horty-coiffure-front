import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppointments } from '@/features/appointments/hooks/useAppointments';

declare global {
  interface Calendly {
    initPopupWidget(options: { url: string; [key: string]: unknown }): void;
  }
  interface Window {
    Calendly: Calendly;
  }
}

const FloatingAppointmentButton = () => {
  const { settings } = useAppointments();
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Tooltip open={tooltipOpen}>
      <TooltipTrigger asChild>
        <Button
          className="fixed bottom-20 right-8 z-50 p-3 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 animate-vibrate hover:animate-none"
          size="icon"
          onMouseEnter={() => setTooltipOpen(false)}
          onMouseLeave={() => setTooltipOpen(true)}
          onClick={() => {
            if (window.Calendly) {
              window.Calendly.initPopupWidget({
                url: settings.calendlyUrl,
              });
            }
          }}
          aria-label="Prendre rendez-vous"
        >
          <Calendar size={20} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Prendre rendez-vous</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FloatingAppointmentButton;
