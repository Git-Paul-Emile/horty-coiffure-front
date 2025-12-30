import { useState, useEffect } from 'react';
import { Partner } from '@/lib/types';

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    // Initialize with default partners
    const defaultPartners: Partner[] = [
      {
        id: '1',
        name: 'Babor®',
        description: 'Marque premium de soins capillaires et de beauté',
        logo: '/placeholder.svg',
        website: 'https://www.babor.com',
        status: 'active',
      },
      {
        id: '2',
        name: 'Naturel Bio',
        description: 'Produits naturels et biologiques pour les soins quotidiens',
        logo: '/placeholder.svg',
        website: '#',
        status: 'active',
      },
    ];

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('partners');
    if (stored) {
      setPartners(JSON.parse(stored));
    } else {
      setPartners(defaultPartners);
      localStorage.setItem('partners', JSON.stringify(defaultPartners));
    }
  }, []);

  const savePartners = (newPartners: Partner[]) => {
    setPartners(newPartners);
    localStorage.setItem('partners', JSON.stringify(newPartners));
  };

  const addPartner = (partnerData: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...partnerData,
      id: Date.now().toString(),
    };
    const updated = [...partners, newPartner];
    savePartners(updated);
  };

  const updatePartner = (id: string, partnerData: Omit<Partner, 'id'>) => {
    const updated = partners.map(partner =>
      partner.id === id ? { ...partnerData, id } : partner
    );
    savePartners(updated);
  };

  const deletePartner = (id: string) => {
    const updated = partners.filter(partner => partner.id !== id);
    savePartners(updated);
  };

  const togglePartnerStatus = (id: string) => {
    const updated = partners.map(partner =>
      partner.id === id ? { ...partner, status: partner.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' } : partner
    );
    savePartners(updated);
  };

  return {
    partners,
    addPartner,
    updatePartner,
    deletePartner,
    togglePartnerStatus,
  };
};