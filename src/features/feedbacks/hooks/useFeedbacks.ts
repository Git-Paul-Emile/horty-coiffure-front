import { useState, useEffect } from 'react';
import { Feedback } from '@/lib/types';

export const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('feedbacks');
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    } else {
      // Add sample feedback
      const sampleFeedbacks: Feedback[] = [
        {
          id: '1',
          rating: 5,
          comment: 'Excellent service ! Les coiffeuses sont très professionnelles et le résultat est toujours à la hauteur de mes attentes. Je recommande vivement ce salon.',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'read',
        },
        {
          id: '2',
          rating: 4,
          comment: 'Très satisfaite de ma coiffure. L\'accueil est chaleureux et l\'équipe est sympathique. Petit bémol sur le temps d\'attente, mais c\'est normal pour un salon de qualité.',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          status: 'unread',
        },
      ];
      setFeedbacks(sampleFeedbacks);
      localStorage.setItem('feedbacks', JSON.stringify(sampleFeedbacks));
    }
  }, []);

  const saveFeedbacks = (newFeedbacks: Feedback[]) => {
    setFeedbacks(newFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));
  };

  const addFeedback = (feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'status'>) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'unread',
    };
    const updated = [...feedbacks, newFeedback];
    saveFeedbacks(updated);
  };

  const updateFeedback = (id: string, feedbackData: Partial<Feedback>) => {
    const updated = feedbacks.map(feedback =>
      feedback.id === id ? { ...feedback, ...feedbackData } : feedback
    );
    saveFeedbacks(updated);
  };

  const deleteFeedback = (id: string) => {
    const updated = feedbacks.filter(feedback => feedback.id !== id);
    saveFeedbacks(updated);
  };

  const markAsRead = (id: string) => {
    updateFeedback(id, { status: 'read' });
  };

  const toggleReadStatus = (id: string) => {
    const feedback = feedbacks.find(f => f.id === id);
    if (feedback) {
      updateFeedback(id, { status: feedback.status === 'read' ? 'unread' : 'read' });
    }
  };

  const archiveFeedback = (id: string) => {
    updateFeedback(id, { status: 'archived' });
  };

  return {
    feedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    markAsRead,
    toggleReadStatus,
    archiveFeedback,
  };
};
