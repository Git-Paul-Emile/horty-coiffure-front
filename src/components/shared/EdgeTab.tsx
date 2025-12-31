import { ChevronLeft, User, Car, Coffee } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const EdgeTab = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-l-md shadow-lg cursor-pointer z-40 hover:bg-primary/80 transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Informations Utiles</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Notre salon est entièrement<strong> accessible aux personnes à mobilité réduite.</strong>
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Car className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              <strong>Stationnement facile :</strong> dans les environs.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Coffee className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              <strong>Offre d'un café ou de l'eau :</strong> Profitez d'une boisson chaude ou fraîche pendant vos soins pour une expérience relaxante.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EdgeTab;
