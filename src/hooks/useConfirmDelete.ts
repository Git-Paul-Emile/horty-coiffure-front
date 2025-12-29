import { useState } from 'react';

interface UseConfirmDeleteOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const useConfirmDelete = (options: UseConfirmDeleteOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [itemName, setItemName] = useState('');

  const {
    title = 'Confirmer la suppression',
    description = 'Cette action est irréversible.',
    confirmText = 'Supprimer',
    cancelText = 'Annuler',
  } = options;

  const confirmDelete = (name: string, action: () => void) => {
    setItemName(name);
    setPendingAction(() => action);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setIsOpen(false);
    setItemName('');
  };

  const handleCancel = () => {
    setPendingAction(null);
    setIsOpen(false);
    setItemName('');
  };

  return {
    isOpen,
    itemName,
    title,
    description,
    confirmText,
    cancelText,
    confirmDelete,
    handleConfirm,
    handleCancel,
  };
};