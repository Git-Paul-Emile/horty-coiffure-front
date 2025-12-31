import { useState, useEffect } from 'react';
import { UsefulInfo } from '@/lib/types';

const defaultUsefulInfos: UsefulInfo[] = [
  {
    id: '1',
    title: 'Conseils pour vos cheveux',
    content: 'Découvrez nos conseils pour prendre soin de vos cheveux naturellement.',
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
];

export const useUsefulInfos = () => {
  const [usefulInfos, setUsefulInfos] = useState<UsefulInfo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('usefulInfos');
    if (stored) {
      setUsefulInfos(JSON.parse(stored));
    } else {
      localStorage.setItem('usefulInfos', JSON.stringify(defaultUsefulInfos));
      setUsefulInfos(defaultUsefulInfos);
    }
  }, []);

  const addUsefulInfo = (infoData: Omit<UsefulInfo, 'id'>) => {
    const newInfo: UsefulInfo = {
      ...infoData,
      id: Date.now().toString(),
    };
    const updated = [...usefulInfos, newInfo];
    setUsefulInfos(updated);
    localStorage.setItem('usefulInfos', JSON.stringify(updated));
  };

  const updateUsefulInfo = (id: string, infoData: Partial<UsefulInfo>) => {
    const updated = usefulInfos.map(info =>
      info.id === id ? { ...info, ...infoData } : info
    );
    setUsefulInfos(updated);
    localStorage.setItem('usefulInfos', JSON.stringify(updated));
  };

  const deleteUsefulInfo = (id: string) => {
    const updated = usefulInfos.filter(info => info.id !== id);
    setUsefulInfos(updated);
    localStorage.setItem('usefulInfos', JSON.stringify(updated));
  };

  return {
    usefulInfos,
    addUsefulInfo,
    updateUsefulInfo,
    deleteUsefulInfo,
  };
};
