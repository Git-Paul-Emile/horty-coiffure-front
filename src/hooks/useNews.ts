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
  {
    id: '2',
    title: 'Nouvelles coiffures tressées pour 2026',
    content: 'Découvrez les dernières tendances en coiffures tressées pour 2026. Des styles modernes et élégants pour toutes les occasions.',
    image: '/gallery-braids.jpg',
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 jour avant
    status: 'published',
  },
];

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('news');
    let newsData: News[];
    if (stored) {
      newsData = JSON.parse(stored);
      // Si les données stockées ont moins d'éléments que les defaults, mettre à jour avec defaults
      if (newsData.length < defaultNews.length) {
        newsData = defaultNews;
        localStorage.setItem('news', JSON.stringify(newsData));
      }
    } else {
      newsData = defaultNews;
      localStorage.setItem('news', JSON.stringify(newsData));
    }
    setNews(newsData);
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