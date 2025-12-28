import { useState, useEffect } from 'react';
import { AppointmentSettings } from '@/lib/types';

const defaultSettings: AppointmentSettings = {
  calendlyUrl: import.meta.env.VITE_CALENDLY_WIDGET_URL || '',
  urgencyMode: false,
  urgencyMessage: 'Le salon est actuellement complet. Veuillez réessayer plus tard.',
};

export const useAppointments = () => {
  const [settings, setSettings] = useState<AppointmentSettings>(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem('appointmentSettings');
    if (stored) {
      setSettings(JSON.parse(stored));
    } else {
      localStorage.setItem('appointmentSettings', JSON.stringify(defaultSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppointmentSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('appointmentSettings', JSON.stringify(updated));
  };

  return {
    settings,
    updateSettings,
  };
};