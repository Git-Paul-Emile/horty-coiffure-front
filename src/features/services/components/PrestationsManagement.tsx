import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import ServicesList from './ServicesList';
import PrestationForm from './PrestationForm';
import { useServices } from '@/features/services/hooks/useServices';
import { useToast } from '@/hooks/use-toast';
import { useConfirmDeleteDialog } from '@/hooks/useConfirmDeleteDialog';

interface PrestationsManagementProps {
  initialAction?: 'add' | null;
}

const PrestationsManagement = ({ initialAction }: PrestationsManagementProps) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addService, updateService, toggleService, deleteService } = useServices();
  const { toast } = useToast();
  const { confirmDelete, ConfirmDeleteDialog } = useConfirmDeleteDialog({
    title: 'Confirmer la suppression',
    description: 'Êtes-vous sûr de vouloir supprimer la prestation',
  });

  useEffect(() => {
    if (initialAction === 'add') {
      handleAdd();
    }
  }, [initialAction]);

  const handleAdd = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleSave = (serviceData: Omit<Service, 'id'>) => {
    try {
      if (editingService) {
        updateService(editingService.id, serviceData);
        toast({
          title: "Prestation modifiée",
          description: "La prestation a été modifiée avec succès.",
        });
      } else {
        addService(serviceData);
        toast({
          title: "Prestation ajoutée",
          description: "La nouvelle prestation a été ajoutée avec succès.",
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

  const handleToggle = (serviceId: string) => {
    try {
      toggleService(serviceId);
      toast({
        title: "Statut modifié",
        description: "Le statut de la prestation a été modifié avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la modification du statut.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (serviceId: string, serviceName: string) => {
    confirmDelete(serviceName, () => {
      try {
        deleteService(serviceId);
        toast({
          title: "Prestation supprimée",
          description: `La prestation "${serviceName}" a été supprimée avec succès.`,
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des Prestations</h1>
      <ServicesList
        onEdit={handleEdit}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onToggle={handleToggle}
        entitySingular="prestation"
        entityPlural="Prestations"
        entityDefiniteArticle="la"
        entityIndefiniteArticle="une"
      />
      <PrestationForm
        service={editingService}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
      <ConfirmDeleteDialog />
    </div>
  );
};

export default PrestationsManagement;
