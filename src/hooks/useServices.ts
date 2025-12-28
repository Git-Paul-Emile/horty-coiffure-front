import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Initialize with default services
    const defaultServices: Service[] = [
      // Services de coiffure
      {
        id: '1',
        name: 'Nattes Simples et Collées',
        description: 'Des nattes classiques réalisées avec soin pour un look naturel et élégant',
        category: 'Coiffure africaine',
        duration: 150,
        price: 45,
        included: 'Lavage, nattage, finition',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
      },
      {
        id: '2',
        name: 'Tresses de Toutes Tailles',
        description: 'Tresses africaines traditionnelles, disponibles en différentes tailles et styles',
        category: 'Tresses',
        duration: 300,
        price: 50,
        included: 'Lavage, tressage, finition',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-braids.jpg',
      },
      {
        id: '3',
        name: 'Twists Naturels',
        description: 'Twists naturels pour un style bohème et facile à entretenir',
        category: 'Tresses',
        duration: 150,
        price: 40,
        included: 'Lavage, réalisation des twists',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-twists.jpg',
      },
      {
        id: '4',
        name: 'Extensions avec ou sans Mèches',
        description: 'Ajoutez de la longueur et du volume avec nos extensions de qualité',
        category: 'Extensions',
        duration: 240,
        price: 60,
        included: 'Installation professionnelle, conseils d\'entretien',
        excluded: 'Produits personnels',
        status: 'active',
        image: '/gallery-extensions.jpg',
      },
      // Services de pédicure
      {
        id: '5',
        name: 'Traitement des Cors et Durillons',
        description: 'Élimination douce et professionnelle des cors et durillons pour des pieds sains et confortables',
        category: 'Pédicure',
        duration: 45,
        price: 25,
        included: 'Exfoliation, application de crèmes apaisantes',
        excluded: 'Produits spéciaux',
        status: 'active',
        image: '/pedicure.jpg',
      },
      {
        id: '6',
        name: 'Soins des Ongles Incarnés',
        description: 'Traitement spécialisé pour les ongles incarnés avec des techniques douces et efficaces',
        category: 'Pédicure',
        duration: 60,
        price: 40,
        included: 'Désincarcération, application d\'antiseptiques, bandage',
        excluded: 'Produits spéciaux',
        status: 'active',
        image: '/pedicure.jpg',
      },
      {
        id: '7',
        name: 'Hydratation Profonde',
        description: 'Soins intensifs d\'hydratation pour nourrir et revitaliser la peau de vos pieds',
        category: 'Pédicure',
        duration: 45,
        price: 30,
        included: 'Masque hydratant, massage relaxant',
        excluded: 'Produits spéciaux',
        status: 'active',
        image: '/pedicure.jpg',
      },
      {
        id: '8',
        name: 'Conseils Personnalisés',
        description: 'Accompagnement personnalisé pour le bien-être quotidien de vos pieds',
        category: 'Pédicure',
        duration: 30,
        price: 0,
        included: 'Évaluation, recommandations, prévention',
        excluded: 'Traitements médicaux',
        status: 'active',
        image: '/pedicure.jpg',
      },
    ];

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('services');
    if (stored) {
      const parsedServices: Service[] = JSON.parse(stored);
      // Add images to existing services if missing
      const updatedServices = parsedServices.map(service => ({
        ...service,
        image: service.image || getDefaultImage(service.category)
      }));
      setServices(updatedServices);
      // Update localStorage with images
      localStorage.setItem('services', JSON.stringify(updatedServices));
    } else {
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));
    }
  }, []);

  // Helper function to get default image based on category
  const getDefaultImage = (category: string): string => {
    if (category === 'Pédicure') return '/pedicure.jpg';
    if (category === 'Extensions') return '/gallery-extensions.jpg';
    if (category === 'Tresses') return '/gallery-twists.jpg';
    return '/gallery-braids.jpg'; // Default for other hair services
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

  return {
    services,
    addService,
    updateService,
    deleteService,
  };
};