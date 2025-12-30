import { useState, useEffect } from 'react';
import { Partner } from '@/lib/types';
import PartnersList from './PartnersList';
import PartnerForm from './PartnerForm';
import { usePartners } from '@/hooks/usePartners';
import { useToast } from '@/hooks/use-toast';

interface PartnersManagementProps {
  initialAction?: 'add' | null;
}

const PartnersManagement = ({ initialAction }: PartnersManagementProps) => {
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addPartner, updatePartner } = usePartners();
  const { toast } = useToast();

  useEffect(() => {
    if (initialAction === 'add') {
      handleAdd();
    }
  }, [initialAction]);

  const handleAdd = () => {
    setEditingPartner(null);
    setIsFormOpen(true);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsFormOpen(true);
  };

  const handleSave = (partnerData: Omit<Partner, 'id'>) => {
    try {
      if (editingPartner) {
        updatePartner(editingPartner.id, partnerData);
        toast({
          title: "Marque modifiée",
          description: "La marque a été modifiée avec succès.",
        });
      } else {
        addPartner(partnerData);
        toast({
          title: "Marque ajoutée",
          description: "La nouvelle marque a été ajoutée avec succès.",
        });
      }
      setIsFormOpen(false);
      setEditingPartner(null);
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
    setEditingPartner(null);
  };

  const handleDelete = (partnerId: string, partnerName: string) => {
    try {
      // deletePartner est appelé dans PartnersList, mais on peut ajouter le toast ici
      toast({
        title: "Marque supprimée",
        description: `La marque "${partnerName}" a été supprimée avec succès.`,
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
      <PartnersList onEdit={handleEdit} onAdd={handleAdd} onDelete={handleDelete} />
      <PartnerForm
        partner={editingPartner}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default PartnersManagement;