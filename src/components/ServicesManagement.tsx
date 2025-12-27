import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import ServicesList from './ServicesList';
import ServiceForm from './ServiceForm';
import { useServices } from '@/hooks/useServices';

interface ServicesManagementProps {
  initialAction?: 'add' | null;
}

const ServicesManagement = ({ initialAction }: ServicesManagementProps) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addService, updateService } = useServices();

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
    if (editingService) {
      updateService(editingService.id, serviceData);
    } else {
      addService(serviceData);
    }
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  return (
    <div>
      <ServicesList onEdit={handleEdit} onAdd={handleAdd} />
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