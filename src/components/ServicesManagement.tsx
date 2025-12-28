import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import ServicesList from './ServicesList';
import ServiceForm from './ServiceForm';
import { useServices } from '@/hooks/useServices';
import { useToast } from '@/hooks/use-toast';

interface ServicesManagementProps {
  initialAction?: 'add' | null;
}

const ServicesManagement = ({ initialAction }: ServicesManagementProps) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addService, updateService } = useServices();
  const { toast } = useToast();

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
          title: "Service modifié",
          description: "Le service a été modifié avec succès.",
        });
      } else {
        addService(serviceData);
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
    try {
      // deleteService est appelé dans ServicesList, mais on peut ajouter le toast ici
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
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des Services</h1>
      <ServicesList onEdit={handleEdit} onAdd={handleAdd} onDelete={handleDelete} />
      <ServiceForm
        service={editingService}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default ServicesManagement;