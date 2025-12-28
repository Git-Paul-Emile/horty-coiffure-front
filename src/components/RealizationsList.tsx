import { useState } from 'react';
import { Realization } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus, Search, Image } from 'lucide-react';
import { useRealizations } from '@/hooks/useRealizations';
import { useServices } from '@/hooks/useServices';

interface RealizationsListProps {
  onEdit: (realization: Realization) => void;
  onAdd: () => void;
  onDelete?: (realizationId: string, realizationTitle: string) => void;
}

const RealizationsList = ({ onEdit, onAdd, onDelete }: RealizationsListProps) => {
  const { realizations, deleteRealization } = useRealizations();
  const { services } = useServices();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les réalisations selon la recherche
  const filteredRealizations = realizations.filter(realization => {
    const service = services.find(s => s.id === realization.serviceId);
    const matchesSearch = realization.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         realization.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service?.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Grouper les réalisations filtrées par service
  const groupedRealizations = filteredRealizations.reduce((acc, realization) => {
    const service = services.find(s => s.id === realization.serviceId);
    const serviceName = service?.name || 'Service inconnu';
    if (!acc[serviceName]) {
      acc[serviceName] = [];
    }
    acc[serviceName].push(realization);
    return acc;
  }, {} as Record<string, Realization[]>);

  const renderRealizationCard = (realization: Realization) => {
    const service = services.find(s => s.id === realization.serviceId);

    return (
      <Card key={realization.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={realization.image}
            alt={realization.title || 'Réalisation'}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            onError={(e) => {
              console.error(`Failed to load image: ${realization.image}`);
              e.currentTarget.style.display = 'none';
            }}
          />
          {!realization.image && (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">{realization.title || 'Sans titre'}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{service?.name || 'Service inconnu'}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm mb-4">{realization.caption}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(realization)} className="flex-1" aria-label={`Modifier la réalisation ${realization.title}`}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1" aria-label={`Supprimer la réalisation ${realization.title}`}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer la réalisation "{realization.title || 'Sans titre'}" ? Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteRealization(realization.id);
                      onDelete?.(realization.id, realization.title || 'Sans titre');
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button onClick={onAdd} aria-label="Ajouter une nouvelle réalisation">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une réalisation
        </Button>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une réalisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      {Object.keys(groupedRealizations).length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucune réalisation trouvée.
            </p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(groupedRealizations).map(([serviceName, serviceRealizations]) => (
          <div key={serviceName} className="space-y-4">
            <h3 className="text-xl font-semibold">{serviceName}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {serviceRealizations.map(renderRealizationCard)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RealizationsList;