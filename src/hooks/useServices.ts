import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Initialize with services matching the hierarchical structure
    const defaultServices: Service[] = [
      // Coiffure - Africaine
      {
        id: '1',
        name: 'Nattes',
        description: 'Nattes africaines réalisées avec soin',
        category: 'africaine',
        duration: 150,
        price: 45,
        included: 'Lavage, nattage, finition',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['simples', 'complexes'],
      },
      {
        id: '2',
        name: 'Tresses',
        description: 'Tresses africaines traditionnelles',
        category: 'africaine',
        duration: 300,
        price: 50,
        included: 'Lavage, tressage, finition',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['traditionnelles', 'modernes'],
      },
      {
        id: '3',
        name: 'Extensions',
        description: 'Extensions de cheveux naturelles ou synthétiques',
        category: 'africaine',
        duration: 240,
        price: 60,
        included: 'Installation professionnelle, conseils d\'entretien',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-extensions.jpg',
        variants: ['naturelles', 'synthétiques'],
      },

      // Coiffure - Européenne
      {
        id: '4',
        name: 'Coupes',
        description: 'Coupes de cheveux européennes',
        category: 'europeenne',
        duration: 60,
        price: 35,
        included: 'Coupe, brushing',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['courtes', 'longues', 'dégradées'],
      },
      {
        id: '5',
        name: 'Brushings',
        description: 'Brushings professionnels',
        category: 'europeenne',
        duration: 45,
        price: 25,
        included: 'Brushing, finition',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['lisses', 'bouclés'],
      },
      {
        id: '6',
        name: 'Balayages',
        description: 'Techniques de balayage',
        category: 'europeenne',
        duration: 180,
        price: 80,
        included: 'Balayage, soin colorant',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['subtils', 'intenses'],
      },
      {
        id: '7',
        name: 'Colorations',
        description: 'Colorations capillaires',
        category: 'europeenne',
        duration: 120,
        price: 70,
        included: 'Coloration, soin après-coloration',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['permanentes', 'semi-permanentes', 'mèches'],
      },

      // Coiffure - Événementiel
      {
        id: '8',
        name: 'Coiffures de mariage personnalisées',
        description: 'Coiffures élégantes et personnalisées pour mariages',
        category: 'evenementiel',
        duration: 90,
        price: 65,
        included: 'Coiffure, accessoires',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['élégante', 'bohème'],
      },

      // Beauté - Regard
      {
        id: '11',
        name: 'Pose de faux cils',
        description: 'Pose professionnelle de faux cils pour un regard intense',
        category: 'regard',
        duration: 90,
        price: 50,
        included: 'Extension, soin',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
        variants: ['naturelles', 'colorées'],
      },

      // Pédicure et Manucure - Pédicure
      {
        id: '13',
        name: 'Pédicure médicale',
        description: 'Traitement durillons, cors, ongles incarnés, mycoses + massage relaxant',
        category: 'pedicure',
        duration: 60,
        price: 40,
        included: 'Traitement médical, massage des pieds',
        excluded: 'Produits spéciaux',
        status: 'active',
        image: '/pedicure.jpg',
        variants: [],
      },
      {
        id: '14',
        name: 'Pédicure simple',
        description: 'Soin esthétique classique',
        category: 'pedicure',
        duration: 45,
        price: 25,
        included: 'Soin basique, vernis',
        excluded: 'Produits spéciaux',
        status: 'active',
        image: '/pedicure.jpg',
        variants: [],
      },

      // Pédicure et Manucure - Manucure
      {
        id: '15',
        name: 'Pose de vernis semi-permanent',
        description: 'Pose de vernis semi-permanent professionnel',
        category: 'manucure',
        duration: 45,
        price: 20,
        included: 'Pose, séchage UV',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/pedicure.jpg',
        variants: [],
      },
    ];

    // Always use defaults to ensure services are available
    setServices(defaultServices);
    localStorage.setItem('services', JSON.stringify(defaultServices));
  }, []);

  // Helper function to get default image based on category
  const getDefaultImage = (category: string): string => {
    if (category === 'pedicure' || category === 'manucure') return '/pedicure.jpg';
    if (category === 'africaine' || category === 'europeenne' || category === 'evenementiel' || category === 'regard') return '/gallery-braids.jpg';
    return '/gallery-braids.jpg'; // Default
  };

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

  const toggleService = (id: string) => {
    const updated = services.map(service =>
      service.id === id ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' } : service
    );
    saveServices(updated);
  };

  return {
    services,
    addService,
    updateService,
    deleteService,
    toggleService,
  };
};