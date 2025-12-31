import { useState, useEffect } from 'react';
import { Testimonial } from '@/lib/types';
import TestimonialsList from './TestimonialsList';
import TestimonialForm from './TestimonialForm';
import { useTestimonials } from '@/features/testimonials/hooks/useTestimonials';
import { useToast } from '@/hooks/use-toast';

interface TestimonialsManagementProps {
  initialAction?: 'add' | null;
}

const TestimonialsManagement = ({ initialAction }: TestimonialsManagementProps) => {
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addTestimonial, updateTestimonial } = useTestimonials();
  const { toast } = useToast();

  useEffect(() => {
    if (initialAction === 'add') {
      handleAdd();
    }
  }, [initialAction]);

  const handleAdd = () => {
    setEditingTestimonial(null);
    setIsFormOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleSave = (testimonialData: Omit<Testimonial, 'id'>) => {
    try {
      if (editingTestimonial) {
        updateTestimonial(editingTestimonial.id, testimonialData);
        toast({
          title: "Témoignage modifié",
          description: "Le témoignage a été modifié avec succès.",
        });
      } else {
        addTestimonial(testimonialData);
        toast({
          title: "Témoignage ajouté",
          description: "Le nouveau témoignage a été ajouté avec succès.",
        });
      }
      setIsFormOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingTestimonial(null);
  };

  const handleDelete = (testimonialId: string, testimonialName: string) => {
    try {
      toast({
        title: "Témoignage supprimé",
        description: `Le témoignage de "${testimonialName}" a été supprimé avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des Témoignages</h1>
      <TestimonialsList onEdit={handleEdit} onAdd={handleAdd} onDelete={handleDelete} />
      <TestimonialForm
        testimonial={editingTestimonial}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default TestimonialsManagement;
