import { useState, useEffect } from 'react';
import { AdminSettings } from '@/lib/types';

const defaultSettings: AdminSettings = {
  openingHours: [
    { day: "Lundi", isClosed: true, openingTime: "09:00", closingTime: "18:00" },
    { day: "Mardi", isClosed: false, openingTime: "09:00", closingTime: "18:00" },
    { day: "Mercredi", isClosed: false, openingTime: "09:00", closingTime: "18:00" },
    { day: "Jeudi", isClosed: false, openingTime: "09:00", closingTime: "18:00" },
    { day: "Vendredi", isClosed: false, openingTime: "09:00", closingTime: "18:00" },
    { day: "Samedi", isClosed: false, openingTime: "09:00", closingTime: "17:00" },
    { day: "Dimanche", isClosed: true, openingTime: "09:00", closingTime: "18:00" },
  ],
  contactInfo: {
    address: "Rue de Tirlemont, 3300 Tirlemont",
    phone: "+32 487 12 63 63",
    email: "info@hortycoiffure.be",
  },
  adminCredentials: {
    email: "admin@hortycoiffure.be",
    password: "admin123", // Default password, should be changed
  },
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem('adminSettings');
    if (stored) {
      setSettings(JSON.parse(stored));
    } else {
      localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('adminSettings', JSON.stringify(updated));
  };

  const updateOpeningHours = (openingHours: AdminSettings['openingHours']) => {
    updateSettings({ openingHours });
  };

  const updateContactInfo = (contactInfo: Partial<AdminSettings['contactInfo']>) => {
    updateSettings({ contactInfo: { ...settings.contactInfo, ...contactInfo } });
  };

  const updateAdminCredentials = (adminCredentials: Partial<AdminSettings['adminCredentials']>) => {
    updateSettings({ adminCredentials: { ...settings.adminCredentials, ...adminCredentials } });
  };

  return {
    settings,
    updateSettings,
    updateOpeningHours,
    updateContactInfo,
    updateAdminCredentials,
  };
};