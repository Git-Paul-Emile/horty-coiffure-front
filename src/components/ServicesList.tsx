import { useState } from 'react';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { useServices } from '@/hooks/useServices';

interface ServicesListProps {
  onEdit: (service: Service) => void;
  onAdd: () => void;
  onDelete?: (serviceId: string, serviceName: string) => void;
}

const ServicesList = ({ onEdit, onAdd, onDelete }: ServicesListProps) => {
  const { services, deleteService } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Filtrer les services selon la recherche et le statut
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Grouper les services filtrés par section
  const coiffureServices = filteredServices.filter(service =>
    ['Coiffure africaine', 'Tresses', 'Extensions', 'Coupe classique', 'Couleur'].includes(service.category)
  );
  const pedicureServices = filteredServices.filter(service => service.category === 'Pédicure');

  const renderServiceCard = (service: Service) => (
    <Card key={service.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
      {service.image && (
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            onError={(e) => {
              console.error(`Failed to load image: ${service.image}`);
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
              {service.status === 'active' ? 'Actif' : 'Désactivé'}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
          {!service.image && (
            <Badge variant={service.status === 'active' ? 'default' : 'secondary'} className="ml-2">
              {service.status === 'active' ? 'Actif' : 'Désactivé'}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Durée:</span>
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Prix:</span>
            <span>{service.price}€</span>
          </div>
          <div className="col-span-2">
            <span className="font-medium">Inclus:</span>
            <p className="text-xs text-muted-foreground mt-1">{service.included}</p>
          </div>
          {service.excluded && (
            <div className="col-span-2">
              <span className="font-medium">Non inclus:</span>
              <p className="text-xs text-muted-foreground mt-1">{service.excluded}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(service)} className="flex-1" aria-label={`Modifier le service ${service.name}`}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1" aria-label={`Supprimer le service ${service.name}`}>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer le service "{service.name}" ? Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteService(service.id);
                    onDelete?.(service.id, service.name);
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button onClick={onAdd} aria-label="Ajouter un nouveau service">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un service
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Désactivé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="coiffure" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="coiffure">Coiffure</TabsTrigger>
          <TabsTrigger value="pedicure">Pédicure</TabsTrigger>
        </TabsList>
        <TabsContent value="coiffure" className="space-y-4 mt-6">
          {coiffureServices.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Aucun service de coiffure défini.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {coiffureServices.map(renderServiceCard)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="pedicure" className="space-y-4 mt-6">
          {pedicureServices.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Aucun service de pédicure défini.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pedicureServices.map(renderServiceCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesList;