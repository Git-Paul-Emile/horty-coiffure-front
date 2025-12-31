import { useState, useEffect } from 'react';
import { Testimonial } from '@/lib/types';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Initialize with default testimonials
    const defaultTestimonials: Testimonial[] = [
      {
        id: '1',
        name: 'Aminata S.',
        text: 'Un savoir-faire exceptionnel ! Mes nattes tiennent parfaitement et le résultat est magnifique. Je recommande vivement Horty Coiffure.',
        rating: 5,
        service: 'Nattes collées',
        status: 'approved',
      },
      {
        id: '2',
        name: 'Marie L.',
        text: 'La pédicure médicale m\'a vraiment soulagée. Professionnalisme et douceur, je reviens tous les mois avec confiance.',
        rating: 5,
        service: 'Pédicure médicale',
        status: 'approved',
      },
      {
        id: '3',
        name: 'Sophie K.',
        text: '30 ans d\'expérience, ça se ressent ! Les twists sont parfaits et durent longtemps. Merci pour votre patience et votre expertise.',
        rating: 5,
        service: 'Twists',
        status: 'approved',
      },
    ];

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('testimonials');
    if (stored) {
      setTestimonials(JSON.parse(stored));
    } else {
      setTestimonials(defaultTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials));
    }
  }, []);

  const saveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(newTestimonials));
  };

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: Date.now().toString(),
    };
    const updated = [...testimonials, newTestimonial];
    saveTestimonials(updated);
  };

  const updateTestimonial = (id: string, testimonialData: Omit<Testimonial, 'id'>) => {
    const updated = testimonials.map(testimonial =>
      testimonial.id === id ? { ...testimonialData, id } : testimonial
    );
    saveTestimonials(updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(testimonial => testimonial.id !== id);
    saveTestimonials(updated);
  };

  return {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};
