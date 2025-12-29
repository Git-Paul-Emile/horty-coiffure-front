import { useState, useEffect } from 'react';
import { News } from '@/lib/types';

const defaultNews: News[] = [
  {
    id: '1',
    title: 'Nouveau service de pédicure disponible',
    content: 'Découvrez notre nouveau service de pédicure professionnelle avec des soins complets pour vos pieds.',
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
];

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('news');
    if (stored) {
      setNews(JSON.parse(stored));
    } else {
      localStorage.setItem('news', JSON.stringify(defaultNews));
      setNews(defaultNews);
    }
  }, []);

  const addNews = (newsData: Omit<News, 'id'>) => {
    const newNews: News = {
      ...newsData,
      id: Date.now().toString(),
    };
    const updated = [...news, newNews];
    setNews(updated);
    localStorage.setItem('news', JSON.stringify(updated));
  };

  const updateNews = (id: string, newsData: Partial<News>) => {
    const updated = news.map(item =>
      item.id === id ? { ...item, ...newsData } : item
    );
    setNews(updated);
    localStorage.setItem('news', JSON.stringify(updated));
  };

  const deleteNews = (id: string) => {
    const updated = news.filter(item => item.id !== id);
    setNews(updated);
    localStorage.setItem('news', JSON.stringify(updated));
  };

  return {
    news,
    addNews,
    updateNews,
    deleteNews,
  };
};