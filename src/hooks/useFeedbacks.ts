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
      setFeedbacks([]);
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

  return {
    feedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    markAsRead,
  };
};