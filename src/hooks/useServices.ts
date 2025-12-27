import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('services');
    if (stored) {
      setServices(JSON.parse(stored));
    }
  }, []);

  const saveServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem('services', JSON.stringify(newServices));
  };

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString(),
    };
    const updated = [...services, newService];
    saveServices(updated);
  };

  const updateService = (id: string, serviceData: Omit<Service, 'id'>) => {
    const updated = services.map(service =>
      service.id === id ? { ...serviceData, id } : service
    );
    saveServices(updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter(service => service.id !== id);
    saveServices(updated);
  };

  return {
    services,
    addService,
    updateService,
    deleteService,
  };
};