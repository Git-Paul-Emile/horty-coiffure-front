import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Plus, Search, Trash2, Power } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import ServiceForm from './ServiceForm';
import { useToast } from '@/hooks/use-toast';
import { useConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';

interface ServicesManagementProps {
  initialAction?: 'add' | null;
}

const ServicesManagement = ({ initialAction }: ServicesManagementProps) => {
  const { categories, addCategory, updateCategory, deleteCategory, toggleCategory } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [editingService, setEditingService] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const { confirmDelete, ConfirmDeleteDialog } = useConfirmDeleteDialog({
    title: 'Confirmer la suppression',
    description: 'Êtes-vous sûr de vouloir supprimer le service',
  });

  useEffect(() => {
    if (initialAction === 'add') {
      handleAdd();
    }
  }, [initialAction]);

  // Filtrer les services principaux (catégories sans parentId)
  const mainServices = categories.filter(c => !c.parentId);

  const filteredServices = mainServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: Category) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleSave = (data: { name: string; description: string; image: string }) => {
    try {
      if (editingService) {
        updateCategory(editingService.id, { ...data, status: editingService.status });
        toast({
          title: "Service modifié",
          description: "Le service a été modifié avec succès.",
        });
      } else {
        addCategory({ ...data, status: 'active' });
        toast({
          title: "Service ajouté",
          description: "Le nouveau service a été ajouté avec succès.",
        });
      }
      setIsFormOpen(false);
      setEditingService(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleDelete = (serviceId: string, serviceName: string) => {
    confirmDelete(serviceName, () => {
      try {
        deleteCategory(serviceId);
        toast({
          title: "Service supprimé",
          description: `Le service "${serviceName}" a été supprimé avec succès.`,
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression.",
          variant: "destructive",
        });
      }
    });
  };

  const handleToggle = (serviceId: string) => {
    try {
      toggleCategory(serviceId);
      toast({
        title: "Statut modifié",
        description: "Le statut du service a été modifié avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la modification du statut.",
        variant: "destructive",
      });
    }
  };

  const renderServiceCard = (service: Category) => (
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
        {service.description && (
          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(service)} className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleToggle(service.id)} className="flex-1">
              <Power className="h-4 w-4 mr-2" />
              {service.status === 'active' ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id, service.name)} className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des Services</h1>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Button onClick={handleAdd}>
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

        {filteredServices.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Aucun service trouvé.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map(renderServiceCard)}
          </div>
        )}
      </div>
      <ServiceForm
        service={editingService}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
      <ConfirmDeleteDialog />
    </div>
  );
};

export default ServicesManagement;