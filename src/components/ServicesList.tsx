import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useServices } from '@/hooks/useServices';

interface ServicesListProps {
  onEdit: (service: Service) => void;
  onAdd: () => void;
}

const ServicesList = ({ onEdit, onAdd }: ServicesListProps) => {
  const { services, deleteService } = useServices();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services de Coiffure</h2>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucun service défini. Cliquez sur "Ajouter un service" pour commencer.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                    {service.status === 'active' ? 'Actif' : 'Désactivé'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Catégorie:</strong> {service.category}</p>
                  <p><strong>Durée:</strong> {service.duration} min</p>
                  <p><strong>Prix à partir de:</strong> {service.price}€</p>
                  <p><strong>Inclus:</strong> {service.included}</p>
                  <p><strong>Non inclus:</strong> {service.excluded}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => onEdit(service)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteService(service.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;