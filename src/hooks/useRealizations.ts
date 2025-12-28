import { useState, useEffect } from 'react';
import { Realization } from '@/lib/types';

export const useRealizations = () => {
  const [realizations, setRealizations] = useState<Realization[]>([]);

  useEffect(() => {
    // Initialize with default realizations
    const defaultRealizations: Realization[] = [
      {
        id: '1',
        image: '/gallery-braids.jpg',
        serviceId: '1', // Nattes Simples et Collées
        caption: 'Nattes simples et collées réalisées avec soin pour un look naturel.',
        title: 'Nattes Classiques',
      },
      {
        id: '2',
        image: '/gallery-twists.jpg',
        serviceId: '3', // Twists Naturels
        caption: 'Twists naturels pour un style bohème et facile à entretenir.',
        title: 'Twists Bohèmes',
      },
      {
        id: '3',
        image: '/gallery-extensions.jpg',
        serviceId: '4', // Extensions
        caption: 'Extensions de qualité pour ajouter longueur et volume.',
        title: 'Extensions Volumineuses',
      },
    ];

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('realizations');
    if (stored) {
      setRealizations(JSON.parse(stored));
    } else {
      setRealizations(defaultRealizations);
      localStorage.setItem('realizations', JSON.stringify(defaultRealizations));
    }
  }, []);

  const saveRealizations = (newRealizations: Realization[]) => {
    setRealizations(newRealizations);
    localStorage.setItem('realizations', JSON.stringify(newRealizations));
  };

  const addRealization = (realizationData: Omit<Realization, 'id'>) => {
    const newRealization: Realization = {
      ...realizationData,
      id: Date.now().toString(),
    };
    const updated = [...realizations, newRealization];
    saveRealizations(updated);
  };

  const updateRealization = (id: string, realizationData: Omit<Realization, 'id'>) => {
    const updated = realizations.map(realization =>
      realization.id === id ? { ...realizationData, id } : realization
    );
    saveRealizations(updated);
  };

  const deleteRealization = (id: string) => {
    const updated = realizations.filter(realization => realization.id !== id);
    saveRealizations(updated);
  };

  return {
    realizations,
    addRealization,
    updateRealization,
    deleteRealization,
  };
};