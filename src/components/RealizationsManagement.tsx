import { useState, useEffect } from 'react';
import { Realization } from '@/lib/types';
import RealizationsList from './RealizationsList.tsx';
import RealizationForm from './RealizationForm.tsx';
import { useRealizations } from '@/hooks/useRealizations';
import { useToast } from '@/hooks/use-toast';

interface RealizationsManagementProps {
  initialAction?: 'add' | null;
}

const RealizationsManagement = ({ initialAction }: RealizationsManagementProps) => {
  const [editingRealization, setEditingRealization] = useState<Realization | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addRealization, updateRealization } = useRealizations();
  const { toast } = useToast();

  useEffect(() => {
    if (initialAction === 'add') {
      handleAdd();
    }
  }, [initialAction]);

  const handleAdd = () => {
    setEditingRealization(null);
    setIsFormOpen(true);
  };

  const handleEdit = (realization: Realization) => {
    setEditingRealization(realization);
    setIsFormOpen(true);
  };

  const handleSave = (realizationData: Omit<Realization, 'id'>) => {
    try {
      if (editingRealization) {
        updateRealization(editingRealization.id, realizationData);
        toast({
          title: "Réalisation modifiée",
          description: "La réalisation a été modifiée avec succès.",
        });
      } else {
        addRealization(realizationData);
        toast({
          title: "Réalisation ajoutée",
          description: "La nouvelle réalisation a été ajoutée avec succès.",
        });
      }
      setIsFormOpen(false);
      setEditingRealization(null);
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
    setEditingRealization(null);
  };

  const handleDelete = (realizationId: string, realizationTitle: string) => {
    try {
      // deleteRealization est appelé dans RealizationsList, mais on peut ajouter le toast ici
      toast({
        title: "Réalisation supprimée",
        description: `La réalisation "${realizationTitle}" a été supprimée avec succès.`,
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
      <h1 className="text-3xl font-bold mb-6">Gestion des Réalisations</h1>
      <RealizationsList onEdit={handleEdit} onAdd={handleAdd} onDelete={handleDelete} />
      <RealizationForm
        realization={editingRealization}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default RealizationsManagement;